import React from 'react';
import type { LightState } from '../utils/audio';

interface AboutProps {
  onClose: () => void;
  lightState: LightState;
  elapsed: number;
  status: 'idle' | 'running' | 'paused';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const MINI_TIMER_COLOR: Record<LightState, string> = {
  none:     'text-white',
  green:    'text-green-400',
  yellow:   'text-yellow-400',
  red:      'text-red-500',
  overtime: 'text-red-500',
};

function MiniTimer({ lightState, elapsed, status }: { lightState: LightState; elapsed: number; status: 'idle' | 'running' | 'paused' }) {
  const isActive = status !== 'idle' || elapsed > 0;
  return (
    <span
      className={[
        'font-mono text-xs font-bold tabular-nums transition-colors duration-300',
        MINI_TIMER_COLOR[lightState],
        lightState === 'overtime' ? 'light-pulse' : '',
      ].join(' ')}
    >
      {isActive ? formatTime(elapsed) : '--:--'}
    </span>
  );
}

export function About({ onClose, lightState, elapsed, status }: AboutProps) {
  return (
    <div className="bg-gray-950 text-white flex flex-col gap-2 p-3 select-none w-full h-screen overflow-hidden">
      {/* Header — drag region. pl-16 clears Mac traffic light buttons */}
      <div
        className="w-full flex items-center justify-between cursor-grab pl-16"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          ToastTime ⠿
        </span>
        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <MiniTimer lightState={lightState} elapsed={elapsed} status={status} />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="about-scroll flex flex-col gap-3 overflow-y-auto flex-1 min-h-0 pr-1">
        <p className="text-gray-400 text-xs">
          A speech timer for club meetings and personal practice.
        </p>

        {/* How to Use */}
        <div>
          <h3 className="text-gray-300 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
            How to Use
          </h3>
          <ol className="text-gray-400 text-xs space-y-1.5 list-none">
            <li><span className="text-amber-400 mr-1">1.</span>Pick a role or scroll the <span className="text-green-400">Min</span> / <span className="text-yellow-400">Warn</span> / <span className="text-red-500">Max</span> drums to set times</li>
            <li><span className="text-amber-400 mr-1">2.</span>Press <span className="text-green-400 font-semibold">Start</span> when the speaker begins</li>
            <li><span className="text-green-400 mr-1">●</span><span className="text-green-400 font-semibold">Min</span> — minimum time reached</li>
            <li><span className="text-yellow-400 mr-1">●</span><span className="text-yellow-400 font-semibold">Warn</span> — midpoint, time to wrap up</li>
            <li><span className="text-red-500 mr-1">●</span><span className="text-red-500 font-semibold">Max</span> — maximum time reached</li>
            <li><span className="text-red-500 mr-1">◌</span>Flashing — overtime, past grace period</li>
          </ol>
        </div>

        {/* Options */}
        <div>
          <h3 className="text-gray-300 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
            Options
          </h3>
          <ul className="text-gray-400 text-xs space-y-1.5">
            <li><span className="text-amber-400 mr-1">☑</span><span className="text-gray-300">+30s grace</span> — allows 30s after Max before overtime flashes</li>
            <li><span className="text-amber-400 mr-1">☑</span><span className="text-gray-300">Auto Warn</span> — sets Warn automatically to the midpoint of Min and Max</li>
          </ul>
        </div>

        {/* Tips */}
        <div>
          <h3 className="text-gray-300 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
            Tips
          </h3>
          <ul className="text-gray-400 text-xs space-y-1.5">
            <li><span className="text-gray-500 mr-1">→</span>Drag the title bar to reposition the window</li>
            <li><span className="text-gray-500 mr-1">→</span>Pick a role to auto-fill Min / Warn / Max</li>
            <li><span className="text-gray-500 mr-1">→</span>Thresholds and options lock while the timer is running</li>
          </ul>
        </div>
      </div>

      {/* Footer — pinned at bottom */}
      <div className="border-t border-gray-800 pt-2 flex items-center justify-between flex-shrink-0">
        <p className="text-gray-500 text-[10px]">
          Built by <span className="text-gray-300">Bruce Byrne</span>
        </p>
        <a
          href="mailto:toasttime@bjbyrne.com"
          className="text-amber-500 hover:text-amber-400 text-[10px]"
        >
          toasttime@bjbyrne.com
        </a>
      </div>
    </div>
  );
}
