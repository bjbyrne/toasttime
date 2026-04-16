export interface SpeechRole {
  id: string;
  name: string;
  green: number; // seconds
  yellow: number;
  red: number;
}

export const SPEECH_ROLES: SpeechRole[] = [
  { id: 'table-topics', name: 'Impromptu Speech (1:00 - 2:00)', green: 60, yellow: 90, red: 120 },
  { id: 'ice-breaker', name: 'Ice Breaker (4:00 - 6:00)', green: 240, yellow: 300, red: 360 },
  { id: 'prepared-5-7', name: 'Prepared Speech (5:00 - 7:00)', green: 300, yellow: 360, red: 420 },
  { id: 'prepared-7-9', name: 'Prepared Speech (7:00 - 9:00)', green: 420, yellow: 480, red: 540 },
  { id: 'evaluation', name: 'Speech Evaluation (2:00 - 3:00)', green: 120, yellow: 150, red: 180 },
  { id: 'general-evaluator', name: 'General Evaluator (3:00 - 5:00)', green: 180, yellow: 240, red: 300 },
  { id: 'custom', name: 'Custom', green: 60, yellow: 90, red: 120 },
];
