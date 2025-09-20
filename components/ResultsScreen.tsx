import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onNewCategory: () => void;
}

const getResultMessage = (score: number, total: number): { message: string, emoji: string } => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return { message: "ممتاز! أنت بطل الفضاء!", emoji: "🚀" };
    if (percentage >= 75) return { message: "رائع! رحلة مذهلة!", emoji: "✨" };
    if (percentage >= 50) return { message: "جيد جدًا! استمر في اكتشاف المجرة!", emoji: "🪐" };
    return { message: "لا بأس! كل رحلة هي بداية جديدة!", emoji: "💪" };
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onPlayAgain, onNewCategory }) => {
    const { message, emoji } = getResultMessage(score, totalQuestions);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white fade-in">
        <div className="bg-black/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-purple-500/50">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">نتائج رحلتك</h2>
            
            <div className="relative my-6">
                <svg className="w-56 h-56 mx-auto text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900">
                    <span className="text-6xl font-black">{score}</span>
                    <span className="text-2xl font-bold opacity-75">/ {totalQuestions}</span>
                </div>
            </div>

            <p className="text-3xl font-bold mb-2">{message}</p>
            <p className="text-6xl mb-8 drop-shadow-lg">{emoji}</p>

            <div className="flex flex-col space-y-4">
                <button
                    onClick={onPlayAgain}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-2xl transition-colors duration-300 shadow-lg"
                >
                    رحلة جديدة بنفس الكوكب
                </button>
                <button
                    onClick={onNewCategory}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl text-2xl transition-colors duration-300 shadow-lg"
                >
                    اختر كوكبًا جديدًا
                </button>
            </div>
        </div>
    </div>
  );
};
