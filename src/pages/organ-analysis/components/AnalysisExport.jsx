import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisExport = ({ selectedOrgan, selectedDrug, analysisData, className = '' }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    include3DModel: true,
    includeTimeline: true,
    includePharmacology: true,
    includeComparison: false,
    includeParameters: true,
    includeNotes: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: 'FileText', description: 'Comprehensive analysis report' },
    { id: 'excel', name: 'Excel Data', icon: 'FileSpreadsheet', description: 'Raw data and calculations' },
    { id: 'json', name: 'JSON Data', icon: 'Code', description: 'Machine-readable format' },
    { id: 'images', name: 'Image Package', icon: 'Image', description: '3D model screenshots' }
  ];

  const handleExportOptionChange = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev?.[option]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock export data
    const exportData = {
      timestamp: new Date()?.toISOString(),
      organ: selectedOrgan,
      drug: selectedDrug,
      format: exportFormat,
      options: exportOptions,
      notes: customNotes,
      analysisData: analysisData
    };
    
    console.log('Exporting analysis:', exportData);
    
    // Create mock download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organ-analysis-${selectedOrgan?.name || 'report'}-${Date.now()}.${exportFormat}`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const getEstimatedSize = () => {
    let size = 2; // Base size in MB
    if (exportOptions?.include3DModel) size += 5;
    if (exportOptions?.includeTimeline) size += 1;
    if (exportOptions?.includePharmacology) size += 1;
    if (exportOptions?.includeComparison) size += 2;
    if (exportOptions?.includeParameters) size += 0.5;
    return size?.toFixed(1);
  };

  const getIncludedSections = () => {
    return Object.entries(exportOptions)?.filter(([_, included]) => included)?.map(([option, _]) => option?.replace(/([A-Z])/g, ' $1')?.toLowerCase())?.join(', ');
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Export Analysis
          </h3>
        </div>

        {(selectedOrgan || selectedDrug) && (
          <div className="p-3 bg-surface rounded-lg">
            <h4 className="text-sm font-body font-medium text-foreground mb-2">
              Current Analysis
            </h4>
            <div className="space-y-1 text-sm">
              {selectedOrgan && (
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Organ:</span>
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedOrgan?.color }}
                    />
                    <span className="text-foreground">{selectedOrgan?.name}</span>
                  </div>
                </div>
              )}
              {selectedDrug && (
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Drug:</span>
                  <span className="text-foreground">{selectedDrug}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Generated:</span>
                <span className="text-foreground font-data">
                  {new Date()?.toLocaleDateString()} {new Date()?.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Export Format Selection */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          Export Format
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {exportFormats?.map((format) => (
            <button
              key={format?.id}
              onClick={() => setExportFormat(format?.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all text-left ${
                exportFormat === format?.id
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border hover:border-primary/50 hover:bg-muted text-foreground'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                exportFormat === format?.id ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {exportFormat === format?.id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <Icon name={format?.icon} size={16} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-body font-medium">{format?.name}</p>
                <p className="text-xs text-muted-foreground">{format?.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          Include in Export
        </h4>
        <div className="space-y-2">
          {Object.entries(exportOptions)?.map(([option, checked]) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleExportOptionChange(option)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-body text-foreground">
                {option?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Custom Notes */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          Additional Notes (Optional)
        </h4>
        <textarea
          value={customNotes}
          onChange={(e) => setCustomNotes(e?.target?.value)}
          placeholder="Add custom notes, observations, or comments to include in the export..."
          className="w-full h-20 p-3 text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Export Summary */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          Export Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format:</span>
            <span className="text-foreground font-medium">
              {exportFormats?.find(f => f?.id === exportFormat)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Size:</span>
            <span className="text-foreground font-data">{getEstimatedSize()} MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sections:</span>
            <span className="text-foreground text-right max-w-48 truncate">
              {Object.values(exportOptions)?.filter(Boolean)?.length} selected
            </span>
          </div>
        </div>
      </div>
      {/* Export Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Export will be saved to your downloads folder
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            className="flex-1"
            onClick={() => console.log('Preview export')}
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            loading={isExporting}
            onClick={handleExport}
            disabled={!selectedOrgan && !selectedDrug}
            className="flex-1"
          >
            {isExporting ? 'Exporting...' : 'Export Analysis'}
          </Button>
        </div>

        {/* Quick Export Options */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Quick Export:</p>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              onClick={() => {
                setExportFormat('pdf');
                handleExport();
              }}
              className="text-xs"
            >
              PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Image"
              onClick={() => {
                setExportFormat('images');
                handleExport();
              }}
              className="text-xs"
            >
              Images
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Code"
              onClick={() => {
                setExportFormat('json');
                handleExport();
              }}
              className="text-xs"
            >
              Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisExport;