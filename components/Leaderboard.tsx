'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp, Share2, ArrowLeft, Trophy, Flame, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Meme {
  id: string;
  caption?: string;
  votes: number;
  creator?: string;
  template?: string;
  image_url: string;
  created_at: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'recent'>('all');

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemes(data || []);
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (memeId: string) => {
    // Optimistic update
    setMemes(memes.map(m => 
      m.id === memeId ? { ...m, votes: (m.votes || 0) + 1 } : m
    ));

    try {
      const { error } = await supabase.rpc('increment_votes', { meme_id: memeId });
      if (error) {
        // If RPC doesn't exist, try a simple update
        const meme = memes.find(m => m.id === memeId);
        await supabase
          .from('memes')
          .update({ votes: (meme?.votes || 0) + 1 })
          .eq('id', memeId);
      }
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background via-background to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Trophy size={36} className="text-yellow-500" />
              Meme History
            </h1>
            <p className="text-muted-foreground">Your collection of AI-generated masterpieces</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse">Fetching your memes...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {memes.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No memes yet</h3>
                  <p className="text-muted-foreground mb-8">Start creating your first meme using AI!</p>
                  <button
                    onClick={onBack}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Go to Generator
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {memes.map((meme, index) => (
                    <div
                      key={meme.id}
                      className="p-6 rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group overflow-hidden"
                    >
                      <div className="flex gap-6 items-start">
                        {/* Meme Image Preview */}
                        <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-white/5 group-hover:scale-105 transition-transform">
                          <img 
                            src={meme.image_url} 
                            alt={meme.caption} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                {meme.caption || 'Untitled Meme'}
                              </h3>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                {meme.template && (
                                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                    {meme.template}
                                  </span>
                                )}
                                • 
                                <span>{new Date(meme.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleVote(meme.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary font-semibold transition-all"
                            >
                              <ThumbsUp size={18} />
                              {meme.votes || 0}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all">
                              <Share2 size={18} />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Quick Stats */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="p-6 rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" />
                    Your Stats
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Memes Created</p>
                      <p className="text-3xl font-bold text-primary">{memes.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Votes Received</p>
                      <p className="text-3xl font-bold text-purple-500">
                        {memes.reduce((acc, m) => acc + (m.votes || 0), 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Meme Tips</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Try using more relatable captions to get more engagement from the community!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
