import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold text-muted-foreground">AuthSecure</span>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-muted-foreground mb-4 md:mb-0">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </nav>
        <div>
          <p className="text-center text-muted-foreground">
            &copy; {currentYear} AuthSecure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;