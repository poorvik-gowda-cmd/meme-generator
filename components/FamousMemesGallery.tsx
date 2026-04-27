'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Meme {
  id: string;
  name: string;
  year: number;
  description: string;
  story: string;
  color: string;
}

const famousMemes: Meme[] = [
  {
    id: 'pappu',
    name: 'Pappu Can\'t Dance Saala',
    year: 2013,
    description: 'The iconic reaction from the Bollywood movie',
    story: 'This legendary meme comes from the 2011 Bollywood film where an actor\'s exaggerated dance rejection became the face of failure and inability. Every Indian millennial has used this once!',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'gali',
    name: 'Gali Suna Hai',
    year: 2018,
    description: 'When someone delivers an epic comedown',
    story: 'Originating from a popular Hindi movie, this meme perfectly captures that moment when someone has heard it all. The deadpan expression became an instant classic for sarcastic responses.',
    color: 'from-red-400 to-pink-500',
  },
  {
    id: 'kabali',
    name: 'Kabali - The Stare',
    year: 2016,
    description: 'An intense, iconic look that says everything',
    story: 'From a blockbuster Tamil film, this stare became synonymous with subtle disapproval and intense judgment. It\'s the perfect meme for when words aren\'t needed.',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'disha',
    name: 'Disha Patani Laugh',
    year: 2019,
    description: 'Infectious and contagious laughter',
    story: 'An actress\'s genuine laugh from a viral video moment became the universal expression of finding something genuinely hilarious. Wholesome meme energy!',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'alia',
    name: 'Alia Bhatt Confused Look',
    year: 2017,
    description: 'Perfect for expressing confusion or bewilderment',
    story: 'A moment of genuine confusion captured forever. This meme has been used millions of times to express not understanding what\'s happening in a conversation or situation.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'hrithik',
    name: 'Hrithik Roshan Smile',
    year: 2015,
    description: 'That charming, confident smile moment',
    story: 'A perfectly timed smile became the go-to meme for expressing confidence, approval, or that "I got this" attitude. Bollywood at its finest!',
    color: 'from-pink-400 to-rose-500',
  },
];

interface FamousMemesGalleryProps {
  onSelectMeme: () => void;
}

export default function FamousMemesGallery({ onSelectMeme }: FamousMemesGalleryProps) {
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  const [showStory, setShowStory] = useState(false);

  const meme = selectedMeme ? famousMemes.find(m => m.id === selectedMeme) : null;

  return (
    <section className="py-20 px-4 bg-card/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Famous Indian Memes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the iconic memes that defined Indian internet culture. Click on any meme to learn its story and use it as inspiration for your creation!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {famousMemes.map((meme) => (
            <div
              key={meme.id}
              onClick={() => {
                setSelectedMeme(meme.id);
                setShowStory(true);
              }}
              className="cursor-pointer group rounded-xl overflow-hidden border border-border hover:border-primary transition-all duration-300"
            >
              {/* Meme Card with gradient background */}
              <div className={`bg-gradient-to-br ${meme.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                <div className="relative z-10 text-center px-4">
                  <div className="text-4xl mb-2 font-bold text-white drop-shadow-lg text-balance">
                    {meme.name}
                  </div>
                  <p className="text-white/90 text-sm drop-shadow">Since {meme.year}</p>
                </div>
              </div>
              <div className="p-4 bg-background">
                <p className="text-foreground text-sm mb-3">{meme.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMeme(meme.id);
                    setShowStory(true);
                  }}
                  className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  View Story <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Story and Action */}
        {selectedMeme && meme && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setSelectedMeme(null);
              setShowStory(false);
            }}
          >
            <div
              className="bg-background rounded-xl max-w-2xl w-full p-8 border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br ${meme.color} h-64 rounded-lg mb-6 flex items-center justify-center`}>
                <div className="text-6xl font-bold text-white drop-shadow-lg">{meme.name}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">The Story Behind "{meme.name}"</h3>
                <p className="text-foreground text-lg leading-relaxed mb-4">{meme.story}</p>
                <p className="text-muted-foreground">
                  First went viral in <span className="font-bold text-primary">{meme.year}</span> and has since become a staple of Indian meme culture.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedMeme(null);
                    setShowStory(false);
                    onSelectMeme();
                  }}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Create Meme with This
                </button>
                <button
                  onClick={() => {
                    setSelectedMeme(null);
                    setShowStory(false);
                  }}
                  className="flex-1 border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
