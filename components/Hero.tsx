import { Sparkles, Zap, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: 'home' | 'generator' | 'leaderboard') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <span className="text-primary font-semibold text-sm">Welcome to Meme Master</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Legendary
            </span>
            <br />
            <span className="text-foreground">Indian Memes</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Use cutting-edge AI to generate hilarious memes inspired by iconic Indian meme culture. Share, vote, and climb the leaderboard!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => onNavigate('generator')}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Zap size={20} />
            Create Your Meme
            <span className="absolute inset-0 bg-white/20 -left-full group-hover:left-0 transition-all duration-500" />
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="px-8 py-4 border-2 border-primary text-foreground rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Users size={20} />
            View Leaderboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary">2.5K+</div>
            <div className="text-sm text-muted-foreground">Memes Created</div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-purple-500">1.2K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-pink-500">48K+</div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </div>
        </div>

        {/* Featured meme preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-75 blur" />
          <div className="relative bg-background rounded-xl p-8 border border-border">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg aspect-square flex items-center justify-center text-white font-bold text-2xl mb-4">
              <Sparkles size={48} />
            </div>
            <p className="text-foreground font-semibold mb-2">Your AI-Generated Meme Preview</p>
            <p className="text-sm text-muted-foreground">Every meme is unique, hilarious, and ready to share!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
