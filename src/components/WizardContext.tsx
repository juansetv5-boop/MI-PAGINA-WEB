'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardContextType {
  isWizardOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  return (
    <WizardContext.Provider value={{ isWizardOpen, openWizard, closeWizard }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
