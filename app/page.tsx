'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Hero from '@/components/Hero';
import FamousMemesGallery from '@/components/FamousMemesGallery';
import MemeGenerator from '@/components/MemeGenerator';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';
import Auth from '../components/Auth';
import { Toaster } from 'sonner';

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<'home' | 'generator' | 'history'>('home');
  const [generatedMeme, setGeneratedMeme] = useState<any>(null);

  useEffect(() => {
    console.log('Checking session...');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session fetched:', session);
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If trying to access restricted sections while logged out, show Auth
  if (!session && (currentSection === 'generator' || currentSection === 'history')) {
    return (
      <div className="auth-container">
        <Auth />
        <Toaster position="top-center" />
        <button 
          onClick={() => setCurrentSection('home')}
          className="fixed top-4 left-4 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Landing Page
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background relative">
      <Toaster position="top-center" />
      
      {/* Login/Logout Button for Landing Page */}
      {!session && currentSection === 'home' && (
        <button 
          onClick={() => setCurrentSection('generator')}
          className="fixed top-6 right-6 z-50 bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:opacity-90 transition shadow-lg"
        >
          Sign In
        </button>
      )}

      {session && (
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          <button 
            onClick={() => setCurrentSection('history')}
            className="bg-primary/20 text-primary px-6 py-2 rounded-full font-semibold hover:bg-primary/30 transition shadow-lg"
          >
            My History
          </button>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="bg-muted text-muted-foreground px-6 py-2 rounded-full font-semibold hover:bg-muted/80 transition"
          >
            Logout
          </button>
        </div>
      )}

      {currentSection === 'home' && (
        <>
          <Hero onNavigate={(section) => setCurrentSection(section as any)} />
          <FamousMemesGallery onSelectMeme={() => setCurrentSection('generator')} />
          <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Create Your Meme?</h2>
              <p className="text-lg text-muted-foreground mb-8">Use AI to generate hilarious Indian memes instantly</p>
              <button
                onClick={() => setCurrentSection('generator')}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Launch Meme Generator
              </button>
            </div>
          </section>
        </>
      )}

      {currentSection === 'generator' && session && (
        <MemeGenerator
          onBack={() => setCurrentSection('home')}
          onMemeGenerated={setGeneratedMeme}
        />
      )}

      {currentSection === 'history' && session && (
        <Leaderboard onBack={() => setCurrentSection('home')} />
      )}

      <Footer onNavigate={(section) => setCurrentSection(section as any)} />
    </main>
  );
}
