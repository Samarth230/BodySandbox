import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: "Doctor",
      email: "doctor@medsim3d.com",
      password: "MedDoc2024!",
      description: "Full access to all simulation features and patient data"
    },
    {
      role: "Medical Student",
      email: "student@medsim3d.com",
      password: "Student123!",
      description: "Access to educational simulations and learning modules"
    },
    {
      role: "Medical Educator",
      email: "educator@medsim3d.com",
      password: "Educator456!",
      description: "Create and manage educational content and student progress"
    },
    {
      role: "Pharmaceutical Researcher",
      email: "researcher@medsim3d.com",
      password: "Research789!",
      description: "Advanced drug interaction analysis and research tools"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      console.log('Copied to clipboard:', text);
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Key" size={16} className="text-muted-foreground" />
          <span className="text-sm font-body font-medium text-foreground">
            Demo Credentials
          </span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs font-caption text-muted-foreground mb-4">
            Use these credentials to explore different user roles and features:
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="bg-card border border-border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-body font-medium text-foreground">
                  {cred?.role}
                </h4>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Copy"
                    onClick={() => copyToClipboard(cred?.email)}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-data text-muted-foreground">Email:</span>
                  <span className="text-xs font-data text-foreground">{cred?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-data text-muted-foreground">Password:</span>
                  <span className="text-xs font-data text-foreground">{cred?.password}</span>
                </div>
              </div>
              
              <p className="text-xs font-caption text-muted-foreground mt-2 leading-relaxed">
                {cred?.description}
              </p>
            </div>
          ))}

          <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs font-caption text-warning">
                These are demo credentials for testing purposes only. In production, use your actual login credentials.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockCredentialsHelper;