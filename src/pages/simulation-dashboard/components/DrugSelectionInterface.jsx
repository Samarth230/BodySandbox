import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { 
  getSimulationReadyDrugs, 
  searchDrugs, 
  filterDrugsByCategory, 
  DRUG_CATEGORIES, 
  getCategoryIcon 
} from '../../../utils/drugDatabase';

const DrugSelectionInterface = ({ selectedDrugs, onDrugAdd, onDrugRemove, onDrugUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingDrug, setIsAddingDrug] = useState(false);

  // Get simulation-ready drugs from comprehensive database
  const availableDrugs = getSimulationReadyDrugs();

  const filteredDrugs = availableDrugs?.filter(drug => {
    // Apply search filter
    const searchResult = searchTerm 
      ? searchDrugs(searchTerm, [drug])?.length > 0
      : true;
    
    // Apply category filter
    const categoryResult = selectedCategory === 'all' 
      ? true
      : filterDrugsByCategory(selectedCategory, [drug])?.length > 0;
    
    // Check if not already selected
    const notAlreadySelected = !selectedDrugs?.find(selected => selected?.id === drug?.id);
    
    return searchResult && categoryResult && notAlreadySelected;
  });

  const handleAddDrug = (drug) => {
    const newDrug = {
      ...drug,
      dosage: drug?.commonDosage,
      administrationTime: new Date()?.toISOString(),
      isActive: true
    };
    onDrugAdd(newDrug);
    setIsAddingDrug(false);
  };

  const handleDosageChange = (drugId, newDosage) => {
    onDrugUpdate(drugId, { dosage: parseInt(newDosage) });
  };

  const handleToggleDrug = (drugId) => {
    const drug = selectedDrugs?.find(d => d?.id === drugId);
    onDrugUpdate(drugId, { isActive: !drug?.isActive });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Drug Selection
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Database"
            iconPosition="left"
            onClick={() => window.open('/drug-database', '_blank')}
          >
            Browse Database
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingDrug(!isAddingDrug)}
          >
            Add Drug
          </Button>
        </div>
      </div>

      {/* Currently Selected Drugs */}
      {selectedDrugs?.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-body font-medium text-foreground">Active Medications</h3>
          <div className="space-y-2">
            {selectedDrugs?.map((drug) => (
              <div
                key={drug?.id}
                className={`bg-surface border rounded-lg p-4 transition-all ${
                  drug?.isActive ? 'border-primary/20 bg-primary/5' : 'border-border opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${drug?.isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <Icon name={getCategoryIcon(drug?.class)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-body font-medium text-foreground truncate">
                          {drug?.name}
                        </h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          drug?.isActive 
                            ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                        }`}>
                          {drug?.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {drug?.class} • {drug?.therapeuticArea}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={drug?.dosage}
                            onChange={(e) => handleDosageChange(drug?.id, e?.target?.value)}
                            min={drug?.dosageRange?.min}
                            max={drug?.dosageRange?.max}
                            className="w-20 text-xs"
                            disabled={!drug?.isActive}
                          />
                          <span className="text-xs text-muted-foreground">{drug?.dosageRange?.unit}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Range: {drug?.dosageRange?.min}-{drug?.dosageRange?.max} {drug?.dosageRange?.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={drug?.isActive ? "Pause" : "Play"}
                      onClick={() => handleToggleDrug(drug?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => onDrugRemove(drug?.id)}
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drug Search and Add Interface */}
      {isAddingDrug && (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-body font-medium text-foreground">
              Add Medication ({filteredDrugs?.length} available)
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              onClick={() => window.open('/drug-database', '_blank')}
            >
              Full Database
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="text-sm"
              />
            </div>
            <div className="w-48">
              <Select
                options={DRUG_CATEGORIES}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Category"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredDrugs?.length > 0 ? (
              filteredDrugs?.slice(0, 10)?.map((drug) => (
                <div
                  key={drug?.id}
                  className="bg-surface border border-border rounded-lg p-3 hover:border-primary/20 transition-colors cursor-pointer"
                  onClick={() => handleAddDrug(drug)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon name={getCategoryIcon(drug?.class)} size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-body font-medium text-foreground">
                          {drug?.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground capitalize">
                            {drug?.class}
                          </span>
                          {drug?.isSimulationReady && (
                            <div className="w-2 h-2 bg-success rounded-full" title="Simulation Ready" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {drug?.therapeuticArea} • {drug?.indications?.slice(0, 2)?.join(', ')}
                        {drug?.indications?.length > 2 && ` +${drug?.indications?.length - 2}`}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>
                          Dosage: {drug?.dosageRange?.min}-{drug?.dosageRange?.max} {drug?.dosageRange?.unit}
                        </span>
                        <span>
                          {drug?.administration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No drugs found matching your criteria</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {filteredDrugs?.length > 10 && (
              <div className="text-center py-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Showing 10 of {filteredDrugs?.length} results
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open('/drug-database', '_blank')}
                >
                  View All in Database
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Drug Interaction Warnings */}
      {selectedDrugs?.length > 1 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-body font-medium text-foreground">
                Drug Interaction Check
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Multiple medications selected. Monitor for potential interactions during simulation.
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  View Interaction Details
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => window.open('/drug-database', '_blank')}
                >
                  Research in Database
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {availableDrugs?.length > 0 && (
        <div className="bg-muted/30 border border-muted rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{availableDrugs?.length} drugs available for simulation</span>
            <span>Updated database with comprehensive medications</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugSelectionInterface;