import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientParameterPanel = ({ onParameterChange, parameters }) => {
  const [activePreset, setActivePreset] = useState(null);

  const presetProfiles = [
    {
      id: 'young-adult',
      name: 'Young Adult',
      icon: 'User',
      parameters: {
        age: 25,
        bodyFat: 15,
        bloodSugar: 90,
        weight: 70,
        height: 175,
        gender: 'male'
      }
    },
    {
      id: 'middle-aged',
      name: 'Middle Aged',
      icon: 'UserCheck',
      parameters: {
        age: 45,
        bodyFat: 22,
        bloodSugar: 105,
        weight: 80,
        height: 170,
        gender: 'female'
      }
    },
    {
      id: 'elderly',
      name: 'Elderly',
      icon: 'Users',
      parameters: {
        age: 70,
        bodyFat: 28,
        bloodSugar: 120,
        weight: 75,
        height: 165,
        gender: 'male'
      }
    },
    {
      id: 'diabetic',
      name: 'Diabetic',
      icon: 'Activity',
      parameters: {
        age: 55,
        bodyFat: 30,
        bloodSugar: 180,
        weight: 85,
        height: 168,
        gender: 'female'
      }
    }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const handlePresetSelect = (preset) => {
    setActivePreset(preset?.id);
    onParameterChange(preset?.parameters);
  };

  const handleParameterUpdate = (field, value) => {
    const updatedParameters = {
      ...parameters,
      [field]: value
    };
    onParameterChange(updatedParameters);
    setActivePreset(null); // Clear preset when manually adjusting
  };

  const getBloodSugarStatus = (value) => {
    if (value < 70) return { status: 'Low', color: 'text-warning' };
    if (value <= 100) return { status: 'Normal', color: 'text-success' };
    if (value <= 125) return { status: 'Pre-diabetic', color: 'text-warning' };
    return { status: 'Diabetic', color: 'text-error' };
  };

  const getBodyFatStatus = (value, gender) => {
    const ranges = gender === 'female' 
      ? { low: 16, normal: 25, high: 32 }
      : { low: 8, normal: 18, high: 25 };
    
    if (value < ranges?.low) return { status: 'Low', color: 'text-warning' };
    if (value <= ranges?.normal) return { status: 'Normal', color: 'text-success' };
    if (value <= ranges?.high) return { status: 'High', color: 'text-warning' };
    return { status: 'Very High', color: 'text-error' };
  };

  const bloodSugarStatus = getBloodSugarStatus(parameters?.bloodSugar);
  const bodyFatStatus = getBodyFatStatus(parameters?.bodyFat, parameters?.gender);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Patient Parameters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={() => handlePresetSelect(presetProfiles?.[0])}
        >
          Reset
        </Button>
      </div>
      {/* Preset Profiles */}
      <div className="space-y-3">
        <h3 className="text-sm font-body font-medium text-foreground">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {presetProfiles?.map((preset) => (
            <Button
              key={preset?.id}
              variant={activePreset === preset?.id ? "default" : "outline"}
              size="sm"
              iconName={preset?.icon}
              iconPosition="left"
              onClick={() => handlePresetSelect(preset)}
              className="justify-start text-xs"
            >
              {preset?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Basic Demographics */}
      <div className="space-y-4">
        <h3 className="text-sm font-body font-medium text-foreground">Demographics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            value={parameters?.age}
            onChange={(e) => handleParameterUpdate('age', parseInt(e?.target?.value))}
            min="1"
            max="120"
            className="text-sm"
          />
          
          <Select
            label="Gender"
            options={genderOptions}
            value={parameters?.gender}
            onChange={(value) => handleParameterUpdate('gender', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Weight (kg)"
            type="number"
            value={parameters?.weight}
            onChange={(e) => handleParameterUpdate('weight', parseFloat(e?.target?.value))}
            min="20"
            max="300"
            step="0.1"
          />
          
          <Input
            label="Height (cm)"
            type="number"
            value={parameters?.height}
            onChange={(e) => handleParameterUpdate('height', parseInt(e?.target?.value))}
            min="100"
            max="250"
          />
        </div>
      </div>
      {/* Body Composition */}
      <div className="space-y-4">
        <h3 className="text-sm font-body font-medium text-foreground">Body Composition</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-body text-foreground">Body Fat %</label>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-data text-foreground">{parameters?.bodyFat}%</span>
              <span className={`text-xs font-caption ${bodyFatStatus?.color}`}>
                {bodyFatStatus?.status}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            value={parameters?.bodyFat}
            onChange={(e) => handleParameterUpdate('bodyFat', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
      </div>
      {/* Blood Parameters */}
      <div className="space-y-4">
        <h3 className="text-sm font-body font-medium text-foreground">Blood Parameters</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-body text-foreground">Blood Sugar (mg/dL)</label>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-data text-foreground">{parameters?.bloodSugar}</span>
              <span className={`text-xs font-caption ${bloodSugarStatus?.color}`}>
                {bloodSugarStatus?.status}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="50"
            max="300"
            value={parameters?.bloodSugar}
            onChange={(e) => handleParameterUpdate('bloodSugar', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>50</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
          </div>
        </div>
      </div>
      {/* BMI Calculation */}
      <div className="bg-surface rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-body text-foreground">BMI</span>
          <span className="text-lg font-data font-semibold text-foreground">
            {(parameters?.weight / ((parameters?.height / 100) ** 2))?.toFixed(1)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Body Mass Index calculated from height and weight
        </div>
      </div>
      {/* Parameter Summary */}
      <div className="bg-surface rounded-lg p-4">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">Parameter Summary</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="text-foreground font-medium">{parameters?.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gender:</span>
            <span className="text-foreground font-medium capitalize">{parameters?.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Body Fat:</span>
            <span className={`font-medium ${bodyFatStatus?.color}`}>{parameters?.bodyFat}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blood Sugar:</span>
            <span className={`font-medium ${bloodSugarStatus?.color}`}>{parameters?.bloodSugar} mg/dL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientParameterPanel;