import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginPrompt = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
        <div className="h-px bg-border flex-1"></div>
        <span className="text-sm font-body">Already have an account?</span>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <Link to="/login">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In to Your Account
        </Button>
      </Link>

      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <a
          href="#"
          className="flex items-center space-x-1 hover:text-foreground transition-colors"
        >
          <Icon name="HelpCircle" size={14} />
          <span>Need Help?</span>
        </a>
        
        <a
          href="#"
          className="flex items-center space-x-1 hover:text-foreground transition-colors"
        >
          <Icon name="Phone" size={14} />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPrompt;