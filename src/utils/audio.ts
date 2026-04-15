let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(frequency: number, duration: number, delay = 0): void {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
  gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + delay + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration);
}

export type LightState = 'none' | 'green' | 'yellow' | 'red' | 'overtime';

export function playBell(state: LightState): void {
  switch (state) {
    case 'green':
      playTone(880, 0.6);
      break;
    case 'yellow':
      playTone(660, 0.6);
      break;
    case 'red':
      playTone(440, 0.8);
      break;
    case 'overtime':
      // Double-beep: two low pulses
      playTone(330, 0.4, 0);
      playTone(330, 0.4, 0.5);
      break;
    default:
      break;
  }
}
