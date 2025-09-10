import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: "FDA Approved",
      icon: "Shield",
      description: "FDA cleared for medical education"
    },
    {
      id: 2,
      name: "HIPAA Compliant",
      icon: "Lock",
      description: "Healthcare data protection certified"
    },
    {
      id: 3,
      name: "ISO 27001",
      icon: "Award",
      description: "Information security management"
    },
    {
      id: 4,
      name: "SOC 2 Type II",
      icon: "CheckCircle",
      description: "Security and availability audited"
    }
  ];

  const stats = [
    { label: "Medical Institutions", value: "500+", icon: "Building2" },
    { label: "Healthcare Professionals", value: "50K+", icon: "Users" },
    { label: "Simulation Hours", value: "1M+", icon: "Clock" },
    { label: "Drug Interactions", value: "10K+", icon: "Pill" }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Trusted by Healthcare Professionals
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex flex-col items-center text-center p-3 bg-surface rounded-md">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2">
                <Icon name={cert?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="text-sm font-body font-medium text-foreground mb-1">
                {cert?.name}
              </h4>
              <p className="text-xs font-caption text-muted-foreground">
                {cert?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Platform Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-surface rounded-md">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full mx-auto mb-2">
                <Icon name={stat?.icon} size={16} className="text-accent" />
              </div>
              <div className="text-xl font-heading font-semibold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-xs font-caption text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full flex-shrink-0 mt-0.5">
            <Icon name="Shield" size={16} className="text-success" />
          </div>
          <div>
            <h4 className="text-sm font-body font-medium text-foreground mb-1">
              Secure Medical Environment
            </h4>
            <p className="text-xs font-caption text-muted-foreground leading-relaxed">
              Your data is protected with enterprise-grade security measures designed specifically for healthcare applications. All simulations are processed securely and comply with medical data protection standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;