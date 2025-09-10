import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrganInformationPanel = ({ 
  selectedOrgan, 
  selectedDrugs, 
  parameters,
  onSystemFilter 
}) => {
  const [activeSystem, setActiveSystem] = useState('all');

  const organDatabase = {
    heart: {
      name: 'Heart',
      system: 'cardiovascular',
      description: 'Muscular organ that pumps blood throughout the body',
      functions: ['Blood circulation', 'Oxygen transport', 'Nutrient delivery'],
      affectedBy: ['age', 'bodyFat', 'bloodSugar'],
      normalValues: {
        heartRate: '60-100 bpm',
        bloodPressure: '120/80 mmHg',
        cardiacOutput: '4-8 L/min'
      },
      drugEffects: {
        aspirin: 'Reduces clotting risk, cardioprotective',
        lisinopril: 'Lowers blood pressure, reduces workload',
        simvastatin: 'Improves coronary artery health'
      }
    },
    liver: {
      name: 'Liver',
      system: 'digestive',
      description: 'Largest internal organ responsible for metabolism and detoxification',
      functions: ['Drug metabolism', 'Protein synthesis', 'Glucose regulation'],
      affectedBy: ['age', 'bodyFat', 'bloodSugar'],
      normalValues: {
        alt: '7-56 U/L',
        ast: '10-40 U/L',
        bilirubin: '0.1-1.2 mg/dL'
      },
      drugEffects: {
        metformin: 'Reduces glucose production',
        simvastatin: 'Metabolized here, may affect enzymes',
        warfarin: 'Metabolized and affects clotting factors'
      }
    },
    kidneys: {
      name: 'Kidneys',
      system: 'urinary',
      description: 'Paired organs that filter blood and produce urine',
      functions: ['Blood filtration', 'Electrolyte balance', 'Blood pressure regulation'],
      affectedBy: ['age', 'bloodSugar'],
      normalValues: {
        creatinine: '0.6-1.2 mg/dL',
        bun: '7-20 mg/dL',
        gfr: '>60 mL/min/1.73m²'
      },
      drugEffects: {
        lisinopril: 'Protects kidney function, may affect GFR',
        metformin: 'Excreted by kidneys, dose adjustment needed'
      }
    },
    stomach: {
      name: 'Stomach',
      system: 'digestive',
      description: 'Muscular sac that stores and digests food',
      functions: ['Food storage', 'Acid production', 'Protein digestion'],
      affectedBy: ['age'],
      normalValues: {
        ph: '1.5-3.5',
        capacity: '1-1.5 L',
        emptyingTime: '2-4 hours'
      },
      drugEffects: {
        aspirin: 'May cause irritation and bleeding',
        omeprazole: 'Reduces acid production significantly'
      }
    },
    lungs: {
      name: 'Lungs',
      system: 'respiratory',
      description: 'Paired organs responsible for gas exchange',
      functions: ['Oxygen uptake', 'Carbon dioxide removal', 'pH regulation'],
      affectedBy: ['age'],
      normalValues: {
        respiratoryRate: '12-20 breaths/min',
        oxygenSaturation: '95-100%',
        tidalVolume: '500 mL'
      },
      drugEffects: {}
    },
    brain: {
      name: 'Brain',
      system: 'nervous',
      description: 'Central control organ of the nervous system',
      functions: ['Cognitive function', 'Motor control', 'Sensory processing'],
      affectedBy: ['age', 'bloodSugar'],
      normalValues: {
        intracranialPressure: '5-15 mmHg',
        cerebralBloodFlow: '50 mL/100g/min',
        glucoseUtilization: '5-6 mg/100g/min'
      },
      drugEffects: {
        aspirin: 'Crosses blood-brain barrier, affects platelets'
      }
    },
    pancreas: {
      name: 'Pancreas',
      system: 'endocrine',
      description: 'Dual-function organ producing digestive enzymes and hormones',
      functions: ['Insulin production', 'Digestive enzyme secretion', 'Blood sugar regulation'],
      affectedBy: ['bloodSugar', 'age'],
      normalValues: {
        insulin: '2.6-24.9 µU/mL',
        glucagon: '50-100 pg/mL',
        amylase: '30-110 U/L'
      },
      drugEffects: {
        metformin: 'Enhances insulin sensitivity'
      }
    }
  };

  const bodySystems = [
    { id: 'all', name: 'All Systems', icon: 'Layers', color: 'text-foreground' },
    { id: 'cardiovascular', name: 'Cardiovascular', icon: 'Heart', color: 'text-red-500' },
    { id: 'respiratory', name: 'Respiratory', icon: 'Wind', color: 'text-blue-500' },
    { id: 'digestive', name: 'Digestive', icon: 'Utensils', color: 'text-green-500' },
    { id: 'nervous', name: 'Nervous', icon: 'Brain', color: 'text-purple-500' },
    { id: 'urinary', name: 'Urinary', icon: 'Droplets', color: 'text-cyan-500' },
    { id: 'endocrine', name: 'Endocrine', icon: 'Activity', color: 'text-orange-500' }
  ];

  const getParameterEffect = (organ, parameter) => {
    const effects = {
      age: {
        heart: parameters?.age > 50 ? 'Decreased cardiac output' : 'Normal function',
        liver: parameters?.age > 60 ? 'Reduced metabolism' : 'Normal metabolism',
        kidneys: parameters?.age > 65 ? 'Decreased GFR' : 'Normal filtration'
      },
      bodyFat: {
        heart: parameters?.bodyFat > 25 ? 'Increased workload' : 'Normal workload',
        liver: parameters?.bodyFat > 30 ? 'Fatty infiltration risk' : 'Normal structure'
      },
      bloodSugar: {
        pancreas: parameters?.bloodSugar > 140 ? 'Overworked beta cells' : 'Normal insulin production',
        kidneys: parameters?.bloodSugar > 180 ? 'Glucose spillage' : 'Normal glucose handling',
        brain: parameters?.bloodSugar < 70 ? 'Hypoglycemic stress' : 'Adequate glucose supply'
      }
    };

    return effects?.[parameter]?.[organ] || 'No significant effect';
  };

  const getOrganStatus = (organName) => {
    const organ = organDatabase?.[organName];
    if (!organ) return 'unknown';

    let riskFactors = 0;
    
    if (organ?.affectedBy?.includes('age') && parameters?.age > 60) riskFactors++;
    if (organ?.affectedBy?.includes('bodyFat') && parameters?.bodyFat > 25) riskFactors++;
    if (organ?.affectedBy?.includes('bloodSugar') && (parameters?.bloodSugar > 140 || parameters?.bloodSugar < 70)) riskFactors++;

    if (riskFactors === 0) return 'normal';
    if (riskFactors === 1) return 'caution';
    return 'warning';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'caution': return 'text-warning';
      case 'warning': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'CheckCircle';
      case 'caution': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      default: return 'HelpCircle';
    }
  };

  const handleSystemFilter = (systemId) => {
    setActiveSystem(systemId);
    onSystemFilter(systemId);
  };

  const currentOrgan = selectedOrgan ? organDatabase?.[selectedOrgan] : null;
  const organStatus = currentOrgan ? getOrganStatus(selectedOrgan) : 'unknown';

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Organ Analysis
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="Filter"
          onClick={() => handleSystemFilter('all')}
        >
          Clear Filter
        </Button>
      </div>
      {/* System Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-body font-medium text-foreground">Body Systems</h3>
        <div className="grid grid-cols-2 gap-2">
          {bodySystems?.map((system) => (
            <Button
              key={system?.id}
              variant={activeSystem === system?.id ? "default" : "outline"}
              size="sm"
              iconName={system?.icon}
              iconPosition="left"
              onClick={() => handleSystemFilter(system?.id)}
              className={`justify-start text-xs ${system?.color}`}
            >
              {system?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Selected Organ Information */}
      {currentOrgan ? (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-body font-semibold text-foreground">
                {currentOrgan?.name}
              </h3>
              <p className="text-sm text-muted-foreground capitalize">
                {currentOrgan?.system} system
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(organStatus)} 
                size={16} 
                className={getStatusColor(organStatus)} 
              />
              <span className={`text-sm font-medium capitalize ${getStatusColor(organStatus)}`}>
                {organStatus}
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground">
            {currentOrgan?.description}
          </p>

          {/* Functions */}
          <div className="space-y-2">
            <h4 className="text-sm font-body font-medium text-foreground">Primary Functions</h4>
            <ul className="space-y-1">
              {currentOrgan?.functions?.map((func, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={12} className="text-success" />
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Normal Values */}
          <div className="space-y-2">
            <h4 className="text-sm font-body font-medium text-foreground">Normal Values</h4>
            <div className="bg-surface rounded-lg p-3 space-y-2">
              {Object.entries(currentOrgan?.normalValues)?.map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">
                    {key?.replace(/([A-Z])/g, ' $1')?.toLowerCase()}:
                  </span>
                  <span className="text-foreground font-data">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Parameter Effects */}
          <div className="space-y-2">
            <h4 className="text-sm font-body font-medium text-foreground">Current Parameter Effects</h4>
            <div className="space-y-2">
              {currentOrgan?.affectedBy?.map((param) => (
                <div key={param} className="bg-surface rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {param?.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-data text-foreground">
                      {param === 'age' && `${parameters?.age} years`}
                      {param === 'bodyFat' && `${parameters?.bodyFat}%`}
                      {param === 'bloodSugar' && `${parameters?.bloodSugar} mg/dL`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getParameterEffect(selectedOrgan, param)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Drug Effects */}
          {Object.keys(currentOrgan?.drugEffects)?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-body font-medium text-foreground">Drug Effects</h4>
              <div className="space-y-2">
                {Object.entries(currentOrgan?.drugEffects)?.map(([drugId, effect]) => {
                  const isActive = selectedDrugs?.some(drug => 
                    drug?.id === drugId && drug?.isActive
                  );
                  const drug = selectedDrugs?.find(d => d?.id === drugId);
                  
                  return (
                    <div 
                      key={drugId} 
                      className={`bg-surface rounded-lg p-3 ${
                        isActive ? 'border border-primary/20 bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {drugId}
                        </span>
                        {isActive && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-xs text-primary">Active</span>
                            {drug && (
                              <span className="text-xs text-muted-foreground">
                                ({drug?.dosage}{drug?.dosageRange?.unit})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {effect}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground border-t border-border">
          <Icon name="MousePointer" size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Click on an organ in the 3D model to view detailed information</p>
        </div>
      )}
      {/* Quick Organ Overview */}
      <div className="space-y-3 border-t border-border pt-4">
        <h3 className="text-sm font-body font-medium text-foreground">System Overview</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(organDatabase)?.filter(([_, organ]) => activeSystem === 'all' || organ?.system === activeSystem)?.map(([organName, organ]) => {
              const status = getOrganStatus(organName);
              return (
                <div
                  key={organName}
                  className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedOrgan === organName 
                      ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/20'
                  }`}
                  onClick={() => onSystemFilter(organName)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{organ?.name}</span>
                    <Icon 
                      name={getStatusIcon(status)} 
                      size={12} 
                      className={getStatusColor(status)} 
                    />
                  </div>
                  <div className="text-muted-foreground capitalize mt-1">
                    {organ?.system}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrganInformationPanel;