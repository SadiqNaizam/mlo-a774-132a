import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn function

interface SocialLoginButtonProps {
  providerName: string;
  providerIcon: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: ButtonProps['variant'];
  disabled?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  providerName,
  providerIcon,
  onClick,
  className,
  variant = "outline",
  disabled = false,
}) => {
  console.log(`SocialLoginButton for ${providerName} loaded.`);

  return (
    <Button
      variant={variant}
      className={cn("w-full flex items-center justify-center gap-2", className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Login with ${providerName}`}
    >
      {providerIcon}
      <span>Sign in with {providerName}</span>
    </Button>
  );
};

export default SocialLoginButton;

/*
Example Usage (ensure you have the icons or provide appropriate ReactNodes):

import { Github, LogIn } from 'lucide-react'; // Example icons

<SocialLoginButton
  providerName="Google"
  providerIcon={<LogIn className="h-5 w-5" />} // Replace with actual Google icon
  onClick={() => console.log('Attempting Google login')}
/>

<SocialLoginButton
  providerName="GitHub"
  providerIcon={<Github className="h-5 w-5" />}
  onClick={() => console.log('Attempting GitHub login')}
  className="mt-2"
/>
*/