import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrugTable = ({ 
  drugs = [], 
  onAddToSimulation, 
  onToggleFavorite, 
  onViewDetails,
  simulationDrugs = [],
  favorites = [],
  sortConfig = { key: null, direction: 'asc' },
  onSort 
}) => {
  const [selectedDrugs, setSelectedDrugs] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedDrugs(drugs?.map(drug => drug?.id));
    } else {
      setSelectedDrugs([]);
    }
  };

  const handleSelectDrug = (drugId, checked) => {
    if (checked) {
      setSelectedDrugs([...selectedDrugs, drugId]);
    } else {
      setSelectedDrugs(selectedDrugs?.filter(id => id !== drugId));
    }
  };

  const handleBulkAddToSimulation = () => {
    const drugsToAdd = drugs?.filter(drug => 
      selectedDrugs?.includes(drug?.id) && 
      !simulationDrugs?.includes(drug?.id) &&
      drug?.isSimulationReady
    );
    drugsToAdd?.forEach(drug => onAddToSimulation(drug));
    setSelectedDrugs([]);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success';
      case 'investigational': return 'text-warning';
      case 'withdrawn': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'investigational': return 'Clock';
      case 'withdrawn': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const allSelected = selectedDrugs?.length === drugs?.length && drugs?.length > 0;
  const someSelected = selectedDrugs?.length > 0 && selectedDrugs?.length < drugs?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedDrugs?.length > 0 && (
        <div className="px-4 py-3 bg-primary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-foreground">
              {selectedDrugs?.length} drug{selectedDrugs?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkAddToSimulation}
                disabled={!selectedDrugs?.some(id => {
                  const drug = drugs?.find(d => d?.id === id);
                  return drug?.isSimulationReady && !simulationDrugs?.includes(id);
                })}
              >
                <Icon name="Plus" size={16} />
                <span className="ml-1">Add to Simulation</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDrugs([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Drug Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Class</span>
                  {getSortIcon('class')}
                </button>
              </th>
              
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-body font-medium text-muted-foreground">
                  Primary Indication
                </span>
              </th>
              
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('fdaStatus')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  {getSortIcon('fdaStatus')}
                </button>
              </th>
              
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-body font-medium text-muted-foreground">
                  Simulation
                </span>
              </th>
              
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-body font-medium text-muted-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {drugs?.map((drug) => {
              const isSelected = selectedDrugs?.includes(drug?.id);
              const isInSimulation = simulationDrugs?.includes(drug?.id);
              const isFavorite = favorites?.includes(drug?.id);
              
              return (
                <tr
                  key={drug?.id}
                  className={`hover:bg-muted/50 transition-colors ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectDrug(drug?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          {drug?.isSimulationReady && (
                            <div className="w-2 h-2 bg-success rounded-full" title="Simulation Ready"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-body font-medium text-card-foreground">
                            {drug?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {drug?.genericName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-caption text-muted-foreground">
                      {drug?.class}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-caption text-muted-foreground">
                      {drug?.indications?.[0]}
                    </span>
                    {drug?.indications?.length > 1 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{drug?.indications?.length - 1}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center space-x-1 ${getStatusColor(drug?.fdaStatus)}`}>
                      <Icon name={getStatusIcon(drug?.fdaStatus)} size={14} />
                      <span className="text-sm font-caption capitalize">
                        {drug?.fdaStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {drug?.isSimulationReady ? (
                      <Icon name="Check" size={16} className="text-success mx-auto" />
                    ) : (
                      <Icon name="X" size={16} className="text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleFavorite(drug?.id)}
                        className={`h-8 w-8 p-0 ${
                          isFavorite ? 'text-warning' : 'text-muted-foreground hover:text-warning'
                        }`}
                      >
                        <Icon 
                          name="Star" 
                          size={14} 
                          fill={isFavorite ? "currentColor" : "none"} 
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(drug)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="ExternalLink" size={14} />
                      </Button>
                      
                      {isInSimulation ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="text-xs"
                        >
                          In Simulation
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onAddToSimulation(drug)}
                          disabled={!drug?.isSimulationReady}
                          className="text-xs"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {drugs?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-2">
            No drugs found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters to find more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default DrugTable;