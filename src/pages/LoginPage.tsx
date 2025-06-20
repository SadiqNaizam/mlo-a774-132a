import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Used for checkbox, direct use with FormField for others
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, Mail, Lock, AlertTriangle, ShieldCheck } from 'lucide-react'; // Added ShieldCheck for consistency

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    console.log('LoginPage loaded');
    // Check if already logged in (e.g. via Header's simulated logic)
    // This is a bit of a mock, real auth would be more robust
    if (localStorage.getItem('isLoggedIn') === 'true') {
      // navigate('/dashboard'); // Potentially redirect if already logged in, depends on desired UX
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    console.log('Login form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock login logic
    if (data.email === 'user@example.com' && data.password === 'password123') {
      console.log('Login successful');
      // Simulate session/token storage for Header component
      localStorage.setItem('isLoggedIn', 'true');
      // In a real app, the Header component might re-render based on context/global state change
      // Forcing a reload is a crude way if Header relies solely on localStorage on its mount
      // A better way is to use a global state (Context/Redux/Zustand)
      // For now, direct navigation should trigger Header's useEffect to re-check localStorage
      navigate('/dashboard'); // Path from App.tsx
    } else {
      console.log('Login failed');
      setLoginError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting ${provider} login...`);
    // Implement social login logic here
    // For now, just a placeholder
    setLoginError(`Social login with ${provider} is not yet implemented.`);
    // Simulate a social login flow for demonstration that might lead to dashboard
    // if (provider === "Google") {
    //   localStorage.setItem('isLoggedIn', 'true');
    //   navigate('/dashboard');
    // }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="flex items-center mb-6 text-primary">
          <ShieldCheck className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">AuthSecure</h1>
        </div>
        <AuthFormCard
          title="Login to Your Account"
          description="Enter your credentials to access your dashboard."
          footerContent={
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/registration" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Sign Up
              </Link>
            </p>
          }
          className="w-full max-w-md shadow-xl"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {loginError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <Label htmlFor="rememberMe" className="text-sm font-medium">Remember me</Label>
                      </div>
                    </FormItem>
                  )}
                />
                <Link
                  to="/forgot-password" // Path from App.tsx
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <SocialLoginButton
              providerName="Google"
              providerIcon={<LogIn className="h-5 w-5" />} // Placeholder, replace with actual Google icon
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            />
            <SocialLoginButton
              providerName="GitHub"
              providerIcon={<LogIn className="h-5 w-5" />} // Placeholder, replace with actual GitHub icon
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
            />
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;