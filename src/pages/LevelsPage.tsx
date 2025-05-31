import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLevelStore } from '../context/LevelContext';
import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_GROUPS,
  getValidDifficultyGroup,
  getValidDifficultyLevel,
} from '../constants/difficulty'; // Adjust path as needed


const numbers = DIFFICULTY_LEVELS;
const difficulties = DIFFICULTY_GROUPS;

export default function LevelsPage() {
  const { setLevelCombo } = useLevelStore();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>('easy');

  const navigate = useNavigate();

  // Whenever both selections are made, update context
  useEffect(() => {
    if (selectedNumber && selectedDifficulty) {
      setLevelCombo({ number: selectedNumber, difficulty: selectedDifficulty as any });
    }
  }, [selectedNumber, selectedDifficulty]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Select Level</h1>

      <div className="flex gap-12">
        {/* Numbers column */}
        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-semibold text-lg mb-2">Number</h2>
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => setSelectedNumber(n)}
              className={`w-12 h-12 rounded-sm border text-xl font-bold ${
                selectedNumber === n
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Difficulties column */}
        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-semibold text-lg mb-2">Difficulty</h2>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`w-28 h-12 rounded-xl border capitalize font-medium ${
                selectedDifficulty === d
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          navigate(`/questions/${selectedDifficulty}/${selectedNumber}`)
        }
        disabled={!selectedNumber || !selectedDifficulty}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        Start
      </button>
    </div>
  );
}
