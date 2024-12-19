import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DataStructureQuiz = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [lessonDescription, setLessonDescription] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonRef = doc(db, 'DataStructurelessons', lessonId);
        const lessonDoc = await getDoc(lessonRef);

        if (lessonDoc.exists()) {
          const lessonData = lessonDoc.data();
          setQuestions(lessonData.questions || []);
          setLessonDescription(lessonData.description || '');
        } else {
          console.error('No such lesson found!');
        }
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === selectedOption;

    setTimeout(() => {
      const newUserAnswers = [...userAnswers, {
        question: currentQuestion.question,
        answer: selectedOption,
        isCorrect
      }];
      setUserAnswers(newUserAnswers);

      if (isCorrect) {
        setScore(score + 1);
      }

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setIsQuizCompleted(true);
      }

      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isQuizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>
              <div className="inline-block bg-white/20 rounded-full p-8 mb-4">
                <div className="text-6xl font-bold">{percentage}%</div>
              </div>
              <p className="text-xl">Final Score: {score} out of {questions.length}</p>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer?.isCorrect;

                return (
                  <div key={index} className="bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? '✓' : '×'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
                        <p className="mb-4">{question.question}</p>
                        <div className="space-y-2">
                          <div className={`p-3 rounded-lg ${
                            isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}>
                            Your answer: {userAnswer?.answer}
                          </div>
                          {!isCorrect && (
                            <div className="p-3 rounded-lg bg-green-500/20">
                              Correct answer: {question.correctAnswer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Question Progress</span>
              <span className="text-sm font-medium">{currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{currentQuestion.question}</h2>
            <p className="text-white/70">{lessonDescription}</p>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = showFeedback && option === currentQuestion.correctAnswer;
              const isWrong = showFeedback && isSelected && option !== currentQuestion.correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-300
                    ${showFeedback 
                      ? isCorrect 
                        ? 'bg-green-500 text-white'
                        : isWrong
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 text-white'
                      : isSelected
                        ? 'bg-white/30 text-white transform scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/20 hover:transform hover:scale-[1.02] text-white'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructureQuiz;