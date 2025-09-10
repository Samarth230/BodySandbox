import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Simulation', path: '/simulation-dashboard', icon: 'Activity' },
    { label: 'Drug Database', path: '/drug-database', icon: 'Database' },
    { label: 'Organ Analysis', path: '/organ-analysis', icon: 'Heart' },
    { label: 'Sessions', path: '/session-management', icon: 'FolderOpen' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                Body Sandbox
              </h1>
              <p className="text-xs font-caption text-muted-foreground">
                Body Simulation Platform
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-250 ease-clinical ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-clinical'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Simulation State Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-surface rounded-md border">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-data text-muted-foreground">
              Simulation Active
            </span>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Export
            </Button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-body">Dr. Samarth</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-clinical-lg z-[1100]">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-body font-medium text-popover-foreground">Dr. Sarah Smith</p>
                  <p className="text-xs text-muted-foreground">Medical Educator</p>
                </div>
                <div className="py-2">
                  <a
                    href="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </a>
                  <a
                    href="/preferences"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </a>
                  <a
                    href="/help"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </a>
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

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMobileMenuToggle}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-body font-medium transition-all duration-250 ease-clinical ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>
          
          {/* Mobile Quick Actions */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-data text-muted-foreground">
                  Simulation Active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Save">
                  Save
                </Button>
                <Button variant="ghost" size="sm" iconName="Download">
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;