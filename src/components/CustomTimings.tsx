import React from 'react';

interface CustomTimingsProps {
  green: number;
  yellow: number;
  red: number;
  onChange: (green: number, yellow: number, red: number) => void;
  disabled: boolean;
}

function toMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function fromMMSS(value: string): number | null {
  const parts = value.split(':');
  if (parts.length !== 2) return null;
  const m = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  if (isNaN(m) || isNaN(s) || s >= 60) return null;
  return m * 60 + s;
}

interface TimeInputProps {
  label: string;
  color: string;
  value: number;
  onChange: (secs: number) => void;
  disabled: boolean;
}

function TimeInput({ label, color, value, onChange, disabled }: TimeInputProps) {
  const [raw, setRaw] = React.useState(toMMSS(value));
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setRaw(toMMSS(value));
  }, [value]);

  return (
    <div className="flex items-center gap-2 flex-1">
      <span className={`text-xs font-semibold ${color} w-14`}>{label}</span>
      <input
        type="text"
        value={raw}
        disabled={disabled}
        placeholder="MM:SS"
        onChange={(e) => {
          setRaw(e.target.value);
          const secs = fromMMSS(e.target.value);
          if (secs !== null) {
            setError(false);
            onChange(secs);
          } else {
            setError(true);
          }
        }}
        className={[
          'w-full bg-gray-800 text-white border rounded-md px-2 py-1 text-sm font-mono text-center focus:outline-none disabled:opacity-50',
          error ? 'border-red-500' : 'border-gray-600 focus:border-blue-500',
        ].join(' ')}
      />
    </div>
  );
}

export function CustomTimings({ green, yellow, red, onChange, disabled }: CustomTimingsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
        Custom Thresholds
      </label>
      <div className="flex gap-2">
        <TimeInput
          label="Green"
          color="text-green-400"
          value={green}
          disabled={disabled}
          onChange={(v) => onChange(v, yellow, red)}
        />
        <TimeInput
          label="Yellow"
          color="text-yellow-400"
          value={yellow}
          disabled={disabled}
          onChange={(v) => onChange(green, v, red)}
        />
        <TimeInput
          label="Red"
          color="text-red-400"
          value={red}
          disabled={disabled}
          onChange={(v) => onChange(green, yellow, v)}
        />
      </div>
    </div>
  );
}
