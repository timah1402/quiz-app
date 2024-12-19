import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      alert(`Compte créé avec succès, Bienvenue ${name} !`);
      navigate('/signin');
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
          Create an account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
              Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="w-full px-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="Entrez votre nom complet" 
                />
              </div>
            </div>

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
                  <span className="ml-2">Creating...</span>
                </div>
              ) : (
                "Créer un compte"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/80">
          Already have an account?
            <a href="/signin" className="text-white hover:text-white/80 ml-1 font-medium">
              sign-in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;