import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PharmacologyPanel = ({ selectedDrug, selectedOrgan, className = '' }) => {
  const [activeTab, setActiveTab] = useState('binding');
  const [expandedSections, setExpandedSections] = useState({
    binding: true,
    interactions: false,
    sideEffects: false,
    contraindications: false
  });

  const mockDrugData = {
    name: "Metoprolol",
    class: "Beta-blocker",
    mechanism: "Selective β1-adrenergic receptor antagonist",
    bindingSites: [
      { 
        site: "β1-adrenergic receptors", 
        location: "Cardiac muscle cells", 
        affinity: "High (Ki = 1.2 nM)",
        selectivity: "β1 selective (β1:β2 ratio = 75:1)"
      },
      { 
        site: "β2-adrenergic receptors", 
        location: "Vascular smooth muscle", 
        affinity: "Moderate (Ki = 89 nM)",
        selectivity: "Lower affinity at therapeutic doses"
      }
    ],
    interactions: [
      {
        type: "Receptor Interaction",
        description: "Competitive antagonism at β1-adrenergic receptors",
        effect: "Decreased heart rate and contractility",
        severity: "Therapeutic"
      },
      {
        type: "Enzyme Interaction",
        description: "Metabolized by CYP2D6",
        effect: "Drug clearance affected by genetic polymorphisms",
        severity: "Moderate"
      },
      {
        type: "Transporter Interaction",
        description: "Substrate for P-glycoprotein",
        effect: "Efflux transport affects bioavailability",
        severity: "Low"
      }
    ],
    sideEffects: [
      { effect: "Bradycardia", probability: 15, severity: "Moderate", organ: "Heart" },
      { effect: "Hypotension", probability: 12, severity: "Moderate", organ: "Cardiovascular" },
      { effect: "Fatigue", probability: 8, severity: "Mild", organ: "CNS" },
      { effect: "Cold extremities", probability: 6, severity: "Mild", organ: "Peripheral" },
      { effect: "Bronchospasm", probability: 2, severity: "Severe", organ: "Respiratory" }
    ],
    contraindications: [
      { condition: "Severe bradycardia", severity: "Absolute", reason: "Risk of cardiac arrest" },
      { condition: "Cardiogenic shock", severity: "Absolute", reason: "Further depression of cardiac function" },
      { condition: "Severe asthma", severity: "Relative", reason: "Risk of bronchospasm" },
      { condition: "Severe COPD", severity: "Relative", reason: "Potential respiratory depression" }
    ]
  };

  const tabs = [
    { id: 'binding', name: 'Binding Sites', icon: 'Target' },
    { id: 'interactions', name: 'Interactions', icon: 'GitBranch' },
    { id: 'sideEffects', name: 'Side Effects', icon: 'AlertTriangle' },
    { id: 'contraindications', name: 'Contraindications', icon: 'Shield' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'severe': case'absolute':
        return 'text-destructive';
      case 'moderate': case'relative':
        return 'text-warning';
      case 'mild': case'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderBindingSites = () => (
    <div className="space-y-4">
      <div className="p-3 bg-surface rounded-lg border-l-4 border-primary">
        <h4 className="text-sm font-body font-medium text-foreground mb-2">
          Primary Mechanism
        </h4>
        <p className="text-sm text-muted-foreground">
          {mockDrugData?.mechanism}
        </p>
      </div>
      
      {mockDrugData?.bindingSites?.map((site, index) => (
        <div key={index} className="p-3 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-body font-medium text-foreground">
              {site?.site}
            </h5>
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground">{site?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Affinity:</span>
              <span className="text-foreground font-data">{site?.affinity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selectivity:</span>
              <span className="text-foreground">{site?.selectivity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInteractions = () => (
    <div className="space-y-3">
      {mockDrugData?.interactions?.map((interaction, index) => (
        <div key={index} className="p-3 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-body font-medium text-foreground">
              {interaction?.type}
            </h5>
            <span className={`text-xs font-caption px-2 py-1 rounded ${getSeverityColor(interaction?.severity)} bg-muted`}>
              {interaction?.severity}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {interaction?.description}
          </p>
          <div className="text-sm text-foreground font-medium">
            Effect: {interaction?.effect}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSideEffects = () => (
    <div className="space-y-3">
      {mockDrugData?.sideEffects?.map((effect, index) => (
        <div key={index} className="p-3 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-body font-medium text-foreground">
              {effect?.effect}
            </h5>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-data text-muted-foreground">
                {effect?.probability}%
              </span>
              <span className={`text-xs font-caption px-2 py-1 rounded ${getSeverityColor(effect?.severity)} bg-muted`}>
                {effect?.severity}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Affected System:</span>
            <span className="text-sm text-foreground">{effect?.organ}</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="h-1.5 bg-warning rounded-full"
                style={{ width: `${effect?.probability}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContraindications = () => (
    <div className="space-y-3">
      {mockDrugData?.contraindications?.map((contra, index) => (
        <div key={index} className="p-3 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-body font-medium text-foreground">
              {contra?.condition}
            </h5>
            <span className={`text-xs font-caption px-2 py-1 rounded ${getSeverityColor(contra?.severity)} bg-muted`}>
              {contra?.severity}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {contra?.reason}
          </p>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'binding':
        return renderBindingSites();
      case 'interactions':
        return renderInteractions();
      case 'sideEffects':
        return renderSideEffects();
      case 'contraindications':
        return renderContraindications();
      default:
        return null;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Pill" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Pharmacology Details
          </h3>
        </div>
        
        {selectedDrug && (
          <div className="p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base font-body font-medium text-foreground">
                {mockDrugData?.name}
              </h4>
              <span className="text-sm font-caption text-muted-foreground px-2 py-1 bg-primary/10 rounded">
                {mockDrugData?.class}
              </span>
            </div>
            {selectedOrgan && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Target Organ:</span>
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: selectedOrgan?.color }}
                  />
                  <span className="text-sm text-foreground">{selectedOrgan?.name}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-1 p-1">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="sm"
              iconName={tab?.icon}
              onClick={() => setActiveTab(tab?.id)}
              className="flex-1 text-xs"
            >
              {tab?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {selectedDrug ? (
          renderTabContent()
        ) : (
          <div className="text-center py-8">
            <Icon name="Pill" size={48} className="text-muted-foreground mb-4 mx-auto" />
            <p className="text-muted-foreground">
              Select a drug to view pharmacological details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacologyPanel;