export interface Option {
  id: string;
  label: string;
  specify?: boolean; // For 'Other (please specify)' type inputs tied to a choice
}

export type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'email';

export interface Question {
  id: string; // Unique identifier for the question (e.g., 'age-range')
  text: string; // The question text
  type: QuestionType;
  options?: Option[]; // Options for radio/checkbox
  required?: boolean; // Is the question mandatory? (Default to true for now)
  conditionalOn?: string; // ID of the question this depends on
  conditionalValue?: string | string[]; // Value(s) of the conditional question that triggers this one
  placeholder?: string; // Placeholder text for text/textarea/email
  selectMax?: number; // Maximum number of selections for checkboxes
}

export interface Section {
  id: string; // Unique identifier for the section (e.g., 'about-you')
  title: string;
  introduction?: string; // Optional intro text for the section
  questions: Question[];
}

export interface SurveyData {
  title: string;
  introduction: string;
  sections: Section[];
  thankYouMessage: string; // Define the thank you message
} 