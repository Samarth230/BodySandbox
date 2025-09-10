import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import PlatformPreview from './components/PlatformPreview';
import MockCredentialsHelper from './components/MockCredentialsHelper';
import Icon from '../../components/AppIcon';


const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - MedSim 3D | Medical Simulation Platform</title>
        <meta name="description" content="Sign in to MedSim 3D - Interactive 3D medical simulation platform for healthcare professionals and students. Secure access to drug interaction visualizations and anatomical models." />
        <meta name="keywords" content="medical simulation, 3D anatomy, drug interactions, healthcare education, pharmaceutical visualization" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="space-y-8">
              <LoginForm />
              
              {/* Demo Credentials Helper - Desktop */}
              <div className="hidden lg:block">
                <MockCredentialsHelper />
              </div>
              
              {/* Trust Signals - Mobile */}
              <div className="lg:hidden">
                <TrustSignals />
              </div>
            </div>

            {/* Right Column - Platform Preview & Trust Signals */}
            <div className="space-y-8">
              {/* Platform Preview */}
              <div className="hidden lg:block">
                <PlatformPreview />
              </div>
              
              {/* Trust Signals - Desktop */}
              <div className="hidden lg:block">
                <TrustSignals />
              </div>
              
              {/* Demo Credentials Helper - Mobile */}
              <div className="lg:hidden">
                <MockCredentialsHelper />
              </div>
              
              {/* Platform Preview - Mobile (Simplified) */}
              <div className="lg:hidden">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
                    Experience 3D Medical Simulation
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-surface rounded-md">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                        <Icon name="Zap" size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-body font-medium text-foreground">
                          Interactive 3D Models
                        </h4>
                        <p className="text-xs font-caption text-muted-foreground">
                          Explore detailed anatomical structures
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-surface rounded-md">
                      <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                        <Icon name="Activity" size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-body font-medium text-foreground">
                          Drug Interaction Visualization
                        </h4>
                        <p className="text-xs font-caption text-muted-foreground">
                          See real-time pharmaceutical effects
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-surface rounded-md">
                      <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
                        <Icon name="Users" size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-body font-medium text-foreground">
                          Collaborative Learning
                        </h4>
                        <p className="text-xs font-caption text-muted-foreground">
                          Share and learn with professionals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-surface">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Zap" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">MedSim 3D</p>
                  <p className="text-xs font-caption text-muted-foreground">Medical Simulation Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-xs font-caption text-muted-foreground">
                <span>© {new Date()?.getFullYear()} MedSim 3D. All rights reserved.</span>
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <button className="hover:text-foreground transition-colors">Terms of Service</button>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;