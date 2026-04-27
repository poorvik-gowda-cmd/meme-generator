'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import FamousMemesGallery from '@/components/FamousMemesGallery';
import MemeGenerator from '@/components/MemeGenerator';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'home' | 'generator' | 'leaderboard'>('home');
  const [generatedMeme, setGeneratedMeme] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {currentSection === 'home' && (
        <>
          <Hero onNavigate={setCurrentSection} />
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

      {currentSection === 'generator' && (
        <MemeGenerator
          onBack={() => setCurrentSection('home')}
          onMemeGenerated={setGeneratedMeme}
        />
      )}

      {currentSection === 'leaderboard' && (
        <Leaderboard onBack={() => setCurrentSection('home')} />
      )}

      <Footer onNavigate={setCurrentSection} />
    </main>
  );
}
