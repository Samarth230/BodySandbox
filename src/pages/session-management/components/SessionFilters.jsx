import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SessionFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const drugCategoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'neurological', label: 'Neurological' },
    { value: 'endocrine', label: 'Endocrine' },
    { value: 'respiratory', label: 'Respiratory' },
    { value: 'gastrointestinal', label: 'Gastrointestinal' },
    { value: 'immunological', label: 'Immunological' }
  ];

  const sessionTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'educational', label: 'Educational' },
    { value: 'research', label: 'Research' },
    { value: 'clinical', label: 'Clinical Case' },
    { value: 'training', label: 'Training' },
    { value: 'demonstration', label: 'Demonstration' }
  ];

  const collaborationOptions = [
    { value: 'all', label: 'All Sessions' },
    { value: 'private', label: 'Private' },
    { value: 'shared', label: 'Shared' },
    { value: 'public', label: 'Public' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'most_used', label: 'Most Used' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      dateRange: 'all',
      drugCategory: 'all',
      sessionType: 'all',
      collaboration: 'all',
      ageRange: '',
      bodyFatRange: '',
      sortBy: 'newest'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters?.();
  };

  const hasActiveFilters = () => {
    return localFilters?.search || 
           localFilters?.drugCategory !== 'all' || 
           localFilters?.sessionType !== 'all' || 
           localFilters?.collaboration !== 'all' ||
           localFilters?.ageRange ||
           localFilters?.bodyFatRange;
  };

  if (isCollapsed) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Input
              type="search"
              placeholder="Search sessions..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="max-w-xs"
            />
            
            <Select
              options={sortOptions}
              value={localFilters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
              className="w-40"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleClearAll}
              >
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              onClick={onToggleCollapse}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-card-foreground">
          Filter Sessions
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronUp"
          onClick={onToggleCollapse}
        >
          Collapse
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <Input
          label="Search"
          type="search"
          placeholder="Search sessions..."
          value={localFilters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />
        
        <Select
          label="Drug Category"
          options={drugCategoryOptions}
          value={localFilters?.drugCategory}
          onChange={(value) => handleFilterChange('drugCategory', value)}
        />
        
        <Select
          label="Session Type"
          options={sessionTypeOptions}
          value={localFilters?.sessionType}
          onChange={(value) => handleFilterChange('sessionType', value)}
        />
        
        <Select
          label="Collaboration"
          options={collaborationOptions}
          value={localFilters?.collaboration}
          onChange={(value) => handleFilterChange('collaboration', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          label="Age Range"
          type="text"
          placeholder="e.g., 25-65"
          value={localFilters?.ageRange}
          onChange={(e) => handleFilterChange('ageRange', e?.target?.value)}
        />
        
        <Input
          label="Body Fat Range (%)"
          type="text"
          placeholder="e.g., 10-25"
          value={localFilters?.bodyFatRange}
          onChange={(e) => handleFilterChange('bodyFatRange', e?.target?.value)}
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={localFilters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters() ? 'Active filters applied' : 'No filters applied'}
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            onClick={handleClearAll}
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionFilters;