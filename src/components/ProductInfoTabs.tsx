import React, { useState } from 'react';

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
      {/* Modern, Clean Tab Header */}
      <div className="flex gap-8 md:gap-12 border-b border-sr12-pink/30 mb-8 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-sm md:text-[15px] font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-sr12-burgundy'
                : 'text-sr12-burgundy/40 hover:text-sr12-burgundy/70'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-sr12-burgundy rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Spaced, Readable Content Area */}
      <div className="text-[14px] md:text-[15px] text-sr12-burgundy/80 leading-[1.8] md:leading-loose whitespace-pre-wrap font-medium">
        {tabs.find((t) => t.id === activeTab)?.content || <span className="italic text-sr12-burgundy/40">Informasi belum tersedia.</span>}
      </div>
    </div>
  );
};

export default ProductInfoTabs;
