import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';

interface QuizScreenProps {
  questions: QuizQuestion[];
  categoryName: string;
  onQuizComplete: (score: number) => void;
}

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    const progressPercentage = (current / total) * 100;
    return (
        <div className="w-full bg-black/30 rounded-full h-5 p-1 shadow-inner">
            <div
                className="bg-gradient-to-r from-green-400 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, categoryName, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onQuizComplete(score);
      }
    }, 1200);
  };
  
  const getButtonClass = (option: string) => {
    const baseClass = 'p-4 rounded-xl shadow-lg text-xl font-semibold transition-all duration-300 border-2 disabled:cursor-not-allowed';
    
    if (!isAnswered) {
      return `${baseClass} bg-white/10 border-cyan-400 text-white hover:bg-cyan-400/50`;
    }

    if (option === currentQuestion.correctAnswer) {
      return `${baseClass} bg-green-500/80 border-green-300 text-white animate-correct`;
    }
    
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return `${baseClass} bg-red-500/80 border-red-300 text-white animate-incorrect`;
    }

    return `${baseClass} bg-white/10 border-cyan-400 text-white opacity-50`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 text-center text-white fade-in">
        <header>
            <div className="flex justify-between items-center mb-2 text-cyan-200">
                <span className="font-bold text-lg drop-shadow-md">{categoryName}</span>
                <span className="font-bold text-lg drop-shadow-md">{`${currentQuestionIndex + 1} / ${questions.length}`}</span>
            </div>
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        </header>

        <main className="flex-grow flex flex-col items-center justify-center my-4">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 w-full shadow-lg">
                <h2 className="text-3xl font-bold leading-relaxed">
                    {currentQuestion.question}
                </h2>
            </div>
        </main>
        
        <footer className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered}
                    className={getButtonClass(option)}
                >
                    {option}
                </button>
            ))}
        </footer>
    </div>
  );
};
