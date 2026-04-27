'use client';

import { useState } from 'react';
import { ThumbsUp, Share2, ArrowLeft, Trophy, Flame } from 'lucide-react';

interface Meme {
  id: string;
  caption: string;
  votes: number;
  creator: string;
  template: string;
  timestamp: string;
  trending: boolean;
}

const mockMemes: Meme[] = [
  {
    id: '1',
    caption: 'Me pretending to work while my boss walks by',
    votes: 342,
    creator: '@CoderLife',
    template: 'pappu',
    timestamp: '2 hours ago',
    trending: true,
  },
  {
    id: '2',
    caption: 'When someone says "one more thing" at 5 PM',
    votes: 289,
    creator: '@OfficeJokes',
    template: 'gali',
    timestamp: '4 hours ago',
    trending: true,
  },
  {
    id: '3',
    caption: 'Trying to hide my tears while nodding in the meeting',
    votes: 267,
    creator: '@MemeKing',
    template: 'alia',
    timestamp: '6 hours ago',
    trending: false,
  },
  {
    id: '4',
    caption: 'My expectations vs reality when I apply for jobs',
    votes: 234,
    creator: '@TechMemes',
    template: 'kabali',
    timestamp: '8 hours ago',
    trending: false,
  },
  {
    id: '5',
    caption: 'When your code works on the first try',
    votes: 198,
    creator: '@CodeNinja',
    template: 'hrithik',
    timestamp: '10 hours ago',
    trending: false,
  },
  {
    id: '6',
    caption: 'POV: You&apos;re a junior dev and senior says "it&apos;s an easy task"',
    votes: 167,
    creator: '@DeveloperLife',
    template: 'disha',
    timestamp: '12 hours ago',
    trending: false,
  },
];

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [memes, setMemes] = useState(mockMemes);
  const [filter, setFilter] = useState<'all' | 'trending'>('all');

  const handleVote = (memeId: string) => {
    const newVotes = new Set(userVotes);
    const meme = memes.find(m => m.id === memeId);

    if (newVotes.has(memeId) && meme) {
      newVotes.delete(memeId);
      setMemes(memes.map(m =>
        m.id === memeId ? { ...m, votes: m.votes - 1 } : m
      ));
    } else if (meme) {
      newVotes.add(memeId);
      setMemes(memes.map(m =>
        m.id === memeId ? { ...m, votes: m.votes + 1 } : m
      ));
    }
    setUserVotes(newVotes);
  };

  const filteredMemes = filter === 'trending' 
    ? memes.filter(m => m.trending).sort((a, b) => b.votes - a.votes)
    : memes.sort((a, b) => b.votes - a.votes);

  const topCreators = [
    { name: 'CoderLife', memes: 45, votes: 3421 },
    { name: 'MemeKing', memes: 38, votes: 2987 },
    { name: 'TechMemes', memes: 32, votes: 2654 },
  ];

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
              Meme Leaderboard
            </h1>
            <p className="text-muted-foreground">See what&apos;s trending in our community</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:border-primary'
                }`}
              >
                All Memes
              </button>
              <button
                onClick={() => setFilter('trending')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  filter === 'trending'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:border-primary'
                }`}
              >
                <Flame size={18} />
                Trending Now
              </button>
            </div>

            {/* Memes List */}
            <div className="space-y-4">
              {filteredMemes.map((meme, index) => (
                <div
                  key={meme.id}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-all"
                >
                  <div className="flex gap-4 items-start">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                        index === 1 ? 'bg-gray-400/20 text-gray-600' :
                        index === 2 ? 'bg-orange-600/20 text-orange-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex items-center gap-2">
                            {meme.caption}
                            {meme.trending && (
                              <Flame size={18} className="text-orange-500 flex-shrink-0" />
                            )}
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            by <span className="font-semibold">{meme.creator}</span> • {meme.timestamp}
                          </div>
                        </div>
                        <div className="text-sm bg-muted px-3 py-1 rounded-full text-muted-foreground flex-shrink-0">
                          {meme.template}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleVote(meme.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                            userVotes.has(meme.id)
                              ? 'bg-primary/20 text-primary'
                              : 'hover:bg-muted text-muted-foreground'
                          }`}
                        >
                          <ThumbsUp size={18} />
                          {meme.votes}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-all">
                          <Share2 size={18} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Top Creators */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-500" />
                  Top Creators
                </h3>
                <div className="space-y-4">
                  {topCreators.map((creator, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                        index === 1 ? 'bg-gray-400/20 text-gray-600' :
                        'bg-orange-600/20 text-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">@{creator.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {creator.memes} memes • {creator.votes} votes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="mt-6 p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-bold mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Votes</p>
                    <p className="text-2xl font-bold text-primary">48.2K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Memes Created</p>
                    <p className="text-2xl font-bold text-purple-500">2,547</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Creators</p>
                    <p className="text-2xl font-bold text-pink-500">1,203</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
