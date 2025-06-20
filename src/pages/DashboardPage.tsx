import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
import { Textarea } from '@/components/ui/textarea'; // shadcn/ui

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  // In a real application, user data would come from auth context or props
  const userName = "Authenticated User"; // Placeholder user name

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome, {userName}!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
              You have successfully logged in to your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center">
              This is your main application area. More features and content will be available here.
            </p>
            
            <div className="mt-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-3 text-center">Quick Actions & Notes</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="quickNotes" className="block text-sm font-medium text-muted-foreground mb-1">
                    Your Notes
                  </label>
                  <Textarea
                    id="quickNotes"
                    placeholder="Jot down any important notes or reminders here..."
                    rows={5}
                    className="resize-none"
                  />
                </div>
                <Button className="w-full sm:w-auto">
                  Save Notes
                </Button> {/* Placeholder action */}
              </div>
            </div>

            <div className="mt-8 text-center border-t pt-6">
                <p className="text-sm text-muted-foreground mb-2">
                    Need to go somewhere else?
                </p>
              {/* The Header component already handles logout. This is just an example link. */}
              {/* App.tsx maps "/" to LoginPage. The Header component's logout also navigates to "/" */}
              <Link to="/"> 
                <Button variant="outline" className="mr-2">
                  Back to Login Page
                </Button>
              </Link>
              {/* Example: If there was a profile page, a link could be:
              <Link to="/profile">
                <Button variant="secondary">View Profile</Button>
              </Link> 
              This route is not defined in App.tsx, so it's commented out.
              */}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;