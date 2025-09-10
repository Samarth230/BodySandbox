import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SimulationControls = ({ 
  isRunning, 
  onStart, 
  onPause, 
  onStop, 
  onReset,
  onSpeedChange,
  onSave,
  onExport,
  simulationSpeed = 1,
  hasUnsavedChanges = false 
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const speedOptions = [
    { value: 0.25, label: '0.25x (Slow)' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x (Normal)' },
    { value: 2, label: '2x (Fast)' },
    { value: 4, label: '4x (Very Fast)' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'png', label: 'PNG Image' }
  ];

  const handleExport = () => {
    onExport(exportFormat);
    setShowExportOptions(false);
  };

  const getSimulationStatus = () => {
    if (isRunning) return { text: 'Running', color: 'text-success', icon: 'Play' };
    return { text: 'Stopped', color: 'text-muted-foreground', icon: 'Square' };
  };

  const status = getSimulationStatus();

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Simulation Controls
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name={status?.icon} size={16} className={status?.color} />
          <span className={`text-sm font-medium ${status?.color}`}>
            {status?.text}
          </span>
        </div>
      </div>
      {/* Primary Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {!isRunning ? (
            <Button
              variant="default"
              iconName="Play"
              iconPosition="left"
              onClick={onStart}
              className="flex-1"
            >
              Start Simulation
            </Button>
          ) : (
            <Button
              variant="secondary"
              iconName="Pause"
              iconPosition="left"
              onClick={onPause}
              className="flex-1"
            >
              Pause Simulation
            </Button>
          )}
          
          <Button
            variant="outline"
            iconName="Square"
            onClick={onStop}
            disabled={!isRunning}
          />
          
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={onReset}
          />
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <label className="text-sm font-body font-medium text-foreground">
            Simulation Speed
          </label>
          <Select
            options={speedOptions}
            value={simulationSpeed}
            onChange={onSpeedChange}
            disabled={!isRunning}
          />
        </div>
      </div>
      {/* Animation Settings */}
      <div className="space-y-4 border-t border-border pt-4">
        <h3 className="text-sm font-body font-medium text-foreground">Animation Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-body text-foreground">Drug Absorption</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-8">5s</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-body text-foreground">Effect Duration</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="5"
                max="60"
                defaultValue="30"
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-8">30s</span>
            </div>
          </div>
        </div>
      </div>
      {/* Visualization Options */}
      <div className="space-y-4 border-t border-border pt-4">
        <h3 className="text-sm font-body font-medium text-foreground">Visualization</h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Show drug pathways</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Animate absorption</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-foreground">Show side effects</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-foreground">Display organ stress</span>
          </label>
        </div>
      </div>
      {/* Session Management */}
      <div className="space-y-4 border-t border-border pt-4">
        <h3 className="text-sm font-body font-medium text-foreground">Session Management</h3>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={hasUnsavedChanges ? "default" : "outline"}
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
            className="flex-1"
          >
            Save Session
          </Button>
          
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              Export
            </Button>
            
            {showExportOptions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-clinical-lg z-[1100]">
                <div className="p-2 space-y-2">
                  <Select
                    options={exportOptions}
                    value={exportFormat}
                    onChange={setExportFormat}
                    placeholder="Export format"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleExport}
                      className="flex-1"
                    >
                      Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExportOptions(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning" />
              <span className="text-xs text-warning font-medium">
                You have unsaved changes
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="space-y-3 border-t border-border pt-4">
        <h3 className="text-sm font-body font-medium text-foreground">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            iconPosition="left"
            className="justify-start text-xs"
          >
            Duplicate Session
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            className="justify-start text-xs"
          >
            Share Session
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="History"
            iconPosition="left"
            className="justify-start text-xs"
          >
            View History
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            className="justify-start text-xs"
          >
            Preferences
          </Button>
        </div>
      </div>
      {/* Simulation Statistics */}
      <div className="bg-surface rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-body font-medium text-foreground">Session Statistics</h4>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Runtime:</span>
              <span className="text-foreground font-data">00:05:23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Drugs tested:</span>
              <span className="text-foreground font-data">3</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Organs affected:</span>
              <span className="text-foreground font-data">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Interactions:</span>
              <span className="text-foreground font-data">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;