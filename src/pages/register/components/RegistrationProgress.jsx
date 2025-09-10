import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    {
      id: 1,
      title: 'Account Details',
      description: 'Basic information and credentials',
      icon: 'User'
    },
    {
      id: 2,
      title: 'Email Verification',
      description: 'Verify your email address',
      icon: 'Mail'
    },
    {
      id: 3,
      title: 'Account Approval',
      description: 'Professional verification process',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'current':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === steps?.length - 1;

          return (
            <div key={step?.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepClasses(status)}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-body font-medium ${
                    status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step?.description}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div className={`flex-1 h-px mx-4 ${
                  status === 'completed' ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;