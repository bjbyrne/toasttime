import React from 'react';
import type { TimerStatus } from '../hooks/useTimer';

interface ControlsProps {
  status: TimerStatus;
  gracePeriod: boolean;
  autoWarn: boolean;
  invalidThresholds: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onGracePeriodChange: (value: boolean) => void;
  onAutoWarnChange: (value: boolean) => void;
}

export function Controls({
  status,
  gracePeriod,
  autoWarn,
  invalidThresholds,
  onStart,
  onPause,
  onReset,
  onGracePeriodChange,
  onAutoWarnChange,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Start/Pause + Reset buttons */}
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
            disabled={invalidThresholds}
            className="flex-1 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-xs disabled:opacity-40 disabled:cursor-not-allowed"
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

      {/* Options — both on one line */}
      <div className="flex items-center justify-between">
        <label className={`flex items-center gap-1.5 select-none ${status === 'running' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={gracePeriod}
            disabled={status === 'running'}
            onChange={(e) => onGracePeriodChange(e.target.checked)}
            className="w-3 h-3 accent-amber-500 cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
            +30s grace
          </span>
        </label>
        <label className={`flex items-center gap-1.5 select-none ${status === 'running' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={autoWarn}
            disabled={status === 'running'}
            onChange={(e) => onAutoWarnChange(e.target.checked)}
            className="w-3 h-3 accent-amber-500 cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
            Auto Warn
          </span>
        </label>
      </div>
    </div>
  );
}
