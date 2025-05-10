export interface GlossaryTerm {
    term: string;
    description: string;
  }
  
  export const glossary: GlossaryTerm[] = [
    {
      term: 'Heart Rate Variability (HRV)',
      description: 'Heart Rate Variability (HRV) measures the variation in time between heartbeats, reflecting your nervous system’s adaptability to stress and recovery. Higher HRV often indicates better resilience and health.',
    },
    {
      term: 'metabolic panels',
      description: 'Metabolic panels are blood tests that assess key health markers like glucose, cholesterol, and hormone levels, providing insights into your metabolic health and organ function.',
    },
    {
      term: 'cortisol',
      description: 'Cortisol is a stress hormone produced by the adrenal glands. Managing cortisol levels is crucial for reducing stress and improving overall well-being.',
    },
    // Add more terms as needed
  ];