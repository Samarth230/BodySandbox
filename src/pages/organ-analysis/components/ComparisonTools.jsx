import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonTools = ({ selectedOrgan, onDrugCompare, className = '' }) => {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('effectiveness');
  const [showComparison, setShowComparison] = useState(false);

  const availableDrugs = [
    { 
      id: 'metoprolol', 
      name: 'Metoprolol', 
      class: 'Beta-blocker',
      effectiveness: 85,
      sideEffects: 15,
      onset: 30,
      duration: 480,
      cost: 25
    },
    { 
      id: 'atenolol', 
      name: 'Atenolol', 
      class: 'Beta-blocker',
      effectiveness: 80,
      sideEffects: 12,
      onset: 45,
      duration: 720,
      cost: 18
    },
    { 
      id: 'propranolol', 
      name: 'Propranolol', 
      class: 'Beta-blocker',
      effectiveness: 90,
      sideEffects: 25,
      onset: 20,
      duration: 360,
      cost: 30
    },
    { 
      id: 'carvedilol', 
      name: 'Carvedilol', 
      class: 'Alpha/Beta-blocker',
      effectiveness: 88,
      sideEffects: 20,
      onset: 60,
      duration: 720,
      cost: 45
    }
  ];

  const comparisonModes = [
    { id: 'effectiveness', name: 'Effectiveness', icon: 'TrendingUp', unit: '%' },
    { id: 'sideEffects', name: 'Side Effects', icon: 'AlertTriangle', unit: '%' },
    { id: 'onset', name: 'Onset Time', icon: 'Clock', unit: 'min' },
    { id: 'duration', name: 'Duration', icon: 'Timer', unit: 'min' },
    { id: 'cost', name: 'Cost', icon: 'DollarSign', unit: '$' }
  ];

  const handleDrugToggle = (drug) => {
    setSelectedDrugs(prev => {
      const isSelected = prev?.find(d => d?.id === drug?.id);
      if (isSelected) {
        return prev?.filter(d => d?.id !== drug?.id);
      } else if (prev?.length < 4) {
        return [...prev, drug];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedDrugs?.length >= 2) {
      setShowComparison(true);
      if (onDrugCompare) {
        onDrugCompare(selectedDrugs, comparisonMode);
      }
    }
  };

  const getComparisonValue = (drug, mode) => {
    return drug?.[mode] || 0;
  };

  const getMaxValue = (mode) => {
    return Math.max(...selectedDrugs?.map(drug => getComparisonValue(drug, mode)));
  };

  const getBarColor = (drug, mode, value) => {
    const maxValue = getMaxValue(mode);
    if (mode === 'sideEffects') {
      return value === maxValue ? '#DC2626' : '#F59E0B';
    }
    return value === maxValue ? '#059669' : '#2563EB';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Drug Comparison
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedDrugs?.length}/4 selected
            </span>
            <Button
              variant="default"
              size="sm"
              iconName="GitCompare"
              onClick={handleCompare}
              disabled={selectedDrugs?.length < 2}
            >
              Compare
            </Button>
          </div>
        </div>

        {/* Comparison Mode Selector */}
        <div className="flex flex-wrap gap-1 mb-4">
          {comparisonModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={comparisonMode === mode?.id ? "default" : "ghost"}
              size="sm"
              iconName={mode?.icon}
              onClick={() => setComparisonMode(mode?.id)}
              className="text-xs"
            >
              {mode?.name}
            </Button>
          ))}
        </div>

        {selectedOrgan && (
          <div className="p-2 bg-surface rounded border-l-4 border-primary">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Target Organ:</span>
              <div className="flex items-center space-x-1">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedOrgan?.color }}
                />
                <span className="text-sm text-foreground font-medium">
                  {selectedOrgan?.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Drug Selection */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          Select Drugs to Compare
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {availableDrugs?.map((drug) => {
            const isSelected = selectedDrugs?.find(d => d?.id === drug?.id);
            const isDisabled = !isSelected && selectedDrugs?.length >= 4;
            
            return (
              <button
                key={drug?.id}
                onClick={() => handleDrugToggle(drug)}
                disabled={isDisabled}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-foreground'
                    : isDisabled
                    ? 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
                    : 'border-border hover:border-primary/50 hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {isSelected && <Icon name="Check" size={12} color="white" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-body font-medium">{drug?.name}</p>
                    <p className="text-xs text-muted-foreground">{drug?.class}</p>
                  </div>
                </div>
                <Icon name="Pill" size={16} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
      {/* Comparison Results */}
      {showComparison && selectedDrugs?.length >= 2 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-body font-medium text-foreground">
              Comparison Results - {comparisonModes?.find(m => m?.id === comparisonMode)?.name}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setShowComparison(false)}
            />
          </div>

          <div className="space-y-4">
            {selectedDrugs?.map((drug) => {
              const value = getComparisonValue(drug, comparisonMode);
              const maxValue = getMaxValue(comparisonMode);
              const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
              const unit = comparisonModes?.find(m => m?.id === comparisonMode)?.unit || '';
              
              return (
                <div key={drug?.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-body font-medium text-foreground">
                        {drug?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {drug?.class}
                      </span>
                    </div>
                    <span className="text-sm font-data text-foreground font-medium">
                      {value}{unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: getBarColor(drug, comparisonMode, value)
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Summary */}
          <div className="mt-4 p-3 bg-surface rounded-lg">
            <h5 className="text-sm font-body font-medium text-foreground mb-2">
              Analysis Summary
            </h5>
            <div className="text-sm text-muted-foreground">
              {comparisonMode === 'effectiveness' && (
                <p>Higher effectiveness indicates better therapeutic outcomes for the selected organ.</p>
              )}
              {comparisonMode === 'sideEffects' && (
                <p>Lower side effect percentages indicate better safety profiles.</p>
              )}
              {comparisonMode === 'onset' && (
                <p>Faster onset times provide quicker therapeutic relief.</p>
              )}
              {comparisonMode === 'duration' && (
                <p>Longer duration reduces dosing frequency requirements.</p>
              )}
              {comparisonMode === 'cost' && (
                <p>Cost comparison helps in treatment affordability assessment.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {selectedDrugs?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="GitCompare" size={48} className="text-muted-foreground mb-4 mx-auto" />
          <p className="text-muted-foreground mb-2">
            Select drugs to compare their effects
          </p>
          <p className="text-sm text-muted-foreground">
            Choose 2-4 drugs to analyze their comparative effectiveness
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTools;