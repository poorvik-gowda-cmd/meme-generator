import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: 'home' | 'generator' | 'history') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Meme Master</h3>
            <p className="text-muted-foreground">Create legendary Indian memes with AI. Share, vote, and rise to glory!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button onClick={() => onNavigate?.('home')} className="hover:text-foreground transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('generator')} className="hover:text-foreground transition">
                  Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('history')} className="hover:text-foreground transition">
                  History
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-foreground transition">How to Use</a></li>
              <li><a href="#" className="hover:text-foreground transition">Support</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>&copy; 2024 Meme Master. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
