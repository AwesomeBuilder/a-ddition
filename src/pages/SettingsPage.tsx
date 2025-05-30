import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSettings } from 'react-icons/fi';
import { resolveBackground } from '../utils/themeUtils';

const bgOptions = [
  { name: 'B & W', value: 'bw-gradient' },
  { name: 'Black', value: '#000000' },
  { name: 'Gray', value: '#808080' },
  { name: 'White', value: '#ffffff' },
  { name: 'Red', value: '#ff0000' },
  { name: 'Blue', value: '#0000ff' },
  { name: 'Rainbow', value: 'rainbow-gradient' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);

  const handleThemeChange = (option: string) => {
    const isGradient = option.includes('gradient');
    const textColor = option === '#ffffff' ? '#000000' : '#ffffff';

    const bg = isGradient
      ? option
      : option;

    setTheme({
      backgroundColor: bg,
      textColor,
    });
  };

  return (
    <div className="min-h-screen p-4" style={{ background: resolveBackground(theme.backgroundColor), color: theme.textColor }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <FiSettings size={28} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Sound */}
        <SettingCard label="Sound" isOn={soundOn} onToggle={() => setSoundOn(!soundOn)} />

        {/* Music */}
        <SettingCard label="Music" isOn={musicOn} onToggle={() => setMusicOn(!musicOn)} />

        {/* Theme Colors */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Background</h2>
          <div className="grid grid-cols-3 gap-3">
            {bgOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleThemeChange(opt.value)}
                className="w-full h-16 rounded-xl border-2 border-gray-300 relative overflow-hidden"
                style={{
                  background:
                    opt.value === 'bw-gradient'
                      ? 'linear-gradient(135deg, white, black)'
                      : opt.value === 'rainbow-gradient'
                      ? 'linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)'
                      : opt.value,
                }}
              >
                <span className="absolute bottom-1 left-1 right-1 text-xs font-semibold text-center"
                      style={{
                        color:
                          opt.value === '#ffffff' || opt.value === 'bw-gradient' ? '#000000' : '#ffffff',
                          textShadow: '0 0 2px rgba(0,0,0,0.3)',
  }}
>
  {opt.name}
</span>

              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingCard({
  label,
  isOn,
  onToggle,
}: {
  label: string;
  isOn: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{label}</h2>
      <label className="relative inline-block w-20 h-10 cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={isOn} onChange={onToggle} />
        <div className="block w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-500 transition" />
        <div className="absolute left-1 top-1 bg-white w-8 h-8 rounded-full transition peer-checked:translate-x-10" />
      </label>
    </div>
  );
}
