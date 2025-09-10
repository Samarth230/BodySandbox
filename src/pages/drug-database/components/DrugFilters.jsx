import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DrugFilters = ({ 
  activeFilters = {}, 
  onFilterChange, 
  onClearFilters,
  resultCount = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterCategories = [
    {
      id: 'drugClass',
      label: 'Drug Class',
      options: [
        { value: 'analgesics', label: 'Analgesics', count: 45 },
        { value: 'antibiotics', label: 'Antibiotics', count: 67 },
        { value: 'anticoagulants', label: 'Anticoagulants', count: 23 },
        { value: 'antidepressants', label: 'Antidepressants', count: 34 },
        { value: 'antihypertensives', label: 'Antihypertensives', count: 56 },
        { value: 'beta-blockers', label: 'Beta Blockers', count: 28 },
        { value: 'diuretics', label: 'Diuretics', count: 19 },
        { value: 'statins', label: 'Statins', count: 15 }
      ]
    },
    {
      id: 'therapeuticArea',
      label: 'Therapeutic Area',
      options: [
        { value: 'cardiology', label: 'Cardiology', count: 89 },
        { value: 'neurology', label: 'Neurology', count: 67 },
        { value: 'oncology', label: 'Oncology', count: 45 },
        { value: 'endocrinology', label: 'Endocrinology', count: 34 },
        { value: 'gastroenterology', label: 'Gastroenterology', count: 28 },
        { value: 'respiratory', label: 'Respiratory', count: 23 }
      ]
    },
    {
      id: 'administration',
      label: 'Administration Method',
      options: [
        { value: 'oral', label: 'Oral', count: 156 },
        { value: 'injection', label: 'Injection', count: 78 },
        { value: 'topical', label: 'Topical', count: 34 },
        { value: 'inhalation', label: 'Inhalation', count: 23 },
        { value: 'sublingual', label: 'Sublingual', count: 12 }
      ]
    },
    {
      id: 'status',
      label: 'FDA Status',
      options: [
        { value: 'approved', label: 'FDA Approved', count: 234 },
        { value: 'investigational', label: 'Investigational', count: 45 },
        { value: 'withdrawn', label: 'Withdrawn', count: 12 }
      ]
    }
  ];

  const handleFilterToggle = (categoryId, optionValue) => {
    const currentFilters = activeFilters?.[categoryId] || [];
    const newFilters = currentFilters?.includes(optionValue)
      ? currentFilters?.filter(f => f !== optionValue)
      : [...currentFilters, optionValue];
    
    onFilterChange(categoryId, newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  const hasActiveFilters = getActiveFilterCount() > 0;

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-sm font-heading font-semibold text-card-foreground">
            Filters
          </h3>
          {hasActiveFilters && (
            <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-full">
              {getActiveFilterCount()}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Results Count */}
      <div className="px-4 py-2 bg-surface border-b border-border">
        <p className="text-xs font-caption text-muted-foreground">
          {resultCount?.toLocaleString()} drugs found
        </p>
      </div>
      {/* Filter Categories */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {filterCategories?.map((category) => (
          <div key={category?.id} className="border-b border-border last:border-b-0">
            <div className="p-4">
              <h4 className="text-sm font-body font-medium text-card-foreground mb-3">
                {category?.label}
              </h4>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {category?.options?.map((option) => {
                  const isChecked = (activeFilters?.[category?.id] || [])?.includes(option?.value);
                  
                  return (
                    <div key={option?.value} className="flex items-center justify-between">
                      <Checkbox
                        checked={isChecked}
                        onChange={() => handleFilterToggle(category?.id, option?.value)}
                        label={option?.label}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground ml-2">
                        {option?.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Filter Chips */}
      {hasActiveFilters && (
        <div className="p-4 bg-surface">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([categoryId, filters]) =>
              filters?.map((filterValue) => {
                const category = filterCategories?.find(c => c?.id === categoryId);
                const option = category?.options?.find(o => o?.value === filterValue);
                
                return (
                  <div
                    key={`${categoryId}-${filterValue}`}
                    className="flex items-center space-x-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                  >
                    <span>{option?.label || filterValue}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFilterToggle(categoryId, filterValue)}
                      className="h-4 w-4 p-0 text-primary-foreground hover:text-primary-foreground/80"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugFilters;