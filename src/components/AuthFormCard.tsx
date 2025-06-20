import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn

interface AuthFormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  children,
  footerContent,
  className,
}) => {
  console.log(`AuthFormCard loaded with title: ${title}`);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center pt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-center space-y-2">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;