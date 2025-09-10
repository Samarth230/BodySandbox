import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedSessions, 
  onBulkDelete, 
  onBulkExport, 
  onBulkShare,
  onClearSelection 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (selectedSessions?.length === 0) {
    return null;
  }

  const handleAction = (action) => {
    setIsMenuOpen(false);
    switch (action) {
      case 'export':
        onBulkExport?.(selectedSessions);
        break;
      case 'share':
        onBulkShare?.(selectedSessions);
        break;
      case 'delete':
        onBulkDelete?.(selectedSessions);
        break;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">
                {selectedSessions?.length}
              </span>
            </div>
            <span className="text-sm font-body text-card-foreground">
              {selectedSessions?.length} session{selectedSessions?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => handleAction('export')}
            >
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              onClick={() => handleAction('share')}
            >
              Share
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              
              {isMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-40 bg-popover border border-border rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => handleAction('delete')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted w-full text-left"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Delete All</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default BulkActions;