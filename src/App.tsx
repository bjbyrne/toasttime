import React, { useState } from 'react';
import { SPEECH_ROLES, type SpeechRole } from './data/speechRoles';
import { useTimer } from './hooks/useTimer';
import { TrafficLight } from './components/TrafficLight';
import { TimerDisplay } from './components/TimerDisplay';
import { RoleSelector } from './components/RoleSelector';
import { CustomTimings } from './components/CustomTimings';
import { Controls } from './components/Controls';

export default function App() {
  const [role, setRole] = useState<SpeechRole>(SPEECH_ROLES[0]);
  const [customGreen, setCustomGreen] = useState(60);
  const [customYellow, setCustomYellow] = useState(90);
  const [customRed, setCustomRed] = useState(120);
  const [gracePeriod, setGracePeriod] = useState(true);

  const thresholds =
    role.id === 'custom'
      ? { green: customGreen, yellow: customYellow, red: customRed }
      : { green: role.green, yellow: role.yellow, red: role.red };

  const { elapsed, status, lightState, start, pause, reset } = useTimer(
    thresholds,
    gracePeriod,
  );

  function handleRoleChange(newRole: SpeechRole) {
    reset();
    setRole(newRole);
  }

  function handleCustomChange(g: number, y: number, r: number) {
    setCustomGreen(g);
    setCustomYellow(y);
    setCustomRed(r);
  }

  return (
    <div className="bg-gray-950 text-white flex flex-col items-center gap-2 p-3 select-none">
      {/* Header */}
      <div className="w-full text-center">
        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Toastmasters Timer
        </h1>
      </div>

      {/* Main area: traffic light above timer */}
      <div className="flex flex-col items-center gap-2">
        <TrafficLight lightState={lightState} />
        <TimerDisplay elapsed={elapsed} lightState={lightState} />
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col gap-2 w-full">
        <RoleSelector
          selectedId={role.id}
          onChange={handleRoleChange}
          disabled={status === 'running'}
        />
        {role.id === 'custom' && (
          <CustomTimings
            green={customGreen}
            yellow={customYellow}
            red={customRed}
            onChange={handleCustomChange}
            disabled={status === 'running'}
          />
        )}
        <Controls
          status={status}
          gracePeriod={gracePeriod}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onGracePeriodChange={setGracePeriod}
        />
      </div>
    </div>
  );
}
