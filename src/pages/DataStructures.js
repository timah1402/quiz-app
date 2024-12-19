import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const DataStructures = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'DataStructurelessons'));
        const lessonsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
      setLoading(false);
    };

    fetchLessons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
            Data Structures
          </h1>
          <p className="text-white/80 text-center text-lg md:text-xl">
            Master fundamental data structures through interactive lessons
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:bg-white/20"
              onMouseEnter={() => setSelectedLesson(lesson.id)}
              onMouseLeave={() => setSelectedLesson(null)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {lesson.description || 'Untitled Lesson'}
                    </h3>
                    {/* <p className="text-white/80 leading-relaxed">
                      {lesson.description || 'No description available'}
                    </p> */}
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-white/70">
                    {/* <span className="text-sm">
                      {lesson.duration || '30 minutes'} • {lesson.difficulty || 'Beginner'}
                    </span> */}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/data-structures/quiz/${lesson.id}`)}
                      className={`
                        px-6 py-3 rounded-xl font-semibold transition-all duration-300
                        ${selectedLesson === lesson.id
                          ? 'bg-green-500 text-white transform scale-105'
                          : 'bg-white/10 text-white hover:bg-green-500'
                        }
                      `}
                    >
                      Start Quiz
                    </button>
                    {/* <button
                      className="px-6 py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                    >
                      View Details
                    </button> */}
                  </div>
                </div>

                {lesson.progress !== undefined && (
                  <div className="mt-6">
                    <div className="h-1 bg-white/10 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${lesson.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-2xl">
            <p className="text-white text-xl">No lessons available at the moment</p>
            <p className="text-white/70 mt-2">Check back soon for new content!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DataStructures;