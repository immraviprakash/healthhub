export type UserMode = 'adult' | 'child';

export interface Medication {
  id: string;
  name: string;
  purpose: string;
  instructions: string;
  safetyNotes: string;
  videoUrl: string;
  thumbnail: string;
}

export interface HealthTopic {
  id: string;
  title: string;
  adultContent: string;
  childContent: string;
  icon: string;
}
