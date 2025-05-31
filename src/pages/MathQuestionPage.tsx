import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getValidDifficultyLevel,
  getValidDifficultyGroup,
  isValidDifficultyLevel,
  isValidDifficultyGroup,
} from "../constants/difficulty";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index in options
  explanation: string;
};

export default function MathQuestionPage() {
  const { difficultyGroup, difficultyLevel } = useParams();
  const validLevel = getValidDifficultyLevel(difficultyLevel);
  const validGroup = getValidDifficultyGroup(difficultyGroup);
  const levelWasInvalid = !isValidDifficultyLevel(difficultyLevel);
  const groupWasInvalid = !isValidDifficultyGroup(difficultyGroup);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]); // stores selected option indices

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const file = await import(`../data/level${validLevel}-questions.json`);
        setQuestions(file.default);
        setAnswers(new Array(file.default.length).fill(null));
      } catch (err) {
        console.error("Failed to load question file:", err);
      }
    };
    loadQuestions();
  }, [validLevel]);

  const handleNext = () => {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[currentIndex] = selectedOption;
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
    }
  };

  const handleSubmit = () => {
    const updated = [...answers];
    updated[currentIndex] = selectedOption;
    setAnswers(updated);
    console.log("Final Answers:", updated);
    // TODO: Navigate to summary or evaluate score
  };

  const current = questions[currentIndex];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Math Challenge</h1>

      {(levelWasInvalid || groupWasInvalid) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Invalid difficulty parameters detected:</p>
          <ul className="list-disc list-inside">
            {levelWasInvalid && <li>Level must be between 1-5. Using default level 1.</li>}
            {groupWasInvalid && <li>Group must be one of: easy, medium, hard, expert, god. Using default 'easy'.</li>}
          </ul>
        </div>
      )}

      <div className="text-lg mb-6">
        <p>Difficulty: <span className="capitalize font-semibold">{validGroup}</span></p>
        <p>Level: <span className="font-semibold">{validLevel}</span></p>
      </div>

      {current && (
        <div>
          <p className="text-xl font-semibold mb-4">
            Q{currentIndex + 1}: {current.question}
          </p>
          <div className="space-y-2 mb-6">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left px-4 py-2 border rounded-lg font-medium ${
                  selectedOption === idx
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
