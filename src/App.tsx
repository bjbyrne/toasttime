import React, { useState } from 'react';
import { SPEECH_ROLES, type SpeechRole } from './data/speechRoles';
import { useTimer } from './hooks/useTimer';
import { TrafficLight } from './components/TrafficLight';
import { TimerDisplay } from './components/TimerDisplay';
import { RoleSelector } from './components/RoleSelector';
import { CustomTimings } from './components/CustomTimings';
import { Controls } from './components/Controls';
import { About } from './components/About';

function calcAutoWarn(green: number, red: number): number {
  // Round midpoint to nearest 15s
  return Math.round((green + red) / 2 / 15) * 15;
}

export default function App() {
  const [roleId, setRoleId] = useState(SPEECH_ROLES[0].id);
  const [thresholds, setThresholds] = useState({
    green: SPEECH_ROLES[0].green,
    yellow: SPEECH_ROLES[0].yellow,
    red: SPEECH_ROLES[0].red,
  });
  const [gracePeriod, setGracePeriod] = useState(true);
  const [autoWarn, setAutoWarn] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  // When autoWarn is on, override yellow with the calculated midpoint
  const effectiveThresholds = autoWarn
    ? { ...thresholds, yellow: calcAutoWarn(thresholds.green, thresholds.red) }
    : thresholds;

  const { elapsed, status, lightState, start, pause, reset } = useTimer(effectiveThresholds, gracePeriod);

  const invalidThresholds =
    thresholds.green >= thresholds.red ||
    (!autoWarn && (effectiveThresholds.green >= effectiveThresholds.yellow || effectiveThresholds.yellow >= effectiveThresholds.red));

  function handleRoleChange(role: SpeechRole) {
    reset();
    setRoleId(role.id);
    if (role.id !== 'custom') {
      setThresholds({ green: role.green, yellow: role.yellow, red: role.red });
    }
  }

  function handleThresholdChange(green: number, yellow: number, red: number) {
    setThresholds({ green, yellow, red });
    setRoleId('custom');
  }

  function handleAutoWarnChange(value: boolean) {
    setAutoWarn(value);
    // When turning auto off, seed yellow with the current calculated value
    if (!value) {
      setThresholds(t => ({ ...t, yellow: calcAutoWarn(t.green, t.red) }));
    }
  }

  if (showAbout) {
    return <About onClose={() => setShowAbout(false)} lightState={lightState} elapsed={elapsed} status={status} />;
  }

  return (
    <div className="bg-gray-950 text-white flex flex-col items-center gap-2 p-3 select-none">
      {/* Header — drag region with info button */}
      <div
        className="w-full flex items-center justify-between cursor-grab"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="w-5" />
        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          ToastTime ⠿
        </h1>
        <button
          onClick={() => setShowAbout(true)}
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          className="w-5 h-5 rounded-full border border-gray-600 text-gray-500 hover:text-white hover:border-gray-400 text-[10px] font-bold leading-none flex items-center justify-center transition-colors"
        >
          i
        </button>
      </div>

      {/* Traffic lights + timer */}
      <div className="flex flex-col items-center gap-2">
        <TrafficLight lightState={lightState} />
        <TimerDisplay elapsed={elapsed} lightState={lightState} />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-1.5 w-full">
        <CustomTimings
          green={thresholds.green}
          yellow={effectiveThresholds.yellow}
          red={thresholds.red}
          autoWarn={autoWarn}
          onChange={handleThresholdChange}
          disabled={status === 'running'}
        />
        <RoleSelector
          selectedId={roleId}
          onChange={handleRoleChange}
          disabled={status === 'running'}
        />
        <div className="mt-2">
          <Controls
            status={status}
            gracePeriod={gracePeriod}
            autoWarn={autoWarn}
            invalidThresholds={invalidThresholds}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onGracePeriodChange={setGracePeriod}
            onAutoWarnChange={handleAutoWarnChange}
          />
        </div>
      </div>
    </div>
  );
}
