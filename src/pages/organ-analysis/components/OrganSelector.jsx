import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrganSelector = ({ selectedOrgan, onOrganSelect, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const organSystems = [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular System',
      icon: 'Heart',
      organs: [
        { id: 'heart', name: 'Heart', color: '#DC2626' },
        { id: 'arteries', name: 'Arteries', color: '#EF4444' },
        { id: 'veins', name: 'Veins', color: '#3B82F6' },
        { id: 'capillaries', name: 'Capillaries', color: '#8B5CF6' }
      ]
    },
    {
      id: 'respiratory',
      name: 'Respiratory System',
      icon: 'Wind',
      organs: [
        { id: 'lungs', name: 'Lungs', color: '#059669' },
        { id: 'bronchi', name: 'Bronchi', color: '#10B981' },
        { id: 'alveoli', name: 'Alveoli', color: '#34D399' },
        { id: 'diaphragm', name: 'Diaphragm', color: '#6EE7B7' }
      ]
    },
    {
      id: 'digestive',
      name: 'Digestive System',
      icon: 'Utensils',
      organs: [
        { id: 'stomach', name: 'Stomach', color: '#F59E0B' },
        { id: 'liver', name: 'Liver', color: '#D97706' },
        { id: 'intestines', name: 'Intestines', color: '#92400E' },
        { id: 'pancreas', name: 'Pancreas', color: '#451A03' }
      ]
    },
    {
      id: 'nervous',
      name: 'Nervous System',
      icon: 'Brain',
      organs: [
        { id: 'brain', name: 'Brain', color: '#7C3AED' },
        { id: 'spinal_cord', name: 'Spinal Cord', color: '#8B5CF6' },
        { id: 'nerves', name: 'Peripheral Nerves', color: '#A78BFA' },
        { id: 'neurons', name: 'Neurons', color: '#C4B5FD' }
      ]
    },
    {
      id: 'renal',
      name: 'Renal System',
      icon: 'Droplets',
      organs: [
        { id: 'kidneys', name: 'Kidneys', color: '#0891B2' },
        { id: 'bladder', name: 'Bladder', color: '#0EA5E9' },
        { id: 'ureters', name: 'Ureters', color: '#38BDF8' },
        { id: 'urethra', name: 'Urethra', color: '#7DD3FC' }
      ]
    }
  ];

  const handleOrganSelect = (organ, system) => {
    onOrganSelect({
      ...organ,
      system: system?.id,
      systemName: system?.name
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Organ Systems
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
        {selectedOrgan && (
          <div className="mt-2 flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedOrgan?.color }}
            />
            <span className="text-sm font-body text-muted-foreground">
              {selectedOrgan?.systemName} - {selectedOrgan?.name}
            </span>
          </div>
        )}
      </div>
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
        <div className="p-4 space-y-4">
          {organSystems?.map((system) => (
            <div key={system?.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name={system?.icon} size={16} className="text-primary" />
                <h4 className="text-sm font-body font-medium text-foreground">
                  {system?.name}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-1 ml-6">
                {system?.organs?.map((organ) => (
                  <button
                    key={organ?.id}
                    onClick={() => handleOrganSelect(organ, system)}
                    className={`flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
                      selectedOrgan?.id === organ?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: organ?.color }}
                    />
                    <span className="text-sm font-body">{organ?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganSelector;