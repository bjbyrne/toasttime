import React from 'react';
import type { LightState } from '../utils/audio';

interface TrafficLightProps {
  lightState: LightState;
}

const LIGHTS = [
  {
    state: 'green' as LightState,
    activeColor: 'bg-green-400',
    glowColor: 'shadow-[0_0_20px_6px_rgba(74,222,128,0.8)]',
    label: 'GO',
  },
  {
    state: 'yellow' as LightState,
    activeColor: 'bg-yellow-400',
    glowColor: 'shadow-[0_0_20px_6px_rgba(250,204,21,0.8)]',
    label: 'MID',
  },
  {
    state: 'red' as LightState,
    activeColor: 'bg-red-500',
    glowColor: 'shadow-[0_0_20px_6px_rgba(239,68,68,0.8)]',
    label: 'STOP',
  },
];

export function TrafficLight({ lightState }: TrafficLightProps) {
  return (
    <div className="flex flex-row items-center gap-6 bg-gray-900 rounded-2xl px-8 py-4 border border-gray-700">
      {LIGHTS.map(({ state, activeColor, glowColor, label }) => {
        const isActive =
          lightState === state ||
          (state === 'red' && lightState === 'overtime');
        const isOvertime = state === 'red' && lightState === 'overtime';

        return (
          <div key={state} className="flex flex-col items-center gap-1">
            <div
              className={[
                'w-16 h-16 rounded-full transition-all duration-300',
                isActive ? `${activeColor} ${glowColor}` : 'bg-gray-700',
                isOvertime ? 'light-pulse' : '',
              ].join(' ')}
            />
            <span className="text-gray-500 text-xs font-mono tracking-widest">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
