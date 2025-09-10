import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrugDetailModal = ({ 
  drug, 
  isOpen, 
  onClose, 
  onAddToSimulation,
  onToggleFavorite,
  isInSimulation = false,
  isFavorite = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !drug) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'pharmacology', label: 'Pharmacology', icon: 'Activity' },
    { id: 'interactions', label: 'Interactions', icon: 'AlertTriangle' },
    { id: 'simulation', label: 'Simulation Data', icon: 'Target' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success';
      case 'investigational': return 'text-warning';
      case 'withdrawn': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'investigational': return 'Clock';
      case 'withdrawn': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const handleAddToSimulation = () => {
    onAddToSimulation(drug);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(drug?.id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Drug Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Generic Name:</span>
                  <p className="text-sm font-body text-card-foreground">{drug?.genericName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Drug Class:</span>
                  <p className="text-sm font-body text-card-foreground">{drug?.class}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Administration:</span>
                  <p className="text-sm font-body text-card-foreground capitalize">{drug?.administration}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Therapeutic Area:</span>
                  <p className="text-sm font-body text-card-foreground">{drug?.therapeuticArea}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Primary Indications
              </h4>
              <div className="flex flex-wrap gap-2">
                {drug?.indications?.map((indication, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface text-sm font-caption text-muted-foreground rounded-full"
                  >
                    {indication}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Mechanism of Action
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {drug?.mechanismOfAction}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Primary Organ Effects
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {drug?.organEffects?.map((organ, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-accent/10 rounded-lg"
                  >
                    <Icon name="Target" size={16} className="text-accent" />
                    <span className="text-sm font-caption text-accent">{organ}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pharmacology':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Pharmacokinetics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-lg">
                  <span className="text-sm text-muted-foreground">Half-life</span>
                  <p className="text-lg font-data text-card-foreground">{drug?.pharmacokinetics?.halfLife}</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <span className="text-sm text-muted-foreground">Bioavailability</span>
                  <p className="text-lg font-data text-card-foreground">{drug?.pharmacokinetics?.bioavailability}</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <span className="text-sm text-muted-foreground">Protein Binding</span>
                  <p className="text-lg font-data text-card-foreground">{drug?.pharmacokinetics?.proteinBinding}</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <span className="text-sm text-muted-foreground">Metabolism</span>
                  <p className="text-lg font-data text-card-foreground">{drug?.pharmacokinetics?.metabolism}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Dosage Information
              </h4>
              <div className="space-y-3">
                {drug?.dosageInfo?.map((dosage, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-body font-medium text-card-foreground">
                        {dosage?.indication}
                      </span>
                      <span className="text-xs text-muted-foreground">{dosage?.route}</span>
                    </div>
                    <p className="text-sm font-data text-muted-foreground">{dosage?.dose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'interactions':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Drug Interactions
              </h4>
              <div className="space-y-3">
                {drug?.interactions?.map((interaction, index) => (
                  <div key={index} className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-body font-medium text-card-foreground">
                          {interaction}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Monitor for increased risk of adverse effects
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Contraindications
              </h4>
              <div className="space-y-2">
                {drug?.contraindications?.map((contraindication, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-error/20 bg-error/5 rounded-lg">
                    <Icon name="XCircle" size={16} className="text-error flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-card-foreground">{contraindication}</span>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">No specific contraindications listed.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                Simulation Compatibility
              </h4>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  {drug?.isSimulationReady ? (
                    <>
                      <Icon name="CheckCircle" size={20} className="text-success" />
                      <span className="text-sm font-body font-medium text-success">
                        Ready for 3D Simulation
                      </span>
                    </>
                  ) : (
                    <>
                      <Icon name="Clock" size={20} className="text-warning" />
                      <span className="text-sm font-body font-medium text-warning">
                        Simulation Data Pending
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {drug?.isSimulationReady 
                    ? "This drug has complete 3D visualization data and can be used in organ simulations."
                    : "3D visualization data is currently being processed for this medication."
                  }
                </p>
              </div>
            </div>
            {drug?.isSimulationReady && (
              <div>
                <h4 className="text-sm font-body font-semibold text-card-foreground mb-3">
                  Visualization Parameters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-sm text-muted-foreground">Absorption Rate</span>
                    <p className="text-lg font-data text-card-foreground">
                      {drug?.simulationData?.absorptionRate || "Variable"}
                    </p>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-sm text-muted-foreground">Distribution Pattern</span>
                    <p className="text-lg font-data text-card-foreground">
                      {drug?.simulationData?.distributionPattern || "Systemic"}
                    </p>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-sm text-muted-foreground">Peak Effect Time</span>
                    <p className="text-lg font-data text-card-foreground">
                      {drug?.simulationData?.peakEffectTime || "1-2 hours"}
                    </p>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-sm text-muted-foreground">Elimination Route</span>
                    <p className="text-lg font-data text-card-foreground">
                      {drug?.simulationData?.eliminationRoute || "Hepatic"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-clinical-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-xl font-heading font-semibold text-card-foreground">
                  {drug?.name}
                </h2>
                {drug?.isSimulationReady && (
                  <div className="w-2 h-2 bg-success rounded-full" title="Simulation Ready"></div>
                )}
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span className="font-caption">{drug?.genericName}</span>
                <span>•</span>
                <span className="font-caption">{drug?.class}</span>
                <span>•</span>
                <div className={`flex items-center space-x-1 ${getStatusColor(drug?.fdaStatus)}`}>
                  <Icon name={getStatusIcon(drug?.fdaStatus)} size={14} />
                  <span className="font-caption capitalize">{drug?.fdaStatus}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className={`${isFavorite ? 'text-warning' : 'text-muted-foreground hover:text-warning'}`}
            >
              <Icon name="Star" size={16} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 text-sm font-body font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-surface border-t border-border">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date()?.toLocaleDateString()}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            
            {isInSimulation ? (
              <Button variant="outline" disabled>
                <Icon name="Check" size={16} />
                <span className="ml-2">In Simulation</span>
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleAddToSimulation}
                disabled={!drug?.isSimulationReady}
              >
                <Icon name="Plus" size={16} />
                <span className="ml-2">Add to Simulation</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugDetailModal;