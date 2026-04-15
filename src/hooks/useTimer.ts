import { useCallback, useEffect, useRef, useState } from 'react';
import { playBell, type LightState } from '../utils/audio';

export type TimerStatus = 'idle' | 'running' | 'paused';

interface Thresholds {
  green: number;
  yellow: number;
  red: number;
}

interface UseTimerResult {
  elapsed: number;
  status: TimerStatus;
  lightState: LightState;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(thresholds: Thresholds, gracePeriod: boolean): UseTimerResult {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [lightState, setLightState] = useState<LightState>('none');

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msRef = useRef(0);
  const prevLightRef = useRef<LightState>('none');

  const computeLight = useCallback(
    (secs: number): LightState => {
      const overtimeThreshold = thresholds.red + (gracePeriod ? 30 : 0);
      if (secs >= overtimeThreshold) return 'overtime';
      if (secs >= thresholds.red) return 'red';
      if (secs >= thresholds.yellow) return 'yellow';
      if (secs >= thresholds.green) return 'green';
      return 'none';
    },
    [thresholds, gracePeriod],
  );

  // Recompute light when thresholds or gracePeriod changes while paused/idle
  useEffect(() => {
    if (status !== 'running') {
      const newLight = computeLight(elapsed);
      setLightState(newLight);
      prevLightRef.current = newLight;
    }
  }, [thresholds, gracePeriod, elapsed, status, computeLight]);

  const start = useCallback(() => {
    if (status === 'running') return;
    setStatus('running');

    intervalRef.current = setInterval(() => {
      msRef.current += 100;
      if (msRef.current % 1000 === 0) {
        const secs = msRef.current / 1000;
        setElapsed(secs);

        const newLight = computeLight(secs);
        if (newLight !== prevLightRef.current) {
          setLightState(newLight);
          if (newLight !== 'none') {
            playBell(newLight);
          }
          prevLightRef.current = newLight;
        }
      }
    }, 100);
  }, [status, computeLight]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    msRef.current = 0;
    setElapsed(0);
    setStatus('idle');
    setLightState('none');
    prevLightRef.current = 'none';
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { elapsed, status, lightState, start, pause, reset };
}
