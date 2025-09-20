import React, { useState, useCallback } from 'react';
import { GameState } from './types';
import type { QuizQuestion } from './types';
import { generateQuizQuestions } from './services/geminiService';
import { CategorySelection } from './components/CategorySelection';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.CategorySelection);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });

  const startQuiz = useCallback(async (categoryId: string, categoryName: string) => {
    setGameState(GameState.Loading);
    setSelectedCategory({ id: categoryId, name: categoryName });
    const fetchedQuestions = await generateQuizQuestions(categoryName);
    // In case of API failure, dummy data might have fewer questions.
    // Ensure we handle this gracefully if needed, though current logic is fine.
    setQuestions(fetchedQuestions.length > 0 ? fetchedQuestions : [
        { question: "حدث خطأ! ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "الدمام", "مكة"], correctAnswer: "الرياض" },
    ]);
    setScore(0);
    // Add a small delay to make the loading feel more natural
    setTimeout(() => {
        setGameState(GameState.Quiz);
    }, 500);
  }, []);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.Results);
  };

  const handlePlayAgain = () => {
    if (selectedCategory.id) {
        startQuiz(selectedCategory.id, selectedCategory.name);
    } else {
        // Fallback just in case
        setGameState(GameState.CategorySelection);
    }
  };

  const handleNewCategory = () => {
    setGameState(GameState.CategorySelection);
  };

  const renderGameState = () => {
    switch (gameState) {
      case GameState.CategorySelection:
        return <CategorySelection onSelectCategory={startQuiz} />;
      case GameState.Loading:
        return <LoadingSpinner />;
      case GameState.Quiz:
        return (
          questions.length > 0 && (
            <QuizScreen
              questions={questions}
              categoryName={selectedCategory.name}
              onQuizComplete={handleQuizComplete}
            />
          )
        );
      case GameState.Results:
        return (
          <ResultsScreen
            score={score}
            totalQuestions={questions.length}
            onPlayAgain={handlePlayAgain}
            onNewCategory={handleNewCategory}
          />
        );
      default:
        return <CategorySelection onSelectCategory={startQuiz} />;
    }
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-b from-[#1c1449] to-[#0d0a25] overflow-hidden select-none">
        <div className="h-full w-full max-w-lg mx-auto">
            {renderGameState()}
        </div>
    </main>
  );
};

export default App;