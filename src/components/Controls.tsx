import React from 'react';
import type { TimerStatus } from '../hooks/useTimer';

interface ControlsProps {
  status: TimerStatus;
  gracePeriod: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onGracePeriodChange: (value: boolean) => void;
}

export function Controls({
  status,
  gracePeriod,
  onStart,
  onPause,
  onReset,
  onGracePeriodChange,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="flex-1 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={onStart}
            className="flex-1 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
          >
            {status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}
        <button
          onClick={onReset}
          className="flex-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
        >
          Reset
        </button>
      </div>

      {/* Grace Period Toggle */}
      <label className="flex items-center justify-between cursor-pointer select-none">
        <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
          30s grace after Red
        </span>
        <div
          onClick={() => onGracePeriodChange(!gracePeriod)}
          className={[
            'relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer',
            gracePeriod ? 'bg-blue-600' : 'bg-gray-600',
          ].join(' ')}
        >
          <div
            className={[
              'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
              gracePeriod ? 'translate-x-5' : 'translate-x-0.5',
            ].join(' ')}
          />
        </div>
      </label>
    </div>
  );
}
