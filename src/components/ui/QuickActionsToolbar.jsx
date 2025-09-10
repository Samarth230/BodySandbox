import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionsToolbar = ({ 
  onSave, 
  onExport, 
  onReset, 
  onShare,
  isSaving = false,
  isExporting = false,
  hasUnsavedChanges = false,
  className = '' 
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleSave = () => {
    if (onSave) onSave();
  };

  const handleExport = () => {
    if (onExport) onExport();
  };

  const handleReset = () => {
    if (onReset) onReset();
    setIsMoreMenuOpen(false);
  };

  const handleShare = () => {
    if (onShare) onShare();
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Primary Actions */}
      <Button
        variant={hasUnsavedChanges ? "default" : "ghost"}
        size="sm"
        iconName="Save"
        iconPosition="left"
        loading={isSaving}
        onClick={handleSave}
        className={hasUnsavedChanges ? "" : "text-muted-foreground hover:text-foreground"}
      >
        Save
      </Button>

      <Button
        variant="ghost"
        size="sm"
        iconName="Download"
        iconPosition="left"
        loading={isExporting}
        onClick={handleExport}
        className="text-muted-foreground hover:text-foreground"
      >
        Export
      </Button>

      {/* More Actions Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={toggleMoreMenu}
          className="text-muted-foreground hover:text-foreground"
        />

        {isMoreMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-clinical-lg z-[1100]">
            <div className="py-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
              >
                <Icon name="Share2" size={16} />
                <span>Share Session</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('Duplicate clicked');
                  setIsMoreMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
              >
                <Icon name="Copy" size={16} />
                <span>Duplicate</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('Print clicked');
                  setIsMoreMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
              >
                <Icon name="Printer" size={16} />
                <span>Print Report</span>
              </button>
              
              <div className="border-t border-border mt-2 pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Reset Simulation</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Indicator */}
      <div className="hidden xl:flex items-center space-x-1 text-xs text-muted-foreground ml-4">
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">S</kbd>
        <span className="ml-1">to save</span>
      </div>

      {/* Click outside handler */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-[1050]"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickActionsToolbar;