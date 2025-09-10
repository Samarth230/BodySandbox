import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateSessionModal = ({ isOpen, onClose, onCreateSession }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sessionType: 'educational',
    tags: '',
    collaborationStatus: 'private'
  });

  const sessionTypeOptions = [
    { value: 'educational', label: 'Educational' },
    { value: 'research', label: 'Research' },
    { value: 'clinical', label: 'Clinical Case' },
    { value: 'training', label: 'Training' },
    { value: 'demonstration', label: 'Demonstration' }
  ];

  const collaborationOptions = [
    { value: 'private', label: 'Private' },
    { value: 'shared', label: 'Shared with Team' },
    { value: 'public', label: 'Public' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newSession = {
      id: Date.now()?.toString(),
      name: formData?.name,
      description: formData?.description,
      sessionType: formData?.sessionType,
      collaborationStatus: formData?.collaborationStatus,
      tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
      createdAt: new Date()?.toISOString(),
      patientAge: 35,
      bodyFat: 18,
      bloodSugar: 95,
      drugs: [],
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    };

    onCreateSession(newSession);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      sessionType: 'educational',
      tags: '',
      collaborationStatus: 'private'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-card-foreground">
            Create New Session
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Session Name"
            type="text"
            placeholder="Enter session name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />
          
          <Input
            label="Description"
            type="text"
            placeholder="Brief description of the session"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          
          <Select
            label="Session Type"
            options={sessionTypeOptions}
            value={formData?.sessionType}
            onChange={(value) => handleInputChange('sessionType', value)}
          />
          
          <Input
            label="Tags"
            type="text"
            placeholder="Enter tags separated by commas"
            description="e.g., cardiology, hypertension, case-study"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
          />
          
          <Select
            label="Collaboration"
            options={collaborationOptions}
            value={formData?.collaborationStatus}
            onChange={(value) => handleInputChange('collaborationStatus', value)}
          />
          
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              disabled={!formData?.name?.trim()}
            >
              Create Session
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionModal;