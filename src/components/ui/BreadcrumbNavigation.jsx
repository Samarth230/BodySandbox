import React from 'react';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ 
  items = [],
  separator = 'ChevronRight',
  className = '' 
}) => {
  if (!items || items?.length === 0) return null;

  const handleItemClick = (item, index) => {
    if (item?.onClick) {
      item?.onClick(item, index);
    } else if (item?.href) {
      window.location.href = item?.href;
    }
  };

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items?.map((item, index) => {
          const isLast = index === items?.length - 1;
          const isClickable = !isLast && (item?.onClick || item?.href);

          return (
            <li key={index} className="flex items-center space-x-1">
              {index > 0 && (
                <Icon 
                  name={separator} 
                  size={14} 
                  className="text-muted-foreground mx-1" 
                />
              )}
              {item?.icon && (
                <Icon 
                  name={item?.icon} 
                  size={14} 
                  className={isLast ? "text-foreground" : "text-muted-foreground"} 
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleItemClick(item, index)}
                  className="font-body text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </button>
              ) : (
                <span 
                  className={`font-body ${
                    isLast 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;