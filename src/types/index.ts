export interface AnimationComponent {
  id: string;
  name: string;
  description: string;
  useCases: string[];
  performanceTips?: string[];
  tags: string[];
  jsCode: string;
  tsCode: string;
  previewUrl?: string; // URL to animated GIF/WebM or live preview
}

export type CodeLanguage = 'javascript' | 'typescript';