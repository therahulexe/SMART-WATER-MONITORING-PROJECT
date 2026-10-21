import React, { useState, useMemo } from 'react';
import { FAQ_ITEMS, FaqItem } from '../data/projectData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Cpu,
  Droplet,
  Network,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string>(FAQ_ITEMS[0].id);

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_ITEMS.length },
    {
      id: 'sensor-tech',
      label: 'Sensor Technology',
      icon: Cpu,
      count: FAQ_ITEMS.filter((i) => i.category === 'sensor-tech').length
    },
    {
      id: 'water-quality',
      label: 'Water Quality & Standards',
      icon: Droplet,
      count: FAQ_ITEMS.filter((i) => i.category === 'water-quality').length
    },
    {
      id: 'scalability',
      label: 'Deployment Scalability',
      icon: Network,
      count: FAQ_ITEMS.filter((i) => i.category === 'scalability').length
    }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.standardsRef && item.standardsRef.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
              Engineering Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
              Deep dive into flow sensor mechanics, potable water health standards, and production IoT building deployment.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technology, standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-900 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl mb-8 max-w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-semibold text-slate-800">
              No matching questions found
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No frequently asked questions matched "{searchQuery}". Try searching for keywords like "ultrasonic", "NSF", "battery", or "LoRaWAN".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-cyan-700 font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded
                      ? 'bg-white border-cyan-500/50 shadow-xs ring-1 ring-cyan-500/15'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-cyan-700">
                          {faq.categoryLabel}
                        </span>
                        {faq.standardsRef && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate text-slate-600 font-mono text-[11px]">
                              {faq.standardsRef}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                        isExpanded
                          ? 'bg-cyan-100 text-cyan-800 rotate-180'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
                      <p>{faq.answer}</p>

                      {/* Technical Key Takeaway Banner */}
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block mb-0.5">
                            Key Engineering Insight:
                          </strong>
                          <span className="text-slate-600 leading-normal">
                            {faq.keyTakeaway}
                          </span>
                        </div>
                      </div>

                      {faq.standardsRef && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>Industry Reference: {faq.standardsRef}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
