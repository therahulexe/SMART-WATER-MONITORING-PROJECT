import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Globe,
  Loader2,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: Array<{ title: string; uri: string }>;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'What is the NSF/ANSI 61 standard for drinking water sensors?',
  'How do I calibrate the 7.5 pulse multiplier using a bucket test?',
  'How does the YF-S201 compare to an ultrasonic transit-time sensor?',
  'What IoT protocols (LoRaWAN vs NB-IoT) are best for municipal water metering?'
];

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am your NMIT Water Monitoring Technical Advisor. You can ask me questions about flow sensor mechanics, NSF/ANSI 61 potable water standards, pulse-interrupt calculations, Arduino/Python code, or building-scale IoT deployment.",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history payload
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'No response returned.',
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `Error connecting to advisor: ${err.message || 'Please verify your internet connection or server status.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Conversation cleared. How can I assist with your water monitoring implementation?",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
        aria-label="Open AI Engineering Advisor"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-cyan-700" />
        </div>
        <span className="text-xs font-bold tracking-wide">
          Ask Engineering Advisor
        </span>
      </button>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-auto sm:w-[450px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm truncate">
                    Engineering Advisor
                  </h3>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded">
                    Search Grounded
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  NMIT Water Monitoring Technical Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Clear chat history"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-md bg-cyan-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-cyan-700 text-white rounded-br-none shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      {msg.text}

                      {/* Google Search Sources Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                          <div className="flex items-center gap-1 text-slate-500 font-semibold mb-1">
                            <Globe className="w-3 h-3 text-cyan-600" />
                            <span>Referenced Web Sources:</span>
                          </div>
                          <div className="space-y-1">
                            {msg.sources.slice(0, 3).map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-cyan-700 hover:text-cyan-900 hover:underline truncate"
                              >
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                <span className="truncate">{src.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`text-[10px] text-slate-400 font-mono px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-md bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-cyan-700 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl rounded-bl-none shadow-2xs text-xs text-slate-500 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
                  <span>Consulting technical specs &amp; search grounding...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Suggestions (Shown if only 1-2 messages) */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-slate-100/90 border-t border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 px-1">
                Suggested Technical Questions
              </span>
              <div className="flex flex-wrap gap-1">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] text-left p-1.5 bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-slate-700 rounded-md transition-colors truncate max-w-full cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about sensors, water standards, IoT..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-900 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 bg-cyan-700 hover:bg-cyan-800 disabled:bg-slate-300 text-white rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
