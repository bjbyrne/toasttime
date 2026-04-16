import React from 'react';

// 0:30 → 15:00 in 30s steps
const STEPS = Array.from({ length: 30 }, (_, i) => (i + 1) * 30);

function formatStep(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

interface DrumProps {
  label: string;
  color: string;
  value: number;
  disabled: boolean;
  onChange: (secs: number) => void;
}

function Drum({ label, color, value, disabled, onChange }: DrumProps) {
  const idx = STEPS.indexOf(value);
  // If value isn't in STEPS (e.g. auto-calc landed on :15), find nearest position for scrolling
  const currentIdx = idx >= 0 ? idx : STEPS.findIndex(s => s > value) - 1;
  const safeIdx = Math.max(0, Math.min(STEPS.length - 1, currentIdx));

  const go = (delta: number) => {
    if (disabled) return;
    const newIdx = Math.max(0, Math.min(STEPS.length - 1, safeIdx + delta));
    onChange(STEPS[newIdx]);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    go(e.deltaY > 0 ? 1 : -1);
  };

  const prev = STEPS[safeIdx - 1];
  const current = value; // always show the actual value, not STEPS lookup
  const next = STEPS[safeIdx + 1];

  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className={`text-[10px] font-semibold uppercase tracking-wide ${color}`}>{label}</span>
      <div
        className={`relative w-full bg-gray-800 rounded-lg overflow-hidden select-none ${disabled ? 'opacity-50' : 'cursor-ns-resize'}`}
        style={{ height: '66px' }}
        onWheel={handleWheel}
      >
        {/* Amber selection band */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[22px] bg-amber-950/60 border-y border-amber-700/40 pointer-events-none z-0" />
        {/* Fade top */}
        <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-gray-800 to-transparent pointer-events-none z-10" />
        {/* Fade bottom */}
        <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col h-full">
          <div
            className="flex-1 flex items-center justify-center active:bg-white/5 transition-colors"
            onClick={() => go(-1)}
          >
            <span className="font-mono text-[11px] text-gray-600">
              {prev !== undefined ? formatStep(prev) : ''}
            </span>
          </div>

          <div className="flex items-center justify-center" style={{ height: '22px' }}>
            <span className={`font-mono text-sm font-bold tabular-nums ${color}`}>
              {formatStep(current)}
            </span>
          </div>

          <div
            className="flex-1 flex items-center justify-center active:bg-white/5 transition-colors"
            onClick={() => go(1)}
          >
            <span className="font-mono text-[11px] text-gray-600">
              {next !== undefined ? formatStep(next) : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ThresholdsProps {
  green: number;
  yellow: number;
  red: number;
  autoWarn: boolean;
  onChange: (green: number, yellow: number, red: number) => void;
  disabled: boolean;
}

export function CustomTimings({ green, yellow, red, autoWarn, onChange, disabled }: ThresholdsProps) {
  const outOfOrder = green >= red || (!autoWarn && (green >= yellow || yellow >= red));

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
          Thresholds
        </label>
        {outOfOrder && (
          <span className="text-red-500 text-[10px]">min &lt; warn &lt; max</span>
        )}
      </div>
      <div className="flex gap-2">
        <Drum label="Min"  color="text-green-400"  value={green}  disabled={disabled} onChange={(v) => onChange(v, yellow, red)} />
        <Drum label="Warn" color="text-yellow-400" value={yellow} disabled={disabled || autoWarn} onChange={(v) => onChange(green, v, red)} />
        <Drum label="Max"  color="text-red-500"    value={red}    disabled={disabled} onChange={(v) => onChange(green, yellow, v)} />
      </div>
    </div>
  );
}
