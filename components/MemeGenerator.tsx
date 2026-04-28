'use client';

import { useState } from 'react';
import { Download, Share2, ArrowLeft, Loader, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MemeGeneratorProps {
  onBack: () => void;
  onMemeGenerated?: (meme: any) => void;
}

export default function MemeGenerator({ onBack, onMemeGenerated }: MemeGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const templates = [
    { id: 'pappu', label: '🤦 Pappu Can\'t Dance', emoji: '🤦' },
    { id: 'gali', label: '😒 Gali Suna Hai', emoji: '😒' },
    { id: 'kabali', label: '😠 Kabali Stare', emoji: '😠' },
    { id: 'disha', label: '😂 Disha Laugh', emoji: '😂' },
    { id: 'alia', label: '😕 Alia Confused', emoji: '😕' },
    { id: 'hrithik', label: '😎 Hrithik Smile', emoji: '😎' },
  ];

  const handleGenerateMeme = async () => {
    if (!prompt.trim() || !template) {
      alert('Please enter a caption and select a template!');
      return;
    }

    setIsGenerating(true);
    // Simulate API call delay for effect
    setTimeout(async () => {
      // Create a mock meme image with canvas
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 600, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 600);

        // Emoji in center
        const selectedTemplate = templates.find(t => t.id === template);
        ctx.font = 'bold 200px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(selectedTemplate?.emoji || '😂', 300, 350);

        // Text at bottom
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        const text = prompt.substring(0, 30);
        ctx.strokeText(text, 300, 550);
        ctx.fillText(text, 300, 550);
      }

      const memeUrl = canvas.toDataURL();
      setGeneratedMeme(memeUrl);

      // Save to Supabase
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from('memes')
            .insert([
              {
                user_id: user.id,
                image_url: memeUrl,
                caption: prompt,
                template: template,
                creator: user.user_metadata?.full_name || user.email,
              },
            ]);
          
          if (error) {
            console.error('Error saving meme:', error);
          }
        }
      } catch (err) {
        console.error('Failed to save to Supabase:', err);
      }

      onMemeGenerated?.({ prompt, template, url: memeUrl });
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (generatedMeme) {
      const link = document.createElement('a');
      link.href = generatedMeme;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (generatedMeme) {
      if (navigator.share) {
        try {
          const response = await fetch(generatedMeme);
          const blob = await response.blob();
          const file = new File([blob], 'meme.png', { type: 'image/png' });
          await navigator.share({
            title: 'Check out my AI-generated meme!',
            text: prompt,
            files: [file],
          });
        } catch (err) {
          console.log('Share failed:', err);
        }
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold">AI Meme Generator</h1>
            <p className="text-muted-foreground">Create your hilarious meme in seconds</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">Select Template</label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      template === t.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{t.emoji}</div>
                    <div className="text-sm font-semibold">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">Your Caption</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'When the project deadline is in 5 minutes but you haven't started coding yet'"
                className="w-full h-32 p-4 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="text-sm text-muted-foreground mt-2">
                {prompt.length}/300 characters
              </div>
            </div>

            <button
              onClick={handleGenerateMeme}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Generating your meme...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Meme
                </>
              )}
            </button>
          </div>

          {/* Preview Section */}
          <div>
            <label className="block text-lg font-semibold mb-3">Preview</label>
            <div className="rounded-lg border border-border overflow-hidden bg-card h-96 flex items-center justify-center">
              {generatedMeme ? (
                <img src={generatedMeme} alt="Generated meme" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-30">🎨</div>
                  <p className="text-muted-foreground">Your meme will appear here</p>
                </div>
              )}
            </div>

            {generatedMeme && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  <Download size={20} />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 border border-primary text-foreground py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
                >
                  <Share2 size={20} />
                  {copiedToClipboard ? 'Copied!' : 'Share'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 rounded-lg bg-card border border-border">
          <h3 className="text-lg font-semibold mb-4">Tips for the Best Memes</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Keep captions short and punchy (30-50 characters)</li>
            <li>✓ Use relatable Indian context or tech jokes</li>
            <li>✓ Mix current events with timeless meme formats</li>
            <li>✓ Don&apos;t be afraid to be silly or sarcastic!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
