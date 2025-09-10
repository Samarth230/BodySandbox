import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SessionCard from './components/SessionCard';
import SessionFilters from './components/SessionFilters';
import SessionStats from './components/SessionStats';
import BulkActions from './components/BulkActions';
import CreateSessionModal from './components/CreateSessionModal';
import ShareSessionModal from './components/ShareSessionModal';

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sessionToShare, setSessionToShare] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all',
    drugCategory: 'all',
    sessionType: 'all',
    collaboration: 'all',
    ageRange: '',
    bodyFatRange: '',
    sortBy: 'newest'
  });

  // Mock session data
  const mockSessions = [
    {
      id: '1',
      name: 'Cardiovascular Drug Interaction Study',
      description: 'Analysis of ACE inhibitors and beta-blockers interaction in elderly patients',
      sessionType: 'research',
      collaborationStatus: 'shared',
      tags: ['cardiology', 'hypertension', 'elderly'],
      createdAt: '2025-01-08T10:30:00Z',
      lastModified: '2025-01-09T14:20:00Z',
      patientAge: 68,
      bodyFat: 22,
      bloodSugar: 110,
      drugs: [
        { name: 'Lisinopril', category: 'cardiovascular' },
        { name: 'Metoprolol', category: 'cardiovascular' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: ['Dr. John Doe', 'Dr. Emily Chen']
    },
    {
      id: '2',
      name: 'Diabetes Management Protocol',
      description: 'Insulin therapy optimization for Type 2 diabetes patients',
      sessionType: 'clinical',
      collaborationStatus: 'private',
      tags: ['endocrinology', 'diabetes', 'insulin'],
      createdAt: '2025-01-07T09:15:00Z',
      lastModified: '2025-01-09T11:45:00Z',
      patientAge: 45,
      bodyFat: 28,
      bloodSugar: 180,
      drugs: [
        { name: 'Metformin', category: 'endocrine' },
        { name: 'Insulin Glargine', category: 'endocrine' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: []
    },
    {
      id: '3',
      name: 'Neurological Disorder Case Study',
      description: 'Parkinson\'s disease medication effects on motor function',
      sessionType: 'educational',
      collaborationStatus: 'public',
      tags: ['neurology', 'parkinsons', 'motor-function'],
      createdAt: '2025-01-06T16:20:00Z',
      lastModified: '2025-01-08T13:30:00Z',
      patientAge: 72,
      bodyFat: 18,
      bloodSugar: 95,
      drugs: [
        { name: 'Levodopa', category: 'neurological' },
        { name: 'Carbidopa', category: 'neurological' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: ['Dr. Michael Brown']
    },
    {
      id: '4',
      name: 'Respiratory Therapy Training',
      description: 'COPD treatment protocols and bronchodilator effects',
      sessionType: 'training',
      collaborationStatus: 'shared',
      tags: ['pulmonology', 'copd', 'bronchodilators'],
      createdAt: '2025-01-05T11:45:00Z',
      lastModified: '2025-01-07T09:20:00Z',
      patientAge: 58,
      bodyFat: 25,
      bloodSugar: 105,
      drugs: [
        { name: 'Albuterol', category: 'respiratory' },
        { name: 'Tiotropium', category: 'respiratory' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: ['Dr. Lisa Wang', 'Dr. Robert Taylor']
    },
    {
      id: '5',
      name: 'Pediatric Dosage Calculation',
      description: 'Age and weight-based medication dosing for children',
      sessionType: 'educational',
      collaborationStatus: 'private',
      tags: ['pediatrics', 'dosage', 'safety'],
      createdAt: '2025-01-04T14:30:00Z',
      lastModified: '2025-01-06T16:15:00Z',
      patientAge: 8,
      bodyFat: 12,
      bloodSugar: 85,
      drugs: [
        { name: 'Amoxicillin', category: 'antibiotic' },
        { name: 'Acetaminophen', category: 'analgesic' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: []
    },
    {
      id: '6',
      name: 'Immunosuppressive Drug Monitoring',
      description: 'Post-transplant medication management and organ rejection prevention',
      sessionType: 'clinical',
      collaborationStatus: 'shared',
      tags: ['transplant', 'immunology', 'monitoring'],
      createdAt: '2025-01-03T08:20:00Z',
      lastModified: '2025-01-05T12:40:00Z',
      patientAge: 52,
      bodyFat: 20,
      bloodSugar: 120,
      drugs: [
        { name: 'Tacrolimus', category: 'immunological' },
        { name: 'Mycophenolate', category: 'immunological' }
      ],
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      owner: 'Dr. Sarah Smith',
      collaborators: ['Dr. Amanda Johnson']
    }
  ];

  const mockStats = {
    totalSessions: 24,
    thisMonth: 8,
    sharedSessions: 12,
    storageUsed: 156
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/simulation-dashboard', icon: 'Home' },
    { label: 'Session Management', icon: 'FolderOpen' }
  ];

  useEffect(() => {
    setSessions(mockSessions);
    setFilteredSessions(mockSessions);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sessions]);

  const applyFilters = () => {
    let filtered = [...sessions];

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(session =>
        session?.name?.toLowerCase()?.includes(searchTerm) ||
        session?.description?.toLowerCase()?.includes(searchTerm) ||
        session?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Drug category filter
    if (filters?.drugCategory !== 'all') {
      filtered = filtered?.filter(session =>
        session?.drugs?.some(drug => drug?.category === filters?.drugCategory)
      );
    }

    // Session type filter
    if (filters?.sessionType !== 'all') {
      filtered = filtered?.filter(session => session?.sessionType === filters?.sessionType);
    }

    // Collaboration filter
    if (filters?.collaboration !== 'all') {
      filtered = filtered?.filter(session => session?.collaborationStatus === filters?.collaboration);
    }

    // Age range filter
    if (filters?.ageRange) {
      const [minAge, maxAge] = filters?.ageRange?.split('-')?.map(age => parseInt(age?.trim()));
      if (!isNaN(minAge) && !isNaN(maxAge)) {
        filtered = filtered?.filter(session => 
          session?.patientAge >= minAge && session?.patientAge <= maxAge
        );
      }
    }

    // Body fat range filter
    if (filters?.bodyFatRange) {
      const [minBF, maxBF] = filters?.bodyFatRange?.split('-')?.map(bf => parseInt(bf?.trim()));
      if (!isNaN(minBF) && !isNaN(maxBF)) {
        filtered = filtered?.filter(session => 
          session?.bodyFat >= minBF && session?.bodyFat <= maxBF
        );
      }
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'name_desc':
          return b?.name?.localeCompare(a?.name);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredSessions(filtered);
  };

  const handleSessionLoad = (session) => {
    console.log('Loading session:', session?.name);
    // Navigate to simulation dashboard with session data
    window.location.href = `/simulation-dashboard?sessionId=${session?.id}`;
  };

  const handleSessionDuplicate = (session) => {
    const duplicatedSession = {
      ...session,
      id: Date.now()?.toString(),
      name: `${session?.name} (Copy)`,
      createdAt: new Date()?.toISOString(),
      lastModified: new Date()?.toISOString(),
      collaborationStatus: 'private',
      collaborators: []
    };
    
    setSessions(prev => [duplicatedSession, ...prev]);
    console.log('Session duplicated:', duplicatedSession?.name);
  };

  const handleSessionShare = (session) => {
    setSessionToShare(session);
    setIsShareModalOpen(true);
  };

  const handleSessionDelete = (session) => {
    if (window.confirm(`Are you sure you want to delete "${session?.name}"?`)) {
      setSessions(prev => prev?.filter(s => s?.id !== session?.id));
      setSelectedSessions(prev => prev?.filter(id => id !== session?.id));
      console.log('Session deleted:', session?.name);
    }
  };

  const handleSessionEdit = (session) => {
    console.log('Editing session:', session?.name);
    // Open edit modal or navigate to edit page
  };

  const handleCreateSession = (newSession) => {
    setSessions(prev => [newSession, ...prev]);
    console.log('New session created:', newSession?.name);
  };

  const handleShare = (shareInfo) => {
    console.log('Sharing session:', shareInfo);
    // Implement sharing logic
  };

  const handleBulkDelete = (sessionIds) => {
    if (window.confirm(`Are you sure you want to delete ${sessionIds?.length} sessions?`)) {
      setSessions(prev => prev?.filter(session => !sessionIds?.includes(session?.id)));
      setSelectedSessions([]);
      console.log('Bulk delete completed');
    }
  };

  const handleBulkExport = (sessionIds) => {
    console.log('Bulk export:', sessionIds);
    // Implement bulk export logic
  };

  const handleBulkShare = (sessionIds) => {
    console.log('Bulk share:', sessionIds);
    // Implement bulk share logic
  };

  const handleSessionSelect = (sessionId, isSelected) => {
    if (isSelected) {
      setSelectedSessions(prev => [...prev, sessionId]);
    } else {
      setSelectedSessions(prev => prev?.filter(id => id !== sessionId));
    }
  };

  const handleSelectAll = () => {
    if (selectedSessions?.length === filteredSessions?.length) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(filteredSessions?.map(session => session?.id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <BreadcrumbNavigation 
            items={breadcrumbItems} 
            className="mb-6" 
          />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Session Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Organize and manage your simulation sessions for continued analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Export all sessions')}
              >
                Export All
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={() => setIsCreateModalOpen(true)}
              >
                New Session
              </Button>
            </div>
          </div>

          {/* Stats */}
          <SessionStats stats={mockStats} />

          {/* Filters */}
          <SessionFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={() => setFilters({
              search: '',
              dateRange: 'all',
              drugCategory: 'all',
              sessionType: 'all',
              collaboration: 'all',
              ageRange: '',
              bodyFatRange: '',
              sortBy: 'newest'
            })}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          />

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setViewMode('grid')}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                {filteredSessions?.length} of {sessions?.length} sessions
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName={selectedSessions?.length === filteredSessions?.length ? 'CheckSquare' : 'Square'}
                onClick={handleSelectAll}
              >
                Select All
              </Button>
            </div>
          </div>

          {/* Sessions Grid/List */}
          {filteredSessions?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                No sessions found
              </h3>
              <p className="text-muted-foreground mb-6">
                {filters?.search || filters?.drugCategory !== 'all' || filters?.sessionType !== 'all' ?'Try adjusting your filters or search terms' :'Create your first simulation session to get started'
                }
              </p>
              {!filters?.search && filters?.drugCategory === 'all' && filters?.sessionType === 'all' && (
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create First Session
                </Button>
              )}
            </div>
          ) : (
            <div className={
              viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
            }>
              {filteredSessions?.map((session) => (
                <div key={session?.id} className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedSessions?.includes(session?.id)}
                      onChange={(e) => handleSessionSelect(session?.id, e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                  <SessionCard
                    session={session}
                    viewMode={viewMode}
                    onLoad={handleSessionLoad}
                    onDuplicate={handleSessionDuplicate}
                    onShare={handleSessionShare}
                    onDelete={handleSessionDelete}
                    onEdit={handleSessionEdit}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bulk Actions */}
          <BulkActions
            selectedSessions={selectedSessions}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            onBulkShare={handleBulkShare}
            onClearSelection={() => setSelectedSessions([])}
          />

          {/* Modals */}
          <CreateSessionModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreateSession={handleCreateSession}
          />

          <ShareSessionModal
            isOpen={isShareModalOpen}
            onClose={() => {
              setIsShareModalOpen(false);
              setSessionToShare(null);
            }}
            session={sessionToShare}
            onShare={handleShare}
          />
        </div>
      </main>
    </div>
  );
};

export default SessionManagement;