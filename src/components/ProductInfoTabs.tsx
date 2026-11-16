import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductInfoTabsProps {
  benefits: string;
  ingredients: string;
  howToUse: string;
}

const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({ benefits, ingredients, howToUse }) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');

  const tabs = [
    { id: 'benefits', label: 'Manfaat', content: benefits },
    { id: 'ingredients', label: 'Komposisi', content: ingredients },
    { id: 'howToUse', label: 'Cara Pakai', content: howToUse },
  ] as const;

  return (
    <div className="flex flex-col mt-2">
      {/* Modern, Clean Tab Header with Animated Sliding Glider */}
      <div className="flex gap-8 md:gap-12 border-b border-sr12-pink/30 mb-8 overflow-x-auto scrollbar-none relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm md:text-[15px] font-bold transition-colors duration-200 relative whitespace-nowrap active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-sr12-burgundy'
                  : 'text-sr12-burgundy/40 hover:text-sr12-burgundy/70'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="activeTabGlider"
                  className="absolute bottom-0 left-0 w-full h-[2.5px] bg-sr12-burgundy rounded-t-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Smooth Cross-fade Content Area */}
      <div className="text-[14px] md:text-[15px] text-sr12-burgundy/80 leading-[1.8] md:leading-loose whitespace-pre-wrap font-medium min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabs.find((t) => t.id === activeTab)?.content || (
              <span className="italic text-sr12-burgundy/40">Informasi belum tersedia.</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductInfoTabs;
