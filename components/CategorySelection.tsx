import React from 'react';
import { CATEGORIES } from '../constants';

interface CategorySelectionProps {
  onSelectCategory: (category: string, categoryName: string) => void;
}

const CategoryCard: React.FC<{ category: { id: string; name: string; icon: string; }, onSelect: () => void; colorClasses: { border: string, text: string } }> = ({ category, onSelect, colorClasses }) => {
    return (
        <div 
            className={`bg-black/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-white/20 transition-all duration-300 ${colorClasses.border} group`}
            onClick={onSelect}
            role="button"
            aria-label={`اختر فئة ${category.name}`}
        >
            <div 
                className={`w-16 h-16 transition-colors duration-300 ${colorClasses.text}`}
                dangerouslySetInnerHTML={{ __html: category.icon }}
            />
            <span className="text-white text-xl font-bold drop-shadow-md text-center">{category.name}</span>
        </div>
    );
};

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  const colorSchemes = [
    { border: 'hover:border-green-400', text: 'text-green-400' }, 
    { border: 'hover:border-cyan-400', text: 'text-cyan-400' }, 
    { border: 'hover:border-orange-400', text: 'text-orange-400' }, 
    { border: 'hover:border-purple-400', text: 'text-purple-400' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 drop-shadow-[0_4px_2px_rgba(0,0,0,0.4)] mb-4">أبطال المعرفة</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-12 drop-shadow-md">اختر تحديك</h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {CATEGORIES.map((cat, index) => (
                <CategoryCard 
                    key={cat.id} 
                    category={cat} 
                    onSelect={() => onSelectCategory(cat.id, cat.name)}
                    colorClasses={colorSchemes[index % colorSchemes.length]}
                />
            ))}
        </div>
    </div>
  );
};
