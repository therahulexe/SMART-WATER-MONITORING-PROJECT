import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini Multi-turn Chat Endpoint with Google Search Grounding
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    const systemInstruction = `You are the Smart Water Monitoring System Technical Advisor & Engineering Assistant for the CIV104 Environmental Science & Sustainability Implementation Guide.
You assist students, engineers, and facility managers with practical questions on:
1. Flow sensor technology (YF-S201 Hall-effect turbine, pulse frequency math f = 7.5 * Q Hz, ultrasonic transit-time meters, electromagnetic meters, calibration bucket tests).
2. Water quality standards & material safety (NSF/ANSI 61, FDA food-grade plastics, biofilm, municipal chlorine resistance, lead-free brass, drinking water regulations).
3. Deployment scalability & IoT networks (LoRaWAN, NB-IoT, ESP32 Wi-Fi, battery longevity, multi-tenant submetering, building management systems BMS).
4. Automated leak detection, threshold alerts (Up to 6 L/min Normal, 6-10 L/min Warning, >10 L/min High Flow), motorized solenoid shutoff valves, and UN SDGs 6 & 11.

Provide direct, concise, and technically grounded answers. Format output with clean Markdown formatting (bullet points, clear headers, code snippets where useful). When answering questions about up-to-date water quality guidelines, municipal plumbing codes, or commercial sensor datasheets, utilize Google Search data.`;

    const contents: any[] = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.role && item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated.';
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const webSources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || chunk.web.uri,
        uri: chunk.web.uri,
      }));

    return res.json({
      text,
      sources: webSources,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate response from Gemini API.',
    });
  }
});

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Water Monitoring server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
