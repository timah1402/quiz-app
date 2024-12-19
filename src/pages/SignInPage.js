import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Bienvenue, ${user.email}!`);
      navigate('/home');
    } catch (error) {
      alert('Erreur : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md relative">
        {/* Decorative background elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        
        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white">
          Login
          </h2>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
              Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full px-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Entrez votre e-mail" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full px-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Entrez votre mot de passe" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-6 py-3 text-white bg-white/20 rounded-xl font-semibold hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="space-y-4">
            <p className="text-center text-sm text-white/80">
            Don't have an account?
              <a href="/signup" className="text-white hover:text-white/80 ml-1 font-medium">
              Create an account
              </a>
            </p>
            
            <p className="text-center">
              <a href="/forgot-password" className="text-sm text-white/80 hover:text-white">
              Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;