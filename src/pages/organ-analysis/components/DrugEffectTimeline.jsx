import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrugEffectTimeline = ({ selectedDrug, timelineData = [], currentTime = 0, onTimeChange, className = '' }) => {
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const phases = [
    { id: 'absorption', name: 'Absorption', color: '#059669', icon: 'ArrowDown', duration: '0-30 min' },
    { id: 'distribution', name: 'Distribution', color: '#2563EB', icon: 'GitBranch', duration: '30-60 min' },
    { id: 'metabolism', name: 'Metabolism', color: '#F59E0B', icon: 'Zap', duration: '1-4 hours' },
    { id: 'elimination', name: 'Elimination', color: '#DC2626', icon: 'ArrowUp', duration: '4-24 hours' }
  ];

  const mockTimelineData = [
    { time: 0, phase: 'absorption', concentration: 0, effect: 0, description: 'Drug administration begins' },
    { time: 15, phase: 'absorption', concentration: 25, effect: 10, description: 'Initial absorption in stomach' },
    { time: 30, phase: 'absorption', concentration: 60, effect: 35, description: 'Peak absorption rate' },
    { time: 45, phase: 'distribution', concentration: 80, effect: 65, description: 'Distribution to target organ' },
    { time: 60, phase: 'distribution', concentration: 95, effect: 85, description: 'Peak concentration reached' },
    { time: 90, phase: 'metabolism', concentration: 85, effect: 90, description: 'Therapeutic effect peak' },
    { time: 120, phase: 'metabolism', concentration: 70, effect: 80, description: 'Metabolic breakdown begins' },
    { time: 180, phase: 'metabolism', concentration: 50, effect: 60, description: 'Active metabolism phase' },
    { time: 240, phase: 'elimination', concentration: 30, effect: 35, description: 'Elimination phase begins' },
    { time: 360, phase: 'elimination', concentration: 15, effect: 15, description: 'Significant elimination' },
    { time: 480, phase: 'elimination', concentration: 5, effect: 5, description: 'Minimal drug remaining' }
  ];

  const getCurrentPhaseData = () => {
    const currentData = mockTimelineData?.find(data => data?.time <= currentTime) || mockTimelineData?.[0];
    return currentData;
  };

  const getPhaseProgress = (phase) => {
    const phaseData = mockTimelineData?.filter(data => data?.phase === phase?.id);
    if (phaseData?.length === 0) return 0;
    
    const currentPhaseData = phaseData?.find(data => data?.time <= currentTime);
    if (!currentPhaseData) return 0;
    
    const maxTime = Math.max(...phaseData?.map(data => data?.time));
    const minTime = Math.min(...phaseData?.map(data => data?.time));
    return ((currentTime - minTime) / (maxTime - minTime)) * 100;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Drug Effect Timeline
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body text-muted-foreground">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e?.target?.value))}
              className="text-sm bg-background border border-border rounded px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </div>

        {/* Phase Selector */}
        <div className="flex items-center space-x-1 mb-4">
          <Button
            variant={selectedPhase === 'all' ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedPhase('all')}
          >
            All Phases
          </Button>
          {phases?.map((phase) => (
            <Button
              key={phase?.id}
              variant={selectedPhase === phase?.id ? "default" : "ghost"}
              size="sm"
              iconName={phase?.icon}
              onClick={() => setSelectedPhase(phase?.id)}
              style={{ 
                backgroundColor: selectedPhase === phase?.id ? phase?.color : undefined,
                borderColor: selectedPhase === phase?.id ? phase?.color : undefined
              }}
            >
              {phase?.name}
            </Button>
          ))}
        </div>

        {/* Current Time Display */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-body text-muted-foreground">Current Time:</span>
            <span className="font-data text-foreground font-medium">
              {Math.floor(currentTime / 60)}h {currentTime % 60}m
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-body text-muted-foreground">Phase:</span>
            <span className="font-body text-foreground font-medium capitalize">
              {getCurrentPhaseData()?.phase}
            </span>
          </div>
        </div>
      </div>
      {/* Timeline Visualization */}
      <div className="p-4">
        {/* Phase Progress Bars */}
        <div className="space-y-3 mb-6">
          {phases?.map((phase) => {
            const progress = getPhaseProgress(phase);
            const isActive = getCurrentPhaseData()?.phase === phase?.id;
            
            return (
              <div key={phase?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={phase?.icon} size={16} style={{ color: phase?.color }} />
                    <span className="text-sm font-body font-medium text-foreground">
                      {phase?.name}
                    </span>
                    <span className="text-xs font-caption text-muted-foreground">
                      {phase?.duration}
                    </span>
                  </div>
                  <span className="text-xs font-data text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: phase?.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Scrubber */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-body text-muted-foreground">Timeline Control</span>
            <span className="font-data text-muted-foreground">0h - 8h</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="480"
              value={currentTime}
              onChange={(e) => onTimeChange(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0h</span>
              <span>2h</span>
              <span>4h</span>
              <span>6h</span>
              <span>8h</span>
            </div>
          </div>
        </div>

        {/* Current Effect Data */}
        <div className="mt-6 p-4 bg-surface rounded-lg">
          <h4 className="text-sm font-body font-medium text-foreground mb-3">
            Current Drug Effects
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">Concentration:</span>
                <span className="text-sm font-data text-foreground font-medium">
                  {getCurrentPhaseData()?.concentration}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="h-1.5 bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${getCurrentPhaseData()?.concentration}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">Therapeutic Effect:</span>
                <span className="text-sm font-data text-foreground font-medium">
                  {getCurrentPhaseData()?.effect}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="h-1.5 bg-success rounded-full transition-all duration-300"
                  style={{ width: `${getCurrentPhaseData()?.effect}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-background rounded border-l-4 border-primary">
            <p className="text-sm font-body text-foreground">
              {getCurrentPhaseData()?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugEffectTimeline;