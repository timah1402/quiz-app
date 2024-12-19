import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, Book, Code, Database, ChevronRight, Crown, History } from 'lucide-react';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topScores, setTopScores] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const scores = querySnapshot.docs.map(doc => doc.data());
        setTopScores(scores);
      } catch (error) {
        console.error('Error fetching top scores:', error);
      }
    };
    fetchTopScores();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserScores = async () => {
        try {
          const q = query(collection(db, 'scores'), where('userName', '==', user.displayName), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          const scores = querySnapshot.docs.map(doc => doc.data());
          setUserScores(scores);
        } catch (error) {
          console.error('Error fetching user scores:', error);
        }
      };
      fetchUserScores();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="p-8 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            DiangalApp Quiz
            <span className="ml-2 inline-block animate-bounce">🎯</span>
          </h1>
          {user ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mt-4">
              <p className="text-2xl font-semibold">Welcome, {user.displayName || user.email}!</p>
            </div>
          ) : (
            <p className="text-xl mt-4 font-light">Log in to start the adventure</p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {user ? (
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Book className="w-6 h-6" />
                Choose your path
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Web Development
                      </h3>
                      <p className="text-white/80 mt-2">Master modern web development</p>
                    </div>
                    <button 
                      onClick={() => handleNavigate('/WebDevelopment')} 
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 text-white transition-all duration-300 flex items-center gap-2"
                    >
                      Get started
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Data Structures
                      </h3>
                      <p className="text-white/80 mt-2">Explore essential data structures</p>
                    </div>
                    <button 
                      onClick={() => handleNavigate('/data-structures')} 
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 text-white transition-all duration-300 flex items-center gap-2"
                    >
                      Get started
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Top 10 best Scores
              </h2>
              <div className="space-y-3">
                {topScores.length > 0 ? (
                  topScores.map((score, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        {index < 3 && <Crown className="w-5 h-5 text-yellow-400" />}
                        <span className="text-white">{score.userName}</span>
                      </div>
                      <span className="text-white font-semibold">{score.score} pts</span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/80 text-center">No scores available</p>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/login')} 
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Log in to start
            </button>
          </div>
        )}

        {userScores.length > 0 && (
          <section className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <History className="w-6 h-6" />
              Your History
            </h2>
          </section>
        )}
      </main>
    </div>
  );
};

export default Homepage;
