export interface SpeechRole {
  id: string;
  name: string;
  green: number; // seconds
  yellow: number;
  red: number;
}

export const SPEECH_ROLES: SpeechRole[] = [
  { id: 'table-topics', name: 'Table Topics', green: 60, yellow: 90, red: 120 },
  { id: 'table-topics-contest', name: 'Table Topics Contest', green: 60, yellow: 90, red: 120 },
  { id: 'ice-breaker', name: 'Ice Breaker', green: 240, yellow: 300, red: 360 },
  { id: 'prepared-5-7', name: 'Prepared Speech (5–7 min)', green: 300, yellow: 360, red: 420 },
  { id: 'prepared-7-9', name: 'Prepared Speech (7–9 min)', green: 420, yellow: 480, red: 540 },
  { id: 'evaluation', name: 'Speech Evaluation', green: 120, yellow: 150, red: 180 },
  { id: 'general-evaluator', name: 'General Evaluator', green: 180, yellow: 240, red: 300 },
  { id: 'humorous', name: 'Humorous Speech Contest', green: 300, yellow: 360, red: 420 },
  { id: 'custom', name: 'Custom', green: 60, yellow: 90, red: 120 },
];
