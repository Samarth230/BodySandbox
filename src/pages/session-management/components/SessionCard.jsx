import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SessionCard = ({ 
  session, 
  onLoad, 
  onDuplicate, 
  onShare, 
  onDelete,
  onEdit,
  viewMode = 'grid' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAction = (action) => {
    setIsMenuOpen(false);
    switch (action) {
      case 'load':
        onLoad?.(session);
        break;
      case 'duplicate':
        onDuplicate?.(session);
        break;
      case 'share':
        onShare?.(session);
        break;
      case 'edit':
        onEdit?.(session);
        break;
      case 'delete':
        onDelete?.(session);
        break;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCollaborationIcon = () => {
    switch (session.collaborationStatus) {
      case 'shared':
        return 'Users';
      case 'public':
        return 'Globe';
      default:
        return 'Lock';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={session.thumbnail}
                alt={`${session.name} preview`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-heading font-semibold text-card-foreground truncate">
                  {session.name}
                </h3>
                <Icon 
                  name={getCollaborationIcon()} 
                  size={14} 
                  className="text-muted-foreground flex-shrink-0" 
                />
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                <span>{formatDate(session.createdAt)}</span>
                <span>•</span>
                <span>{session.patientAge}y, {session.bodyFat}% BF</span>
                <span>•</span>
                <span>{session.drugs.length} drugs</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {session.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {session.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{session.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              onClick={() => handleAction('load')}
            >
              Load
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                onClick={handleMenuToggle}
              />
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleAction('edit')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleAction('duplicate')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Copy" size={14} />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={() => handleAction('share')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Share2" size={14} />
                      <span>Share</span>
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={() => handleAction('delete')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted w-full text-left"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-video bg-surface overflow-hidden">
          <Image
            src={session.thumbnail}
            alt={`${session.name} preview`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-heading font-semibold text-card-foreground truncate flex-1">
              {session.name}
            </h3>
            <Icon 
              name={getCollaborationIcon()} 
              size={14} 
              className="text-muted-foreground ml-2 flex-shrink-0" 
            />
          </div>
          
          <div className="text-xs text-muted-foreground mb-3">
            <div className="mb-1">{formatDate(session.createdAt)}</div>
            <div>{session.patientAge}y, {session.bodyFat}% BF • {session.drugs.length} drugs</div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {session.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {session.tags.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{session.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              onClick={() => handleAction('load')}
              className="flex-1 mr-2"
            >
              Load
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                onClick={handleMenuToggle}
              />
              
              {isMenuOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-40 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleAction('edit')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleAction('duplicate')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Copy" size={14} />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={() => handleAction('share')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left"
                    >
                      <Icon name="Share2" size={14} />
                      <span>Share</span>
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={() => handleAction('delete')}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted w-full text-left"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default SessionCard;