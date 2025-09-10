import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformPreview = () => {
  const features = [
    {
      id: 1,
      title: "3D Anatomical Models",
      description: "Interactive human body visualization with detailed organ systems",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Drug Interaction Simulation",
      description: "Real-time visualization of pharmaceutical effects on organs",
      icon: "Activity",
      image: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Patient Parameter Control",
      description: "Adjust age, body fat, blood sugar for personalized simulations",
      icon: "Settings",
      image: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=400&h=250&fit=crop&crop=center"
    }
  ];

  const benefits = [
    {
      icon: "BookOpen",
      title: "Enhanced Learning",
      description: "Visual learning improves retention by 400% compared to traditional methods"
    },
    {
      icon: "Target",
      title: "Precise Simulation",
      description: "Anatomically accurate models based on medical research data"
    },
    {
      icon: "Users",
      title: "Collaborative Platform",
      description: "Share simulations and collaborate with medical professionals worldwide"
    },
    {
      icon: "TrendingUp",
      title: "Career Advancement",
      description: "Stay current with latest pharmaceutical developments and drug interactions"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
          Revolutionary 3D Medical Simulation
        </h2>
        <p className="text-lg font-body text-muted-foreground mb-6 leading-relaxed">
          Experience the future of medical education with interactive 3D visualizations that bring pharmaceutical science to life.
        </p>
      </div>
      {/* Feature Showcase */}
      <div className="space-y-6">
        {features?.map((feature, index) => (
          <div key={feature?.id} className={`flex items-center space-x-6 ${index % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="flex-1">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name={feature?.icon} size={20} color="white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {feature?.title}
                </h3>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Benefits Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
          Why Choose MedSim 3D?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-body font-semibold text-foreground mb-2">
                  {benefit?.title}
                </h4>
                <p className="text-sm font-caption text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
        <Icon name="Sparkles" size={32} className="text-primary mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Ready to Transform Medical Education?
        </h3>
        <p className="text-sm font-body text-muted-foreground">
          Join thousands of healthcare professionals already using MedSim 3D to enhance their understanding of drug interactions and human anatomy.
        </p>
      </div>
    </div>
  );
};

export default PlatformPreview;