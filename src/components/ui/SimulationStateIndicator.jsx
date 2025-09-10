import React from 'react';
import Icon from '../AppIcon';

const SimulationStateIndicator = ({ 
  isActive = true, 
  hasUnsavedChanges = false, 
  currentPatient = 'Patient #001',
  activeDrugs = 2,
  className = '' 
}) => {
  const getStatusColor = () => {
    if (!isActive) return 'bg-muted-foreground';
    if (hasUnsavedChanges) return 'bg-warning animate-pulse';
    return 'bg-success animate-pulse';
  };

  const getStatusText = () => {
    if (!isActive) return 'Simulation Inactive';
    if (hasUnsavedChanges) return 'Unsaved Changes';
    return 'Simulation Active';
  };

  return (
    <div className={`flex items-center space-x-3 px-3 py-2 bg-surface rounded-md border ${className}`}>
      {/* Status Indicator */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        <span className="text-xs font-data text-muted-foreground">
          {getStatusText()}
        </span>
      </div>

      {/* Simulation Details */}
      {isActive && (
        <>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={12} className="text-muted-foreground" />
              <span className="text-xs font-caption text-muted-foreground">
                {currentPatient}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Pill" size={12} className="text-muted-foreground" />
              <span className="text-xs font-caption text-muted-foreground">
                {activeDrugs} drugs
              </span>
            </div>
          </div>
        </>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <>
          <div className="w-px h-4 bg-border"></div>
          <Icon name="AlertTriangle" size={14} className="text-warning" />
        </>
      )}
    </div>
  );
};

export default SimulationStateIndicator;