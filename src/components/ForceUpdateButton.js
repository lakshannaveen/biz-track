import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import './ForceUpdateButton.css';

function ForceUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleForceUpdate = async () => {
    const confirmUpdate = window.confirm(
      'This will clear all cached data and reload the app. Continue?'
    );
    
    if (!confirmUpdate) return;

    setIsUpdating(true);

    try {
      // Step 1: Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('All caches cleared');
      }
      
      // Step 2: Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
        console.log('Service workers unregistered');
      }
      
      // Step 3: Force reload from server
      window.location.reload(true);
    } catch (error) {
      console.error('Force update failed:', error);
      alert('Update failed. Please try again or reinstall the app.');
      setIsUpdating(false);
    }
  };

  return (
    <button 
      onClick={handleForceUpdate}
      className="force-update-btn"
      disabled={isUpdating}
      title="Force Update App"
    >
      <RefreshCw 
        size={20} 
        className={isUpdating ? 'spinning' : ''} 
      />
      {isUpdating && <span className="ml-2">Updating...</span>}
    </button>
  );
}

export default ForceUpdateButton;