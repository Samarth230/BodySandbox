import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Sessions',
      value: stats?.totalSessions,
      icon: 'FolderOpen',
      color: 'text-primary'
    },
    {
      label: 'This Month',
      value: stats?.thisMonth,
      icon: 'Calendar',
      color: 'text-accent'
    },
    {
      label: 'Shared Sessions',
      value: stats?.sharedSessions,
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      label: 'Storage Used',
      value: `${stats?.storageUsed}MB`,
      icon: 'HardDrive',
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <Icon 
              name={item?.icon} 
              size={20} 
              className={item?.color} 
            />
            <span className="text-2xl font-heading font-bold text-card-foreground">
              {item?.value}
            </span>
          </div>
          <p className="text-sm font-body text-muted-foreground">
            {item?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SessionStats;