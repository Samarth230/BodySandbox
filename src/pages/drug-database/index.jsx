import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import DrugSearchBar from './components/DrugSearchBar';
import DrugFilters from './components/DrugFilters';
import DrugCard from './components/DrugCard';
import DrugTable from './components/DrugTable';
import DrugDetailModal from './components/DrugDetailModal';
import { COMPREHENSIVE_DRUG_DATABASE, searchDrugs } from '../../utils/drugDatabase';

const DrugDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [simulationDrugs, setSimulationDrugs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Use comprehensive drug database
  const allDrugs = COMPREHENSIVE_DRUG_DATABASE;

  // Search suggestions based on comprehensive drug data
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm?.length < 2) return [];
    
    const suggestions = [];
    const searchResults = searchDrugs(searchTerm, allDrugs);
    
    searchResults?.slice(0, 8)?.forEach(drug => {
      suggestions?.push({
        name: drug?.name,
        class: drug?.class,
        indication: drug?.indications?.[0],
        isSimulationReady: drug?.isSimulationReady
      });
    });
    
    return suggestions;
  }, [searchTerm, allDrugs]);

  // Filter and sort drugs
  const filteredAndSortedDrugs = useMemo(() => {
    let filtered = allDrugs;

    // Apply search filter using utility function
    if (searchTerm) {
      filtered = searchDrugs(searchTerm, filtered);
    }

    // Apply category filters
    Object.entries(activeFilters)?.forEach(([category, filters]) => {
      if (filters?.length > 0) {
        filtered = filtered?.filter(drug => {
          switch (category) {
            case 'drugClass':
              return filters?.some(filter => 
                drug?.class?.toLowerCase()?.includes(filter?.toLowerCase())
              );
            case 'therapeuticArea':
              return filters?.includes(drug?.therapeuticArea?.toLowerCase());
            case 'administration':
              return filters?.includes(drug?.administration);
            case 'status':
              return filters?.includes(drug?.fdaStatus);
            case 'simulationReady':
              return filters?.includes('true') ? drug?.isSimulationReady : !drug?.isSimulationReady;
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [allDrugs, searchTerm, activeFilters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedDrugs?.length / itemsPerPage);
  const paginatedDrugs = filteredAndSortedDrugs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/simulation-dashboard', icon: 'Home' },
    { label: 'Drug Database', icon: 'Database' }
  ];

  // Event handlers
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion?.name);
  };

  const handleFilterChange = (categoryId, filters) => {
    setActiveFilters(prev => ({
      ...prev,
      [categoryId]: filters
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleAddToSimulation = (drug) => {
    if (!simulationDrugs?.includes(drug?.id)) {
      setSimulationDrugs(prev => [...prev, drug?.id]);
      // In a real app, this would also update the simulation state
      console.log(`Added ${drug?.name} to simulation`);
    }
  };

  const handleToggleFavorite = (drugId) => {
    setFavorites(prev => 
      prev?.includes(drugId) 
        ? prev?.filter(id => id !== drugId)
        : [...prev, drugId]
    );
  };

  const handleViewDetails = (drug) => {
    setSelectedDrug(drug);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDrug(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Comprehensive Drug Database
                </h1>
                <p className="text-lg text-muted-foreground">
                  Explore detailed pharmaceutical information with {allDrugs?.length} medications for comprehensive simulation analysis
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-body">
                    {allDrugs?.filter(d => d?.isSimulationReady)?.length} Simulation Ready
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => window.open('/drug-reference', '_blank')}
                >
                  Drug Reference
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => window.location.href = '/simulation-dashboard'}
                >
                  Back to Simulation
                </Button>
              </div>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Total Drugs</span>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground mt-1">
                {allDrugs?.length}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Beaker" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Simulation Ready</span>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground mt-1">
                {allDrugs?.filter(d => d?.isSimulationReady)?.length}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">Therapeutic Areas</span>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground mt-1">
                {new Set(allDrugs?.map(d => d.therapeuticArea))?.size}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-info" />
                <span className="text-sm text-muted-foreground">Drug Classes</span>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground mt-1">
                {new Set(allDrugs?.map(d => d.class))?.size}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <DrugSearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                suggestions={searchSuggestions}
                onSuggestionSelect={handleSuggestionSelect}
              />
            </div>
            
            <div className="lg:col-span-1">
              <DrugFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredAndSortedDrugs?.length}
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-body text-muted-foreground">
                {filteredAndSortedDrugs?.length?.toLocaleString()} drugs found
              </span>
              
              {simulationDrugs?.length > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                  <Icon name="Beaker" size={14} />
                  <span className="text-sm font-caption">
                    {simulationDrugs?.length} in simulation
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Icon name="Table" size={16} />
              </Button>
              
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
            </div>
          </div>

          {/* Drug List */}
          {viewMode === 'table' ? (
            <DrugTable
              drugs={paginatedDrugs}
              onAddToSimulation={handleAddToSimulation}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={handleViewDetails}
              simulationDrugs={simulationDrugs}
              favorites={favorites}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedDrugs?.map((drug) => (
                <DrugCard
                  key={drug?.id}
                  drug={drug}
                  onAddToSimulation={handleAddToSimulation}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={handleViewDetails}
                  isInSimulation={simulationDrugs?.includes(drug?.id)}
                  isFavorite={favorites?.includes(drug?.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedDrugs?.length)} of {filteredAndSortedDrugs?.length} results
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Drug Detail Modal */}
      <DrugDetailModal
        drug={selectedDrug}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onAddToSimulation={handleAddToSimulation}
        onToggleFavorite={handleToggleFavorite}
        isInSimulation={selectedDrug ? simulationDrugs?.includes(selectedDrug?.id) : false}
        isFavorite={selectedDrug ? favorites?.includes(selectedDrug?.id) : false}
      />
    </div>
  );
};

export default DrugDatabase;