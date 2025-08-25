import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './IconComponents';

// The BeforeInstallPromptEvent is a non-standard event, so we define its interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallPWAButton: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }
    // Show the install prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We can only use the prompt once, so clear it.
      setInstallPromptEvent(null);
    });
  };

  // Render the button only if the install prompt event has been fired
  if (!installPromptEvent) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center space-x-2 hover:text-cyan-400 transition"
      title="Install App"
      aria-label="Install App"
    >
      <DownloadIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Install App</span>
    </button>
  );
};