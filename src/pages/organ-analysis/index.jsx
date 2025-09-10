import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import OrganSelector from './components/OrganSelector';
import OrganViewer3D from './components/OrganViewer3D';
import DrugEffectTimeline from './components/DrugEffectTimeline';
import PharmacologyPanel from './components/PharmacologyPanel';
import ComparisonTools from './components/ComparisonTools';
import AnalysisExport from './components/AnalysisExport';

const OrganAnalysis = () => {
  const navigate = useNavigate();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState('metoprolol');
  const [currentTime, setCurrentTime] = useState(60);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [activePanel, setActivePanel] = useState('pharmacology');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock patient parameters
  const [patientParams, setPatientParams] = useState({
    age: 45,
    weight: 70,
    bodyFat: 18,
    bloodSugar: 95,
    bloodPressure: { systolic: 140, diastolic: 90 }
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/simulation-dashboard', icon: 'Home' },
    { label: 'Organ Analysis', icon: 'Heart' }
  ];

  const panelTabs = [
    { id: 'pharmacology', name: 'Pharmacology', icon: 'Pill' },
    { id: 'comparison', name: 'Comparison', icon: 'BarChart3' },
    { id: 'export', name: 'Export', icon: 'Download' }
  ];

  useEffect(() => {
    let interval;
    if (isAnimationPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 480) {
            setIsAnimationPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isAnimationPlaying]);

  const handleOrganSelect = (organ) => {
    setSelectedOrgan(organ);
    setCurrentTime(0);
    setIsAnimationPlaying(false);
  };

  const handleAnimationToggle = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  const handleTimeChange = (time) => {
    setCurrentTime(time);
    setIsAnimationPlaying(false);
  };

  const handleDrugCompare = (drugs, mode) => {
    console.log('Comparing drugs:', drugs, 'Mode:', mode);
  };

  const renderRightPanel = () => {
    switch (activePanel) {
      case 'pharmacology':
        return (
          <PharmacologyPanel
            selectedDrug={selectedDrug}
            selectedOrgan={selectedOrgan}
            className="h-full"
          />
        );
      case 'comparison':
        return (
          <ComparisonTools
            selectedOrgan={selectedOrgan}
            onDrugCompare={handleDrugCompare}
            className="h-full"
          />
        );
      case 'export':
        return (
          <AnalysisExport
            selectedOrgan={selectedOrgan}
            selectedDrug={selectedDrug}
            analysisData={{
              patientParams,
              currentTime,
              timeline: []
            }}
            className="h-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                  <Icon name="Heart" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Organ Analysis
                  </h1>
                  <p className="text-muted-foreground font-body">
                    Detailed visualization of drug effects on anatomical systems
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/simulation-dashboard')}
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="default"
                  iconName="Save"
                >
                  Save Analysis
                </Button>
              </div>
            </div>

            {/* Patient Parameters Summary */}
            <div className="mt-4 p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Age:</span>
                    <span className="text-foreground font-data">{patientParams?.age}y</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Weight" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="text-foreground font-data">{patientParams?.weight}kg</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Activity" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">BP:</span>
                    <span className="text-foreground font-data">
                      {patientParams?.bloodPressure?.systolic}/{patientParams?.bloodPressure?.diastolic}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  onClick={() => navigate('/simulation-dashboard')}
                >
                  Modify Parameters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Organ Selector */}
            <div className="lg:col-span-3">
              <OrganSelector
                selectedOrgan={selectedOrgan}
                onOrganSelect={handleOrganSelect}
                className="sticky top-20"
              />
            </div>

            {/* Center Content - 3D Viewer and Timeline */}
            <div className="lg:col-span-6 space-y-6">
              {/* 3D Organ Viewer */}
              <OrganViewer3D
                selectedOrgan={selectedOrgan}
                drugEffects={[]}
                isPlaying={isAnimationPlaying}
                onPlayToggle={handleAnimationToggle}
              />

              {/* Drug Effect Timeline */}
              <DrugEffectTimeline
                selectedDrug={selectedDrug}
                timelineData={[]}
                currentTime={currentTime}
                onTimeChange={handleTimeChange}
              />
            </div>

            {/* Right Sidebar - Analysis Panels */}
            <div className="lg:col-span-3">
              {/* Panel Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="border-b border-border">
                  <div className="flex space-x-1 p-1">
                    {panelTabs?.map((tab) => (
                      <Button
                        key={tab?.id}
                        variant={activePanel === tab?.id ? "default" : "ghost"}
                        size="sm"
                        iconName={tab?.icon}
                        onClick={() => setActivePanel(tab?.id)}
                        className="flex-1 text-xs"
                      >
                        {tab?.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Panel Content */}
                <div className="h-96 overflow-hidden">
                  {renderRightPanel()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex items-center justify-around py-2">
            {panelTabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activePanel === tab?.id ? "default" : "ghost"}
                size="sm"
                iconName={tab?.icon}
                onClick={() => setActivePanel(tab?.id)}
                className="flex-1 mx-1 text-xs"
              >
                {tab?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Panel Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-lg max-h-[70vh] overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {panelTabs?.find(tab => tab?.id === activePanel)?.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              </div>
              <div className="p-4">
                {renderRightPanel()}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-20 right-4 z-30">
          <Button
            variant="default"
            size="icon"
            iconName="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-12 h-12 rounded-full shadow-lg"
          />
        </div>
      </main>
    </div>
  );
};

export default OrganAnalysis;