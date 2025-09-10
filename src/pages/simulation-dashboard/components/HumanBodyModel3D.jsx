import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const HumanBodyModel3D = ({ 
  parameters, 
  selectedDrugs, 
  highlightedOrgans, 
  onOrganClick,
  isAnimating 
}) => {
  const [viewMode, setViewMode] = useState('front');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showMuscles, setShowMuscles] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const modelRef = useRef(null);

  // Enhanced organ positions with more anatomical accuracy
  const organPositions = {
    brain: { x: 50, y: 12, width: 12, height: 10, depth: 8 },
    heart: { x: 52, y: 35, width: 10, height: 12, depth: 6 },
    lungs: { x: 50, y: 32, width: 18, height: 15, depth: 8 },
    liver: { x: 56, y: 45, width: 14, height: 10, depth: 8 },
    stomach: { x: 48, y: 42, width: 8, height: 8, depth: 5 },
    pancreas: { x: 50, y: 48, width: 8, height: 3, depth: 2 },
    kidneys: { x: 50, y: 55, width: 8, height: 6, depth: 4 },
    intestines: { x: 50, y: 65, width: 12, height: 20, depth: 6 },
    bladder: { x: 50, y: 78, width: 6, height: 5, depth: 4 },
    spine: { x: 50, y: 50, width: 2, height: 60, depth: 3 }
  };

  // Skeletal structure points for more realistic anatomy
  const skeletalStructure = {
    skull: { cx: 50, cy: 12, rx: 8, ry: 9 },
    ribcage: [
      { x1: 42, y1: 28, x2: 58, y2: 28, curve: 'M42,28 Q50,25 58,28' },
      { x1: 41, y1: 32, x2: 59, y2: 32, curve: 'M41,32 Q50,29 59,32' },
      { x1: 40, y1: 36, x2: 60, y2: 36, curve: 'M40,36 Q50,33 60,36' },
      { x1: 41, y1: 40, x2: 59, y2: 40, curve: 'M41,40 Q50,37 59,40' },
      { x1: 42, y1: 44, x2: 58, y2: 44, curve: 'M42,44 Q50,41 58,44' }
    ],
    spine: { x1: 50, y1: 20, x2: 50, y2: 85 },
    pelvis: { cx: 50, cy: 75, rx: 12, ry: 6 },
    femur: [
      { x1: 45, y1: 80, x2: 46, y2: 120 },
      { x1: 55, y1: 80, x2: 54, y2: 120 }
    ],
    tibia: [
      { x1: 46, y1: 120, x2: 47, y2: 160 },
      { x1: 54, y1: 120, x2: 53, y2: 160 }
    ]
  };

  // Muscle groups for realistic body definition
  const muscleGroups = {
    chest: { 
      path: 'M42,30 Q50,28 58,30 Q56,38 50,40 Q44,38 42,30 Z',
      color: 'rgba(139, 69, 19, 0.6)'
    },
    abs: {
      path: 'M46,45 L54,45 L53,65 L47,65 Z',
      segments: [
        { x: 50, y: 48, width: 6, height: 3 },
        { x: 50, y: 52, width: 6, height: 3 },
        { x: 50, y: 56, width: 6, height: 3 },
        { x: 50, y: 60, width: 6, height: 3 }
      ],
      color: 'rgba(160, 82, 45, 0.5)'
    },
    shoulders: [
      { cx: 38, cy: 28, rx: 6, ry: 4, color: 'rgba(205, 133, 63, 0.6)' },
      { cx: 62, cy: 28, rx: 6, ry: 4, color: 'rgba(205, 133, 63, 0.6)' }
    ],
    biceps: [
      { cx: 35, cy: 35, rx: 3, ry: 8, color: 'rgba(210, 180, 140, 0.7)' },
      { cx: 65, cy: 35, rx: 3, ry: 8, color: 'rgba(210, 180, 140, 0.7)' }
    ],
    quadriceps: [
      { x: 44, y: 85, width: 4, height: 25, color: 'rgba(222, 184, 135, 0.6)' },
      { x: 52, y: 85, width: 4, height: 25, color: 'rgba(222, 184, 135, 0.6)' }
    ]
  };

  const getOrganColor = (organName) => {
    const isHighlighted = highlightedOrgans?.includes(organName);
    const isTargeted = selectedDrugs?.some(drug => 
      drug?.isActive && drug?.targetOrgans?.includes(organName)
    );
    
    if (isTargeted && isAnimating) return '#3B82F6'; // Primary blue for active drug targets
    if (isHighlighted) return '#10B981'; // Success green for highlighted
    if (isTargeted) return '#6366F1'; // Indigo for drug targets
    
    // Organ-specific realistic colors
    const organColors = {
      brain: 'rgba(255, 182, 193, 0.8)',
      heart: 'rgba(220, 20, 60, 0.8)',
      lungs: 'rgba(255, 160, 122, 0.7)',
      liver: 'rgba(139, 69, 19, 0.8)',
      stomach: 'rgba(255, 218, 185, 0.7)',
      pancreas: 'rgba(255, 228, 196, 0.8)',
      kidneys: 'rgba(165, 42, 42, 0.8)',
      intestines: 'rgba(255, 222, 173, 0.7)',
      bladder: 'rgba(255, 255, 224, 0.8)',
      spine: 'rgba(245, 245, 245, 0.9)'
    };

    const baseOpacity = 0.8;
    if (parameters?.bloodSugar > 140 && ['pancreas', 'liver']?.includes(organName)) {
      return `rgba(239, 68, 68, ${baseOpacity})`; // Red for diabetes-affected organs
    }
    if (parameters?.bodyFat > 25 && ['heart', 'liver']?.includes(organName)) {
      return `rgba(245, 158, 11, ${baseOpacity})`; // Amber for high body fat effects
    }
    
    return organColors?.[organName] || `rgba(100, 116, 139, ${baseOpacity})`; // Default slate
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e?.clientX - dragStart?.x;
    const deltaY = e?.clientY - dragStart?.y;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev?.x + deltaY * 0.5)),
      y: prev?.y + deltaX * 0.5
    }));
    
    setDragStart({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e?.preventDefault();
    const delta = e?.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const handleOrganClick = (organName, event) => {
    event?.stopPropagation();
    onOrganClick(organName);
  };

  const resetView = () => {
    setZoomLevel(1);
    setRotation({ x: 0, y: 0 });
    setViewMode('front');
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const getBodyShape = () => {
    const baseFactor = 1;
    const fatFactor = 1 + (parameters?.bodyFat - 15) * 0.02;
    const ageFactor = 1 + (parameters?.age - 25) * 0.005;
    
    return {
      width: Math.max(0.8, Math.min(1.4, baseFactor * fatFactor * ageFactor)),
      height: Math.max(0.9, Math.min(1.1, baseFactor + (parameters?.age - 25) * 0.002))
    };
  };

  const bodyShape = getBodyShape();

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Enhanced Header Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          3D Human Anatomy Model
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-surface rounded-lg p-1">
            <Button
              variant={viewMode === 'front' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('front')}
              className="text-xs px-3"
            >
              Front
            </Button>
            <Button
              variant={viewMode === 'back' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('back')}
              className="text-xs px-3"
            >
              Back
            </Button>
            <Button
              variant={viewMode === 'side' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('side')}
              className="text-xs px-3"
            >
              Side
            </Button>
          </div>
          <div className="flex items-center bg-surface rounded-lg p-1">
            <Button
              variant={showMuscles ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowMuscles(!showMuscles)}
              className="text-xs px-2"
            >
              MUS
            </Button>
            <Button
              variant={showSkeleton ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowSkeleton(!showSkeleton)}
              className="text-xs px-2"
            >
              SKE
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={resetView}
          />
        </div>
      </div>
      {/* Enhanced 3D Model Container */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg overflow-hidden border-2 border-slate-200" style={{ height: '600px' }}>
        <div
          ref={modelRef}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          style={{
            transform: `scale(${zoomLevel}) rotateX(${rotation?.x}deg) rotateY(${rotation?.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.2s ease',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
          }}
        >
          {/* Enhanced Human Body Model */}
          <div className="relative">
            <svg
              width="250"
              height="500"
              viewBox="0 0 100 200"
              className="drop-shadow-xl"
              style={{
                transform: `scaleX(${bodyShape?.width}) scaleY(${bodyShape?.height})`
              }}
            >
              <defs>
                {/* Enhanced gradients for 3D effect */}
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(241, 245, 249, 0.9)" />
                  <stop offset="50%" stopColor="rgba(248, 250, 252, 0.95)" />
                  <stop offset="100%" stopColor="rgba(226, 232, 240, 0.8)" />
                </linearGradient>
                <radialGradient id="muscleGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(205, 133, 63, 0.8)" />
                  <stop offset="100%" stopColor="rgba(139, 69, 19, 0.6)" />
                </radialGradient>
                <linearGradient id="organGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
                </linearGradient>
              </defs>

              {/* Enhanced Body outline with realistic proportions */}
              <path
                d="M50 15 
                   C45 15, 38 18, 38 25 
                   L38 28 C35 30, 35 32, 38 34
                   L38 50 C36 55, 36 60, 38 65 
                   L38 75 C38 78, 40 80, 42 82
                   C42 85, 44 88, 46 90
                   L46 110 C46 115, 47 120, 48 125
                   L48 160 C48 165, 47 170, 46 175
                   C46 180, 48 185, 50 185
                   C52 185, 54 180, 54 175
                   C53 170, 52 165, 52 160
                   L52 125 C53 120, 54 115, 54 110
                   L54 90 C56 88, 58 85, 58 82
                   C60 80, 62 78, 62 75
                   L62 65 C64 60, 64 55, 62 50
                   L62 34 C65 32, 65 30, 62 28
                   L62 25 C62 18, 55 15, 50 15 Z"
                fill="url(#bodyGradient)"
                stroke="rgba(71, 85, 105, 0.3)"
                strokeWidth="0.8"
              />
              
              {/* Enhanced Head with facial features */}
              <ellipse
                cx="50"
                cy="10"
                rx="9"
                ry="10"
                fill="url(#bodyGradient)"
                stroke="rgba(71, 85, 105, 0.3)"
                strokeWidth="0.8"
              />
              
              {/* Neck definition */}
              <rect
                x="47"
                y="18"
                width="6"
                height="8"
                rx="3"
                fill="url(#bodyGradient)"
                stroke="rgba(71, 85, 105, 0.2)"
                strokeWidth="0.5"
              />

              {/* Arms with realistic proportions */}
              <ellipse cx="32" cy="35" rx="4" ry="15" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="68" cy="35" rx="4" ry="15" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="30" cy="55" rx="3" ry="12" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="70" cy="55" rx="3" ry="12" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />

              {/* Enhanced Legs */}
              <ellipse cx="45" cy="110" rx="5" ry="20" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="55" cy="110" rx="5" ry="20" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="45" cy="140" rx="4" ry="18" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />
              <ellipse cx="55" cy="140" rx="4" ry="18" fill="url(#bodyGradient)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="0.6" />

              {/* Skeletal Structure */}
              {showSkeleton && (
                <g className="skeleton" opacity="0.7">
                  {/* Skull */}
                  <ellipse 
                    cx={skeletalStructure?.skull?.cx} 
                    cy={skeletalStructure?.skull?.cy} 
                    rx={skeletalStructure?.skull?.rx} 
                    ry={skeletalStructure?.skull?.ry}
                    fill="none" 
                    stroke="#F1F5F9" 
                    strokeWidth="1.2"
                  />
                  
                  {/* Ribcage */}
                  {skeletalStructure?.ribcage?.map((rib, index) => (
                    <path 
                      key={index}
                      d={rib?.curve}
                      fill="none" 
                      stroke="#F1F5F9" 
                      strokeWidth="0.8"
                    />
                  ))}
                  
                  {/* Spine */}
                  <line 
                    x1={skeletalStructure?.spine?.x1} 
                    y1={skeletalStructure?.spine?.y1}
                    x2={skeletalStructure?.spine?.x2} 
                    y2={skeletalStructure?.spine?.y2}
                    stroke="#F1F5F9" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Pelvis */}
                  <ellipse 
                    cx={skeletalStructure?.pelvis?.cx} 
                    cy={skeletalStructure?.pelvis?.cy}
                    rx={skeletalStructure?.pelvis?.rx} 
                    ry={skeletalStructure?.pelvis?.ry}
                    fill="none" 
                    stroke="#F1F5F9" 
                    strokeWidth="1.2"
                  />
                  
                  {/* Leg bones */}
                  {skeletalStructure?.femur?.map((bone, index) => (
                    <line 
                      key={`femur-${index}`}
                      x1={bone?.x1} y1={bone?.y1} 
                      x2={bone?.x2} y2={bone?.y2}
                      stroke="#F1F5F9" 
                      strokeWidth="1"
                    />
                  ))}
                  {skeletalStructure?.tibia?.map((bone, index) => (
                    <line 
                      key={`tibia-${index}`}
                      x1={bone?.x1} y1={bone?.y1} 
                      x2={bone?.x2} y2={bone?.y2}
                      stroke="#F1F5F9" 
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}

              {/* Muscle Groups */}
              {showMuscles && (
                <g className="muscles" opacity="0.8">
                  {/* Chest muscles */}
                  <path 
                    d={muscleGroups?.chest?.path} 
                    fill="url(#muscleGradient)"
                    stroke="rgba(139, 69, 19, 0.4)"
                    strokeWidth="0.5"
                  />
                  
                  {/* Abdominal muscles */}
                  {muscleGroups?.abs?.segments?.map((segment, index) => (
                    <rect
                      key={index}
                      x={segment?.x - segment?.width/2}
                      y={segment?.y - segment?.height/2}
                      width={segment?.width}
                      height={segment?.height}
                      rx="1"
                      fill={muscleGroups?.abs?.color}
                      stroke="rgba(160, 82, 45, 0.3)"
                      strokeWidth="0.3"
                    />
                  ))}
                  
                  {/* Shoulder muscles */}
                  {muscleGroups?.shoulders?.map((shoulder, index) => (
                    <ellipse
                      key={index}
                      cx={shoulder?.cx}
                      cy={shoulder?.cy}
                      rx={shoulder?.rx}
                      ry={shoulder?.ry}
                      fill={shoulder?.color}
                      stroke="rgba(205, 133, 63, 0.4)"
                      strokeWidth="0.4"
                    />
                  ))}
                  
                  {/* Bicep muscles */}
                  {muscleGroups?.biceps?.map((bicep, index) => (
                    <ellipse
                      key={index}
                      cx={bicep?.cx}
                      cy={bicep?.cy}
                      rx={bicep?.rx}
                      ry={bicep?.ry}
                      fill={bicep?.color}
                      stroke="rgba(210, 180, 140, 0.5)"
                      strokeWidth="0.4"
                    />
                  ))}
                  
                  {/* Quadricep muscles */}
                  {muscleGroups?.quadriceps?.map((quad, index) => (
                    <rect
                      key={index}
                      x={quad?.x - quad?.width/2}
                      y={quad?.y}
                      width={quad?.width}
                      height={quad?.height}
                      rx="2"
                      fill={quad?.color}
                      stroke="rgba(222, 184, 135, 0.4)"
                      strokeWidth="0.4"
                    />
                  ))}
                </g>
              )}

              {/* Enhanced Organs with 3D effects */}
              {Object.entries(organPositions)?.map(([organName, position]) => {
                const isVisible = viewMode === 'front' || 
                  (viewMode === 'back' && ['kidneys', 'spine']?.includes(organName)) ||
                  (viewMode === 'side' && true);
                
                if (!isVisible) return null;

                return (
                  <g key={organName}>
                    {/* Organ shadow for depth */}
                    <ellipse
                      cx={position?.x + 1}
                      cy={position?.y + 1}
                      rx={position?.width / 2}
                      ry={position?.height / 2}
                      fill="rgba(0, 0, 0, 0.1)"
                      className="organ-shadow"
                    />
                    
                    {/* Main organ with enhanced visuals */}
                    <ellipse
                      cx={position?.x}
                      cy={position?.y}
                      rx={position?.width / 2}
                      ry={position?.height / 2}
                      fill={getOrganColor(organName)}
                      stroke={highlightedOrgans?.includes(organName) ? '#10B981' : 'rgba(255, 255, 255, 0.3)'}
                      strokeWidth={highlightedOrgans?.includes(organName) ? '1.5' : '0.8'}
                      className={`transition-all duration-300 cursor-pointer hover:opacity-90 ${
                        isAnimating && selectedDrugs?.some(drug => 
                          drug?.isActive && drug?.targetOrgans?.includes(organName)
                        ) ? 'animate-pulse' : ''
                      }`}
                      onClick={(e) => handleOrganClick(organName, e)}
                      style={{
                        filter: 'url(#organGradient)'
                      }}
                    />
                    
                    {/* Highlight overlay for 3D effect */}
                    <ellipse
                      cx={position?.x - 0.5}
                      cy={position?.y - 0.5}
                      rx={position?.width / 4}
                      ry={position?.height / 4}
                      fill="rgba(255, 255, 255, 0.4)"
                      className="organ-highlight pointer-events-none"
                    />
                    
                    {/* Organ label */}
                    <text
                      x={position?.x}
                      y={position?.y + position?.height / 2 + 4}
                      textAnchor="middle"
                      className="text-xs fill-foreground opacity-0 hover:opacity-100 transition-opacity pointer-events-none font-semibold"
                      style={{ fontSize: '3px' }}
                    >
                      {organName?.charAt(0)?.toUpperCase() + organName?.slice(1)}
                    </text>
                  </g>
                );
              })}

              {/* Enhanced Drug effect pathways */}
              {isAnimating && selectedDrugs?.filter(drug => drug?.isActive)?.map((drug, drugIndex) => (
                <g key={`pathway-${drug?.id}`}>
                  {drug?.targetOrgans?.map((organ, organIndex) => {
                    const organPos = organPositions?.[organ];
                    if (!organPos) return null;
                    
                    return (
                      <g key={`${drug?.id}-${organ}`}>
                        {/* Enhanced pathway with glow effect */}
                        <line
                          x1="50"
                          y1="90"
                          x2={organPos?.x}
                          y2={organPos?.y}
                          stroke="#3B82F6"
                          strokeWidth="1.2"
                          strokeDasharray="3,2"
                          className="animate-pulse"
                          opacity="0.8"
                          style={{
                            filter: 'drop-shadow(0 0 2px #3B82F6)'
                          }}
                        />
                        
                        {/* Enhanced moving particle effect */}
                        <circle
                          r="1.2"
                          fill="#60A5FA"
                          className="animate-bounce"
                          style={{
                            animationDelay: `${(drugIndex * 0.5 + organIndex * 0.2)}s`,
                            filter: 'drop-shadow(0 0 3px #3B82F6)'
                          }}
                        >
                          <animateMotion
                            dur="2.5s"
                            repeatCount="indefinite"
                            path={`M50,90 L${organPos?.x},${organPos?.y}`}
                          />
                        </circle>
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Enhanced Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="sm"
            iconName="Plus"
            onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
            className="bg-white/90 backdrop-blur-sm"
          />
          <Button
            variant="secondary"
            size="sm"
            iconName="Minus"
            onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
            className="bg-white/90 backdrop-blur-sm"
          />
        </div>

        {/* Enhanced View Information */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 space-y-3 border border-white/20 shadow-xl">
          <div className="text-sm text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">View: {viewMode?.charAt(0)?.toUpperCase() + viewMode?.slice(1)}</div>
            <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
            <div>Rotation: {Math.round(rotation?.y)}°</div>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-xs">Layers:</span>
              <div className="flex space-x-1">
                {showMuscles && <span className="text-xs bg-orange-100 text-orange-700 px-1 rounded">MUS</span>}
                {showSkeleton && <span className="text-xs bg-gray-100 text-gray-700 px-1 rounded">SKE</span>}
              </div>
            </div>
          </div>
          {selectedDrugs?.filter(drug => drug?.isActive)?.length > 0 && (
            <div className="text-sm border-t border-slate-200 pt-2">
              <div className="text-primary font-semibold">Active Drugs:</div>
              <div className="space-y-1">
                {selectedDrugs?.filter(drug => drug?.isActive)?.map(drug => (
                  <div key={drug?.id} className="text-xs text-slate-600">
                    {drug?.name} ({drug?.dosage}{drug?.dosageRange?.unit})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Animation Status */}
        {isAnimating && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-30"></div>
              </div>
              <div>
                <span className="text-sm text-blue-800 font-semibold">Simulation Active</span>
                <div className="text-xs text-blue-600">Drug effects in progress</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Enhanced Model Controls */}
      <div className="flex items-center justify-between text-sm text-muted-foreground bg-surface/50 rounded-lg p-3">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Click organs to analyze</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span>Drag to rotate model</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Scroll to zoom</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-500/70 rounded border border-white/30"></div>
            <span className="text-xs">Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded border border-white/30"></div>
            <span className="text-xs">Drug Target</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded border border-white/30"></div>
            <span className="text-xs">Highlighted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanBodyModel3D;