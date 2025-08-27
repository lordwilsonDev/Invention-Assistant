
export interface Invention {
  name: string;
  pitch: string;
  features: {
    title: string;
    description: string;
  }[];
  targetAudience: string;
  challenges: string[];
}
