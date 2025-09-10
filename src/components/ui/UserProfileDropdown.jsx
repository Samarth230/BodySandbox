import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ user = { name: 'Dr. Sarah Smith', role: 'Medical Educator', avatar: null } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
    setIsOpen(false);
  };

  const handleMenuItemClick = (action) => {
    console.log(`${action} clicked`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
        <span className="hidden md:block text-sm font-body max-w-24 truncate">
          {user?.name}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-clinical-lg z-[1100]">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-body font-medium text-popover-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role}
            </p>
          </div>
          
          <div className="py-2">
            <button
              onClick={() => handleMenuItemClick('Profile')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
            >
              <Icon name="User" size={16} />
              <span>Profile Settings</span>
            </button>
            
            <button
              onClick={() => handleMenuItemClick('Preferences')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
            >
              <Icon name="Settings" size={16} />
              <span>Preferences</span>
            </button>
            
            <button
              onClick={() => handleMenuItemClick('Notifications')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
            >
              <Icon name="Bell" size={16} />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => handleMenuItemClick('Help')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors w-full text-left"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help & Support</span>
            </button>
            
            <div className="border-t border-border mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;