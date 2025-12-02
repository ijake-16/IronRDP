import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Session } from '../models/Session';
import type { UserInteraction } from '../types';

interface SessionContextType {
  currentSession: Session;
  setCurrentSession: (session: Session) => void;
  updateSession: (updater: (session: Session) => Session) => void;
  userInteraction: UserInteraction | null;
  setUserInteraction: (interaction: UserInteraction) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSessionState] = useState<Session>(new Session('NewSession'));
  const [userInteraction, setUserInteractionState] = useState<UserInteraction | null>(null);

  const setCurrentSession = (session: Session) => {
    setCurrentSessionState(session);
  };

  const updateSession = (updater: (session: Session) => Session) => {
    setCurrentSessionState(prevSession => updater(prevSession));
  };

  const setUserInteraction = (interaction: UserInteraction) => {
    setUserInteractionState(interaction);
  };

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        updateSession,
        userInteraction,
        setUserInteraction,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

