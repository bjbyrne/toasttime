import React from 'react';
import type { LightState } from '../utils/audio';

interface TimerDisplayProps {
  elapsed: number;
  lightState: LightState;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const COLOR_MAP: Record<LightState, string> = {
  none: 'text-gray-300',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  red: 'text-red-400',
  overtime: 'text-red-400',
};

export function TimerDisplay({ elapsed, lightState }: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={[
          'font-mono text-5xl font-bold tabular-nums tracking-tight transition-colors duration-300',
          COLOR_MAP[lightState],
          lightState === 'overtime' ? 'light-pulse' : '',
        ].join(' ')}
      >
        {formatTime(elapsed)}
      </span>
    </div>
  );
}
