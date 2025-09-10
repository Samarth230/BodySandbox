import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'HIPAA Compliant',
      icon: 'Shield',
      description: 'Healthcare data protection certified'
    },
    {
      id: 2,
      name: 'FDA Approved',
      icon: 'CheckCircle',
      description: 'Medical simulation standards approved'
    },
    {
      id: 3,
      name: 'SOC 2 Certified',
      icon: 'Lock',
      description: 'Enterprise security standards'
    },
    {
      id: 4,
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information security management'
    }
  ];

  const stats = [
    { label: 'Medical Institutions', value: '500+' },
    { label: 'Healthcare Professionals', value: '25,000+' },
    { label: 'Simulation Hours', value: '1M+' },
    { label: 'Countries', value: '45+' }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-surface rounded-lg p-6 border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Trusted by Healthcare Professionals
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-body font-medium text-foreground">
                  {cert?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Statistics */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Join Our Global Community
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-heading font-bold text-primary">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat?.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-body font-medium text-foreground">
              Your Data is Secure
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              We use bank-level encryption and comply with all healthcare data protection regulations. Your personal and professional information is never shared without your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;