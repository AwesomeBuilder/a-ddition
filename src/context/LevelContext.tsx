import { createContext, useContext, useState } from 'react';

type LevelCombo = {
  number: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'god';
};

const defaultCombo: LevelCombo = { number: 1, difficulty: 'easy' };

const LevelContext = createContext<{
  levelCombo: LevelCombo;
  setLevelCombo: (c: LevelCombo) => void;
}>({
  levelCombo: defaultCombo,
  setLevelCombo: () => {},
});

export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [levelCombo, setLevelCombo] = useState<LevelCombo>(defaultCombo);

  return (
    <LevelContext.Provider value={{ levelCombo, setLevelCombo }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelStore = () => useContext(LevelContext);
