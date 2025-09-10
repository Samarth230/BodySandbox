import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const DrugCard = ({ 
  drug, 
  onAddToSimulation, 
  onToggleFavorite, 
  onViewDetails,
  isInSimulation = false,
  isFavorite = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleViewDetails = () => {
    onViewDetails(drug);
  };

  return (
    <div className="bg-card border border-border rounded-lg hover:shadow-clinical transition-shadow duration-200">
      {/* Card Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-heading font-semibold text-card-foreground truncate">
                {drug?.name}
              </h3>
              {drug?.isSimulationReady && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-success rounded-full" title="Simulation Ready"></div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <span className="font-caption">{drug?.genericName}</span>
              <span>•</span>
              <span className="font-caption">{drug?.class}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className={`h-8 w-8 p-0 ${isFavorite ? 'text-warning' : 'text-muted-foreground hover:text-warning'}`}
            >
              <Icon name={isFavorite ? "Star" : "Star"} size={16} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            
            <div className={`flex items-center space-x-1 ${getStatusColor(drug?.fdaStatus)}`}>
              <Icon name={getStatusIcon(drug?.fdaStatus)} size={14} />
              <span className="text-xs font-caption capitalize">{drug?.fdaStatus}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
              Primary Indications
            </h4>
            <div className="flex flex-wrap gap-1">
              {drug?.indications?.slice(0, 3)?.map((indication, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-surface text-xs font-caption text-muted-foreground rounded"
                >
                  {indication}
                </span>
              ))}
              {drug?.indications?.length > 3 && (
                <span className="px-2 py-1 bg-surface text-xs font-caption text-muted-foreground rounded">
                  +{drug?.indications?.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
              Administration
            </h4>
            <div className="flex items-center space-x-2">
              <Icon name="Pill" size={16} className="text-primary" />
              <span className="text-sm font-caption text-muted-foreground capitalize">
                {drug?.administration}
              </span>
            </div>
          </div>
        </div>

        {/* Mechanism of Action Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
            Mechanism of Action
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {drug?.mechanismOfAction}
          </p>
        </div>

        {/* Organ Effects */}
        <div className="mb-4">
          <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
            Primary Organ Effects
          </h4>
          <div className="flex flex-wrap gap-2">
            {drug?.organEffects?.map((organ, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-full"
              >
                <Icon name="Target" size={12} />
                <span className="text-xs font-caption">{organ}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
                Pharmacokinetics
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Half-life:</span>
                  <span className="ml-2 font-data">{drug?.pharmacokinetics?.halfLife}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Bioavailability:</span>
                  <span className="ml-2 font-data">{drug?.pharmacokinetics?.bioavailability}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-body font-medium text-card-foreground mb-2">
                Known Interactions
              </h4>
              <div className="flex flex-wrap gap-1">
                {drug?.interactions?.slice(0, 5)?.map((interaction, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-warning/10 text-warning text-xs font-caption rounded"
                  >
                    {interaction}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Card Actions */}
      <div className="p-4 bg-surface border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              <span className="ml-1">{isExpanded ? 'Less' : 'More'} Details</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewDetails}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ExternalLink" size={16} />
              <span className="ml-1">Full Info</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {isInSimulation ? (
              <Button variant="outline" size="sm" disabled>
                <Icon name="Check" size={16} />
                <span className="ml-1">In Simulation</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleAddToSimulation}
                disabled={!drug?.isSimulationReady}
              >
                <Icon name="Plus" size={16} />
                <span className="ml-1">Add to Simulation</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugCard;