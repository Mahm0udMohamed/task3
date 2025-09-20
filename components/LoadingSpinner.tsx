import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-white fade-in">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-400/50 animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-t-4 border-b-4 border-purple-400 animate-spin" style={{ animationDuration: '1s' }}></div>
        <div className="absolute inset-6 bg-yellow-300 rounded-full"></div>
      </div>
      <h2 className="text-3xl font-bold text-white mt-8 drop-shadow-lg">السفر إلى كوكب الأسئلة...</h2>
      <p className="text-xl text-cyan-200 mt-2">استعد للانطلاق!</p>
    </div>
  );
};