import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import RegistrationProgress from './components/RegistrationProgress';
import LoginPrompt from './components/LoginPrompt';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    // Mock registration process
    try {
      console.log('Registration data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Move to email verification step
      setRegistrationStep(2);
      
      // In a real app, this would redirect to email verification
      alert('Registration successful! Please check your email for verification.');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  MedSim 3D
                </h1>
                <p className="text-xs font-caption text-muted-foreground">
                  Medical Simulation Platform
                </p>
              </div>
            </Link>

            <Link
              to="/login"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6 lg:p-8">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Create Your Account
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of healthcare professionals using advanced 3D medical simulations for education and training.
                </p>
              </div>

              {/* Progress Indicator */}
              <RegistrationProgress currentStep={registrationStep} />

              {/* Registration Form */}
              <RegistrationForm 
                onSubmit={handleRegistrationSubmit}
                isLoading={isLoading}
              />

              {/* Login Prompt */}
              <div className="mt-8 pt-6 border-t border-border">
                <LoginPrompt />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Trust Signals */}
              <TrustSignals />

              {/* Platform Features */}
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  What You'll Get Access To
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Zap" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-body font-medium text-foreground">
                        3D Medical Simulations
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Interactive human anatomy with real-time drug effect visualization
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Database" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-body font-medium text-foreground">
                        Comprehensive Drug Database
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Extensive pharmaceutical information with interaction mapping
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Heart" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-body font-medium text-foreground">
                        Organ Analysis Tools
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed organ-specific drug impact analysis and visualization
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="FolderOpen" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-body font-medium text-foreground">
                        Session Management
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Save, share, and manage your simulation sessions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-surface rounded-lg p-4 border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Headphones" size={16} className="text-primary" />
                  <h4 className="text-sm font-body font-medium text-foreground">
                    Need Assistance?
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is available 24/7 to help with your registration.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    <span>support@medsim3d.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Phone" size={14} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-lg font-heading font-semibold text-foreground">
                  MedSim 3D
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced 3D medical simulation platform for healthcare education and training. Trusted by medical institutions worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Icon name="Linkedin" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-body font-semibold text-foreground mb-4">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-body font-semibold text-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} MedSim 3D. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;