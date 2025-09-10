import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShareSessionModal = ({ isOpen, onClose, session, onShare }) => {
  const [shareData, setShareData] = useState({
    emails: '',
    permission: 'view',
    message: '',
    allowDownload: false,
    expiresIn: '30'
  });

  const permissionOptions = [
    { value: 'view', label: 'View Only' },
    { value: 'edit', label: 'Can Edit' },
    { value: 'admin', label: 'Admin Access' }
  ];

  const expirationOptions = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: 'never', label: 'Never expires' }
  ];

  const handleInputChange = (field, value) => {
    setShareData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const shareInfo = {
      sessionId: session?.id,
      emails: shareData?.emails?.split(',')?.map(email => email?.trim())?.filter(email => email),
      permission: shareData?.permission,
      message: shareData?.message,
      allowDownload: shareData?.allowDownload,
      expiresIn: shareData?.expiresIn,
      sharedAt: new Date()?.toISOString()
    };

    onShare(shareInfo);
    onClose();
    
    // Reset form
    setShareData({
      emails: '',
      permission: 'view',
      message: '',
      allowDownload: false,
      expiresIn: '30'
    });
  };

  const generateShareLink = () => {
    const baseUrl = window.location?.origin;
    return `${baseUrl}/session/${session?.id}?shared=true`;
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(generateShareLink());
    // You could add a toast notification here
  };

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-heading font-semibold text-card-foreground">
              Share Session
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {session?.name}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>
        
        <div className="p-6">
          {/* Share Link Section */}
          <div className="mb-6">
            <h3 className="text-sm font-heading font-medium text-card-foreground mb-3">
              Share Link
            </h3>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={generateShareLink()}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                onClick={copyShareLink}
              >
                Copy
              </Button>
            </div>
          </div>
          
          {/* Email Sharing Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-heading font-medium text-card-foreground">
              Invite by Email
            </h3>
            
            <Input
              label="Email Addresses"
              type="text"
              placeholder="Enter email addresses separated by commas"
              description="Recipients will receive an invitation email"
              value={shareData?.emails}
              onChange={(e) => handleInputChange('emails', e?.target?.value)}
            />
            
            <Select
              label="Permission Level"
              options={permissionOptions}
              value={shareData?.permission}
              onChange={(value) => handleInputChange('permission', value)}
            />
            
            <Input
              label="Message (Optional)"
              type="text"
              placeholder="Add a personal message"
              value={shareData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Expires In"
                options={expirationOptions}
                value={shareData?.expiresIn}
                onChange={(value) => handleInputChange('expiresIn', value)}
              />
              
              <div className="flex items-end">
                <Checkbox
                  label="Allow Download"
                  checked={shareData?.allowDownload}
                  onChange={(e) => handleInputChange('allowDownload', e?.target?.checked)}
                />
              </div>
            </div>
            
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
                iconName="Share2"
                disabled={!shareData?.emails?.trim()}
              >
                Send Invitations
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareSessionModal;