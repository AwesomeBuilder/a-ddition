import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full p-8 flex flex-col items-center"
      style={{ background: "transparent" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome</h1>
      <h1 className="text-4xl font-bold mb-6 text-center">to</h1>
      <h1 className="text-4xl font-bold mb-6 text-center">A-ddition</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Math Questions (Easy Level 1) Button */}
        <button
          onClick={() => navigate("/questions/easy/1")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex flex-col items-center col-span-2"
        >
          <span className="text-3xl mb-2">🧮</span>
          <span className="text-lg">Play</span>
        </button>
        {/* Settings Button */}
        <button
          onClick={() => navigate("/settings")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-3xl mb-2">⚙️</span>
          <span className="text-lg">Settings</span>
        </button>

        {/* Drawing Page 1 Button */}
        <button
          onClick={() => navigate("/drawing/1")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-3xl mb-2">🎨</span>
          <span className="text-lg">Draw</span>
        </button>

        {/* Levels Button */}
        <button
          onClick={() => navigate("/levels")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-3xl mb-2">🎯</span>
          <span className="text-lg">Levels</span>
        </button>
      </div>
    </div>
  );
}
