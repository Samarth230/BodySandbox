import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrganViewer3D = ({ selectedOrgan, drugEffects = [], isPlaying = false, onPlayToggle, className = '' }) => {
  const [viewMode, setViewMode] = useState('3d');
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showDrugPaths, setShowDrugPaths] = useState(true);
  const viewerRef = useRef(null);

  const mockDrugPaths = [
    { id: 1, path: 'Oral → Stomach → Bloodstream → Heart', color: '#DC2626', intensity: 85 },
    { id: 2, path: 'IV → Bloodstream → Heart', color: '#059669', intensity: 95 },
    { id: 3, path: 'Sublingual → Bloodstream → Heart', color: '#7C3AED', intensity: 70 }
  ];

  const viewModes = [
    { id: '3d', name: '3D Model', icon: 'Box' },
    { id: 'cross-section', name: 'Cross Section', icon: 'Slice' },
    { id: 'layers', name: 'Tissue Layers', icon: 'Layers' },
    { id: 'molecular', name: 'Molecular View', icon: 'Atom' }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  const handleReset = () => {
    setZoomLevel(100);
    setRotationSpeed(1);
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Header Controls */}
      <div className="p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              3D Organ Viewer
            </h3>
            {selectedOrgan && (
              <div className="flex items-center space-x-2 ml-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedOrgan?.color }}
                />
                <span className="text-sm font-body text-muted-foreground">
                  {selectedOrgan?.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="sm"
              iconName={isPlaying ? "Pause" : "Play"}
              onClick={onPlayToggle}
            >
              {isPlaying ? 'Pause' : 'Play'} Animation
            </Button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center space-x-1 mb-4">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={viewMode === mode?.id ? "default" : "ghost"}
              size="sm"
              iconName={mode?.icon}
              onClick={() => setViewMode(mode?.id)}
              className="text-xs"
            >
              {mode?.name}
            </Button>
          ))}
        </div>

        {/* Control Panel */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body text-muted-foreground">Zoom:</span>
              <Button variant="ghost" size="sm" iconName="ZoomOut" onClick={handleZoomOut} />
              <span className="text-sm font-data text-foreground min-w-12 text-center">
                {zoomLevel}%
              </span>
              <Button variant="ghost" size="sm" iconName="ZoomIn" onClick={handleZoomIn} />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body text-muted-foreground">Speed:</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e?.target?.value))}
                className="w-16 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-data text-foreground min-w-8">
                {rotationSpeed}x
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={showDrugPaths ? "default" : "ghost"}
              size="sm"
              iconName="Route"
              onClick={() => setShowDrugPaths(!showDrugPaths)}
            >
              Drug Paths
            </Button>
            <Button variant="ghost" size="sm" iconName="RotateCcw" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      {/* 3D Viewer Area */}
      <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800">
        <div 
          ref={viewerRef}
          className="w-full h-full flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {selectedOrgan ? (
            <div className="relative">
              {/* Mock 3D Organ Representation */}
              <div 
                className="w-48 h-48 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse"
                style={{ 
                  backgroundColor: selectedOrgan?.color,
                  boxShadow: `0 0 50px ${selectedOrgan?.color}40`
                }}
              >
                <div className="text-center">
                  <Icon name="Heart" size={64} color="white" className="mb-2" />
                  <p className="text-lg font-heading font-semibold">
                    {selectedOrgan?.name}
                  </p>
                  <p className="text-sm opacity-80">
                    {viewMode?.charAt(0)?.toUpperCase() + viewMode?.slice(1)} View
                  </p>
                </div>
              </div>

              {/* Drug Path Animations */}
              {showDrugPaths && mockDrugPaths?.map((path, index) => (
                <div
                  key={path?.id}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    animation: isPlaying ? `drugFlow${index + 1} 3s infinite linear` : 'none'
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full absolute"
                    style={{ 
                      backgroundColor: path?.color,
                      boxShadow: `0 0 10px ${path?.color}`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white">
              <Icon name="Search" size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-body">Select an organ to begin analysis</p>
              <p className="text-sm opacity-70">Choose from the organ selector panel</p>
            </div>
          )}
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="ghost" size="sm" iconName="Maximize2" className="bg-black/20 text-white hover:bg-black/40" />
          <Button variant="ghost" size="sm" iconName="Camera" className="bg-black/20 text-white hover:bg-black/40" />
          <Button variant="ghost" size="sm" iconName="Settings" className="bg-black/20 text-white hover:bg-black/40" />
        </div>

        {/* Drug Path Legend */}
        {showDrugPaths && selectedOrgan && (
          <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-3 text-white">
            <h4 className="text-sm font-body font-medium mb-2">Active Drug Pathways</h4>
            <div className="space-y-1">
              {mockDrugPaths?.map((path) => (
                <div key={path?.id} className="flex items-center space-x-2 text-xs">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: path?.color }}
                  />
                  <span className="opacity-90">{path?.path}</span>
                  <span className="font-data">{path?.intensity}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes drugFlow1 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes drugFlow2 {
          0% { transform: translate(-50%, -50%) rotate(120deg) translateX(80px) rotate(-120deg); }
          100% { transform: translate(-50%, -50%) rotate(480deg) translateX(80px) rotate(-480deg); }
        }
        @keyframes drugFlow3 {
          0% { transform: translate(-50%, -50%) rotate(240deg) translateX(120px) rotate(-240deg); }
          100% { transform: translate(-50%, -50%) rotate(600deg) translateX(120px) rotate(-600deg); }
        }
      `}</style>
    </div>
  );
};

export default OrganViewer3D;