import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PatientParameterPanel from './components/PatientParameterPanel';
import DrugSelectionInterface from './components/DrugSelectionInterface';
import HumanBodyModel3D from './components/HumanBodyModel3D';
import OrganInformationPanel from './components/OrganInformationPanel';
import SimulationControls from './components/SimulationControls';

const SimulationDashboard = () => {
  const [parameters, setParameters] = useState({
    age: 35,
    bodyFat: 18,
    bloodSugar: 95,
    weight: 70,
    height: 175,
    gender: 'male'
  });

  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [highlightedOrgans, setHighlightedOrgans] = useState([]);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSystemFilter, setActiveSystemFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track changes for unsaved state
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [parameters, selectedDrugs]);

  const handleParameterChange = (newParameters) => {
    setParameters(newParameters);
  };

  const handleDrugAdd = (drug) => {
    setSelectedDrugs(prev => [...prev, drug]);
  };

  const handleDrugRemove = (drugId) => {
    setSelectedDrugs(prev => prev?.filter(drug => drug?.id !== drugId));
  };

  const handleDrugUpdate = (drugId, updates) => {
    setSelectedDrugs(prev => 
      prev?.map(drug => 
        drug?.id === drugId ? { ...drug, ...updates } : drug
      )
    );
  };

  const handleOrganClick = (organName) => {
    setSelectedOrgan(organName);
    if (highlightedOrgans?.includes(organName)) {
      setHighlightedOrgans(prev => prev?.filter(organ => organ !== organName));
    } else {
      setHighlightedOrgans(prev => [...prev, organName]);
    }
  };

  const handleSystemFilter = (systemId) => {
    setActiveSystemFilter(systemId);
    if (systemId !== 'all') {
      // Filter organs by system and highlight them
      const systemOrgans = {
        cardiovascular: ['heart'],
        respiratory: ['lungs'],
        digestive: ['liver', 'stomach', 'intestines'],
        nervous: ['brain'],
        urinary: ['kidneys'],
        endocrine: ['pancreas']
      };
      setHighlightedOrgans(systemOrgans?.[systemId] || []);
    } else {
      setHighlightedOrgans([]);
    }
  };

  const handleSimulationStart = () => {
    if (selectedDrugs?.some(drug => drug?.isActive)) {
      setIsSimulationRunning(true);
    }
  };

  const handleSimulationPause = () => {
    setIsSimulationRunning(false);
  };

  const handleSimulationStop = () => {
    setIsSimulationRunning(false);
  };

  const handleSimulationReset = () => {
    setIsSimulationRunning(false);
    setSelectedDrugs([]);
    setHighlightedOrgans([]);
    setSelectedOrgan(null);
    setParameters({
      age: 35,
      bodyFat: 18,
      bloodSugar: 95,
      weight: 70,
      height: 175,
      gender: 'male'
    });
  };

  const handleSpeedChange = (speed) => {
    setSimulationSpeed(speed);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving session...', {
      parameters,
      selectedDrugs,
      timestamp: new Date()?.toISOString()
    });
    setHasUnsavedChanges(false);
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting as ${format}...`, {
      parameters,
      selectedDrugs,
      highlightedOrgans,
      format
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Simulation Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Configure patient parameters and visualize drug effects in real-time
                </p>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg border border-border bg-card"
              >
                <span className="sr-only">Toggle panels</span>
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-foreground"></div>
                  <div className="w-full h-0.5 bg-foreground"></div>
                  <div className="w-full h-0.5 bg-foreground"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Left Panel - Patient Parameters */}
            <div className="lg:col-span-3 space-y-6">
              <PatientParameterPanel
                parameters={parameters}
                onParameterChange={handleParameterChange}
              />
              
              <SimulationControls
                isRunning={isSimulationRunning}
                onStart={handleSimulationStart}
                onPause={handleSimulationPause}
                onStop={handleSimulationStop}
                onReset={handleSimulationReset}
                onSpeedChange={handleSpeedChange}
                onSave={handleSave}
                onExport={handleExport}
                simulationSpeed={simulationSpeed}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>

            {/* Center Panel - 3D Model and Drug Selection */}
            <div className="lg:col-span-6 space-y-6">
              <DrugSelectionInterface
                selectedDrugs={selectedDrugs}
                onDrugAdd={handleDrugAdd}
                onDrugRemove={handleDrugRemove}
                onDrugUpdate={handleDrugUpdate}
              />
              
              <HumanBodyModel3D
                parameters={parameters}
                selectedDrugs={selectedDrugs}
                highlightedOrgans={highlightedOrgans}
                onOrganClick={handleOrganClick}
                isAnimating={isSimulationRunning}
              />
            </div>

            {/* Right Panel - Organ Information */}
            <div className="lg:col-span-3">
              <OrganInformationPanel
                selectedOrgan={selectedOrgan}
                selectedDrugs={selectedDrugs}
                parameters={parameters}
                onSystemFilter={handleSystemFilter}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Always visible - 3D Model */}
            <div className="mb-6">
              <HumanBodyModel3D
                parameters={parameters}
                selectedDrugs={selectedDrugs}
                highlightedOrgans={highlightedOrgans}
                onOrganClick={handleOrganClick}
                isAnimating={isSimulationRunning}
              />
            </div>

            {/* Mobile Panels - Collapsible */}
            <div className={`space-y-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-surface rounded-lg p-1">
                <button className="flex-1 py-2 px-3 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                  Parameters
                </button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Drugs
                </button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Organs
                </button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Controls
                </button>
              </div>

              {/* Panel Content */}
              <div className="space-y-4">
                <PatientParameterPanel
                  parameters={parameters}
                  onParameterChange={handleParameterChange}
                />
                
                <DrugSelectionInterface
                  selectedDrugs={selectedDrugs}
                  onDrugAdd={handleDrugAdd}
                  onDrugRemove={handleDrugRemove}
                  onDrugUpdate={handleDrugUpdate}
                />
                
                <OrganInformationPanel
                  selectedOrgan={selectedOrgan}
                  selectedDrugs={selectedDrugs}
                  parameters={parameters}
                  onSystemFilter={handleSystemFilter}
                />
                
                <SimulationControls
                  isRunning={isSimulationRunning}
                  onStart={handleSimulationStart}
                  onPause={handleSimulationPause}
                  onStop={handleSimulationStop}
                  onReset={handleSimulationReset}
                  onSpeedChange={handleSpeedChange}
                  onSave={handleSave}
                  onExport={handleExport}
                  simulationSpeed={simulationSpeed}
                  hasUnsavedChanges={hasUnsavedChanges}
                />
              </div>
            </div>

            {/* Quick Action Bar - Always visible on mobile */}
            <div className="fixed bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-3 shadow-clinical-lg lg:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isSimulationRunning ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                  }`}></div>
                  <span className="text-xs text-muted-foreground">
                    {isSimulationRunning ? 'Running' : 'Stopped'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!isSimulationRunning ? (
                    <button
                      onClick={handleSimulationStart}
                      disabled={!selectedDrugs?.some(drug => drug?.isActive)}
                      className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium disabled:opacity-50"
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      onClick={handleSimulationPause}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                    >
                      Pause
                    </button>
                  )}
                  
                  <button
                    onClick={handleSave}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                      hasUnsavedChanges 
                        ? 'bg-warning text-warning-foreground' 
                        : 'bg-surface text-muted-foreground'
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );
};

export default SimulationDashboard;