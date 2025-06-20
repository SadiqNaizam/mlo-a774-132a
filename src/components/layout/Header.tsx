import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck, LogIn, UserPlus, LayoutDashboard, LogOutIcon } from 'lucide-react';

interface HeaderProps {
  // In a real app, auth state would likely come from context or props
  // For this example, we'll use internal state to simulate it.
}

const Header: React.FC<HeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate auth state
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    // Simulate checking auth status on load
    // In a real app, you'd check localStorage, a token, or an API
    const mockAuthStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(mockAuthStatus);
    console.log('Header loaded');
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear mock auth status
    navigate('/'); // Redirect to login page
    console.log('User logged out');
  };

  // Simulate login for demonstration purposes (e.g., after actual login on LoginPage)
  // This function would not typically live in the Header.
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Set mock auth status
  };

  if (!isMounted) {
    return null; // Avoid rendering mismatch during hydration if auth state is checked client-side
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const commonNavLinks = (
    <>
      {isLoggedIn ? (
        <>
          <NavLink to="/dashboard" className={navLinkClasses}>
            <LayoutDashboard className="mr-2 h-4 w-4 inline" />Dashboard
          </NavLink>
          <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium text-muted-foreground hover:text-primary">
            <LogOutIcon className="mr-2 h-4 w-4 inline" />Logout
          </Button>
        </>
      ) : (
        <>
          <NavLink to="/" className={navLinkClasses}>
            <LogIn className="mr-2 h-4 w-4 inline" />Login
          </NavLink>
          <NavLink to="/registration" className={navLinkClasses}>
            <UserPlus className="mr-2 h-4 w-4 inline" />Register
          </NavLink>
        </>
      )}
       {/* This button is for testing the login state toggle. Remove in a real app. */}
      {process.env.NODE_ENV === 'development' && (
        <Button variant="outline" size="sm" onClick={isLoggedIn ? handleLogout : handleLogin} className="ml-4">
          Toggle Login (Dev)
        </Button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AuthSecure</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {commonNavLinks}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-6">
                {commonNavLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;