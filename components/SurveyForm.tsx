"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import surveyData from '@/data/surveyData.json';
import type { Section, Question, SurveyData } from '@/types/survey';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from "@/components/ui/card";
import { ContextTooltip } from '@/components/ContextTooltip';
import { glossary } from '@/data/glossary';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Temporary question ID mapping (replace with actual database IDs after seeding)
const questionIdMapping: { [key: string]: number } = {
  'email': 1,
  'age-range': 2,
  'gender': 3,
  'income': 4,
  'professional-role': 5,
  'company-size': 6,
  'education': 7,
  'industry': 8,
  'burnout-frequency': 9,
  'burnout-challenges': 10,
  'coping-mechanisms': 11,
  'substance-frequency': 12,
  'interest-reduce-substance': 13,
  'substance-free-appeal': 14,
  'reset-outcomes': 15,
  'importance-burnout-recovery': 16,
  'sleep-hours': 17,
  'sleep-quality': 18,
  'sleep-challenges': 19,
  'nutrition-habits': 20,
  'nutrition-barriers': 21,
  'exercise-frequency': 22,
  'exercise-types': 23,
  'mindfulness-practice': 24,
  'routine-consistency': 25,
  'routine-discipline': 26,
  'routine-barriers': 27,
  'routine-enhancement': 28,
  'hrv-familiarity': 29,
  'metabolic-familiarity': 30,
  'concept-familiarity': 31,
  'biometric-use': 32,
  'interest-biometric-program': 33,
  'concept-appeal': 34,
  'retreat-elements-appeal': 35,
  'follow-on-value': 36,
  'follow-on-support-type': 37,
  'location-preference': 38,
  'retreat-price-willingness': 39,
  'follow-on-price-willingness': 40,
  'primary-goals': 41,
  'transformative-elements': 42,
  'updates-opt-in': 43,
  'contact-email': 44,
  'confirm-email': 45
};

// Define the structure for answers state
type Answer = string | string[] | null;
interface AnswersState {
  [questionId: string]: Answer;
}
// Define structure for the "specify" text inputs
interface SpecifyState {
    [questionId_optionId: string]: string;
}

export function SurveyForm() {
  const [answers, setAnswers] = useState<AnswersState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surveyAnswers');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [specifyValues, setSpecifyValues] = useState<SpecifyState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surveySpecifyValues');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const totalSections = (surveyData as SurveyData).sections.length;
  const currentSection = useMemo(() => (surveyData as SurveyData).sections[currentSectionIndex], [currentSectionIndex]);

  // Save progress to local storage
  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
    localStorage.setItem('surveySpecifyValues', JSON.stringify(specifyValues));
  }, [answers, specifyValues]);

  // Scroll to section
  useEffect(() => {
    if (currentSectionIndex > 0) {
      const sectionElement = document.getElementById(currentSection.id);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentSectionIndex, currentSection.id]);

  // Wrap glossary terms with tooltips
  const wrapGlossaryTerms = useCallback((text: string): React.ReactNode => {
    let result: React.ReactNode[] = [text];
    glossary.forEach(({ term, description }) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const newResult: React.ReactNode[] = [];
      result.forEach((part) => {
        if (typeof part === 'string') {
          const split = part.split(regex);
          split.forEach((segment, index) => {
            newResult.push(segment);
            if (index < split.length - 1) {
              newResult.push(
                <ContextTooltip key={`${term}-${index}`} term={term} description={description}>
                  {term}
                </ContextTooltip>
              );
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });
    return result;
  }, []);

  // Handler Functions
  const handleRadioChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleCheckboxChange = useCallback((questionId: string, optionId: string, checked: boolean | 'indeterminate', maxSelections?: number) => {
    setAnswers((prev) => {
      const currentSelection = (prev[questionId] as string[] | undefined) || [];
      let newSelection: string[];
      if (checked) {
        if (maxSelections && currentSelection.length >= maxSelections) {
          console.warn(`Maximum selections (${maxSelections}) reached for question ${questionId}`);
          return prev;
        }
        newSelection = [...currentSelection, optionId];
      } else {
        newSelection = currentSelection.filter((id) => id !== optionId);
      }
      return { ...prev, [questionId]: newSelection };
    });
  }, []);

  const handleTextChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleSpecifyChange = useCallback((questionId: string, optionId: string, value: string) => {
    setSpecifyValues((prev) => ({ ...prev, [`${questionId}_${optionId}`]: value }));
  }, []);

  // Validation
  const validateSection = (section: Section): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    section.questions
      .filter(shouldShowQuestion)
      .forEach((question) => {
        const answer = answers[question.id];
        const isRequired = question.required ?? false;

        if (isRequired) {
          let isEmpty = false;
          if (question.type === 'checkbox') {
            isEmpty = !answer || (Array.isArray(answer) && answer.length === 0);
          } else {
            isEmpty = !answer || (typeof answer === 'string' && answer.trim() === '');
          }

          if (isEmpty) {
            errors[question.id] = 'This field is required.';
            isValid = false;
          } else {
            delete errors[question.id];
          }

          // Enhanced email validation
          if (question.type === 'email' && answer && typeof answer === 'string') {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(answer)) {
              errors[question.id] = 'Please enter a valid email address.';
              isValid = false;
            }
          }

          // Validate email confirmation (for your-vision section)
          if (question.id === 'confirm-email' && answer && typeof answer === 'string') {
            const contactEmail = answers['contact-email'];
            if (answer !== contactEmail) {
              errors[question.id] = 'Emails do not match.';
              isValid = false;
            }
          }
        }

        if (question.options && (question.type === 'radio' || question.type === 'checkbox')) {
          question.options.forEach((option) => {
            if (option.specify) {
              const specifyKey = `${question.id}_${option.id}`;
              const isOptionSelected = question.type === 'radio'
                ? answers[question.id] === option.id
                : (answers[question.id] as string[] | undefined)?.includes(option.id);

              if (isOptionSelected && (!specifyValues[specifyKey] || specifyValues[specifyKey].trim() === '')) {
                errors[specifyKey] = 'Please specify your answer.';
                isValid = false;
              }
            }
          });
        }
      });

    setValidationErrors(errors);
    return isValid;
  };

  // Conditional Logic
  const shouldShowQuestion = (question: Question): boolean => {
    if (!question.conditionalOn || !question.conditionalValue) {
      return true;
    }
    const dependentAnswer = answers[question.conditionalOn];
    if (!dependentAnswer) return false;

    const conditionValues = Array.isArray(question.conditionalValue)
      ? question.conditionalValue
      : [question.conditionalValue];

    if (Array.isArray(dependentAnswer)) {
      return dependentAnswer.some((ans) => conditionValues.includes(ans));
    } else {
      return conditionValues.includes(dependentAnswer);
    }
  };

  // Navigation
  const handleNext = () => {
    if (!validateSection(currentSection)) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      if (firstErrorKey) {
        const errorElement = document.getElementById(firstErrorKey) || document.querySelector(`[aria-describedby*="${firstErrorKey}"]`);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setValidationErrors({});
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setValidationErrors({});
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateSection(currentSection)) {
      console.log("Final validation failed");
      return;
    }

    try {
      // Assume survey_id = 1 for Rooted™ survey
      const surveyId = 1;

      // Get email (prefer personal-info.email, fallback to your-vision.contact-email)
      const email = answers['email'] || answers['contact-email'] || null;

      // Insert submission
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert([{ survey_id: surveyId, email }])
        .select()
        .single();

      if (submissionError) {
        console.error('Submission error:', submissionError);
        throw new Error(`Failed to save submission: ${submissionError.message}`);
      }

      const submissionId = submission.id;

      // Prepare responses
      const responses = Object.entries(answers).map(([questionId, answer]) => {
        const dbQuestionId = questionIdMapping[questionId];
        if (!dbQuestionId) {
          console.error(`No database question ID found for ${questionId}`);
          throw new Error(`Invalid question ID: ${questionId}`);
        }
        return {
          submission_id: submissionId,
          question_id: dbQuestionId,
          answer: answer
        };
      });

      // Insert responses
      const { error: responsesError } = await supabase
        .from('responses')
        .insert(responses);

      if (responsesError) {
        console.error('Responses error:', responsesError);
        throw new Error(`Failed to save responses: ${responsesError.message}`);
      }

      // Insert specify values (if any)
      const specifyResponses = Object.entries(specifyValues).map(([key, value]) => {
        const [questionId, optionId] = key.split('_');
        const dbQuestionId = questionIdMapping[questionId];
        if (!dbQuestionId) {
          console.error(`No database question ID found for ${questionId}`);
          throw new Error(`Invalid question ID: ${questionId}`);
        }
        return {
          submission_id: submissionId,
          question_id: dbQuestionId,
          answer: { option_id: optionId, specify_value: value }
        };
      });

      if (specifyResponses.length > 0) {
        const { error: specifyError } = await supabase
          .from('responses')
          .insert(specifyResponses);

        if (specifyError) {
          console.error('Specify responses error:', specifyError);
          throw new Error(`Failed to save specify responses: ${specifyError.message}`);
        }
      }

      console.log('Survey Submitted Successfully!');
      console.log('Submission ID:', submissionId);
      console.log('Answers:', answers);
      console.log('Specify Values:', specifyValues);
      setIsSubmitted(true);
      localStorage.removeItem('surveyAnswers');
      localStorage.removeItem('surveySpecifyValues');
    } catch (error: any) {
      console.error('Submission failed:', error.message, error.stack);
      setSubmissionError(`Failed to submit survey: ${error.message}`);
    }
  };

  const handleBeginClick = () => {
    const sectionElement = document.getElementById(currentSection.id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Clear saved progress
  const handleClearProgress = () => {
    setAnswers({});
    setSpecifyValues({});
    setCurrentSectionIndex(0);
    localStorage.removeItem('surveyAnswers');
    localStorage.removeItem('surveySpecifyValues');
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8"
      >
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg">{(surveyData as SurveyData).thankYouMessage}</p>
      </motion.div>
    );
  }

  const progressValue = ((currentSectionIndex + 1) / totalSections) * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      {/* Introduction Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 border rounded-lg shadow-sm bg-card text-card-foreground"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">{(surveyData as SurveyData).title}</h1>
        <p className="text-muted-foreground whitespace-pre-line">{wrapGlossaryTerms((surveyData as SurveyData).introduction)}</p>
        <div className="flex justify-center mt-6">
          <Button type="button" onClick={handleBeginClick} size="lg">
            Let's begin
          </Button>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-background py-4 mb-8">
        <Progress value={progressValue} className="w-full" aria-label="Survey progress" />
        <p className="text-sm text-muted-foreground text-center mt-2">Section {currentSectionIndex + 1} of {totalSections}</p>
      </div>

      {/* Current Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={currentSection.id}
          id={currentSection.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 scroll-mt-20"
        >
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentSection.title}</h2>
            {currentSection.introduction && (
              <p className="text-muted-foreground mb-6">{wrapGlossaryTerms(currentSection.introduction)}</p>
            )}
          </div>

          {currentSection.questions.filter(shouldShowQuestion).map((question) => {
            const questionError = validationErrors[question.id];
            return (
              <Card key={question.id} className="overflow-hidden question-card">
                <CardContent className="pt-6 space-y-4">
                  <Label htmlFor={question.id} className="text-lg font-bold block">
                    {wrapGlossaryTerms(question.text)}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                    {question.selectMax && <span className="text-sm text-muted-foreground ml-2">(Select up to {question.selectMax})</span>}
                  </Label>

                  <div className="space-y-2">
                    {question.type === 'radio' && question.options && (
                      <RadioGroup
                        id={question.id}
                        value={answers[question.id] as string || ''}
                        onValueChange={(value) => handleRadioChange(question.id, value)}
                        className="space-y-2"
                        aria-describedby={questionError ? `${question.id}-error` : undefined}
                      >
                        {question.options.map((option) => {
                          const specifyKey = `${question.id}_${option.id}`;
                          const specifyError = validationErrors[specifyKey];
                          return (
                            <div key={option.id} className="flex flex-wrap items-center space-x-2">
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                                <Label htmlFor={`${question.id}-${option.id}`} className="font-normal">
                                  {wrapGlossaryTerms(option.label)}
                                </Label>
                              </div>
                              {option.specify && answers[question.id] === option.id && (
                                <div className="flex-grow pl-6 sm:pl-0 sm:ml-4 mt-1 sm:mt-0 w-full sm:w-auto">
                                  <Input
                                    type="text"
                                    placeholder="Please specify"
                                    value={specifyValues[specifyKey] || ''}
                                    onChange={(e) => handleSpecifyChange(question.id, option.id, e.target.value)}
                                    className={`h-8 flex-grow ${specifyError ? 'border-destructive' : ''}`}
                                    aria-describedby={specifyError ? `${specifyKey}-error` : undefined}
                                  />
                                  {specifyError && <p id={`${specifyKey}-error`} className="text-sm text-destructive mt-1">{specifyError}</p>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </RadioGroup>
                    )}

                    {question.type === 'checkbox' && question.options && (
                      <div id={question.id} className="space-y-2" aria-describedby={questionError ? `${question.id}-error` : undefined}>
                        {question.options.map((option) => {
                          const currentAnswers = answers[question.id] as string[] | undefined ?? [];
                          const isChecked = currentAnswers.includes(option.id);
                          let isDisabled = false;
                          if (!isChecked && typeof question.selectMax === 'number' && question.selectMax > 0) {
                            isDisabled = currentAnswers.length >= question.selectMax;
                          }
                          const specifyKey = `${question.id}_${option.id}`;
                          const specifyError = validationErrors[specifyKey];
                          return (
                            <div key={option.id} className="flex flex-wrap items-center space-x-2">
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <Checkbox
                                  id={`${question.id}-${option.id}`}
                                  checked={isChecked}
                                  onCheckedChange={(checked) => handleCheckboxChange(question.id, option.id, checked as boolean | 'indeterminate', question.selectMax)}
                                  disabled={isDisabled}
                                />
                                <Label htmlFor={`${question.id}-${option.id}`} className={`font-normal ${isDisabled ? 'text-muted-foreground' : ''}`}>
                                  {wrapGlossaryTerms(option.label)}
                                </Label>
                              </div>
                              {option.specify && isChecked && (
                                <div className="flex-grow pl-6 sm:pl-0 sm:ml-4 mt-1 sm:mt-0 w-full sm:w-auto">
                                  <Input
                                    type="text"
                                    placeholder="Please specify"
                                    value={specifyValues[specifyKey] || ''}
                                    onChange={(e) => handleSpecifyChange(question.id, option.id, e.target.value)}
                                    className={`h-8 flex-grow ${specifyError ? 'border-destructive' : ''}`}
                                    aria-describedby={specifyError ? `${specifyKey}-error` : undefined}
                                  />
                                  {specifyError && <p id={`${specifyKey}-error`} className="text-sm text-destructive mt-1">{specifyError}</p>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'text' && (
                      <Input
                        id={question.id}
                        type="text"
                        placeholder={question.placeholder}
                        value={answers[question.id] as string || ''}
                        onChange={(e) => handleTextChange(question.id, e.target.value)}
                        required={question.required}
                        className={questionError ? 'border-destructive' : ''}
                        aria-describedby={questionError ? `${question.id}-error` : undefined}
                      />
                    )}

                    {question.type === 'textarea' && (
                      <Textarea
                        id={question.id}
                        placeholder={question.placeholder}
                        value={answers[question.id] as string || ''}
                        onChange={(e) => handleTextChange(question.id, e.target.value)}
                        required={question.required}
                        rows={4}
                        className={questionError ? 'border-destructive' : ''}
                        aria-describedby={questionError ? `${question.id}-error` : undefined}
                      />
                    )}

                    {question.type === 'email' && (
                      <Input
                        id={question.id}
                        type="email"
                        placeholder={question.placeholder}
                        value={answers[question.id] as string || ''}
                        onChange={(e) => handleTextChange(question.id, e.target.value)}
                        required={question.required}
                        className={questionError ? 'border-destructive' : ''}
                        aria-describedby={questionError ? `${question.id}-error` : undefined}
                      />
                    )}
                  </div>

                  {questionError && <p id={`${question.id}-error`} className="text-sm text-destructive mt-1">{questionError}</p>}
                </CardContent>
              </Card>
            );
          })}
        </motion.section>
      </AnimatePresence>

      {/* Submission Error */}
      {submissionError && (
        <p className="text-sm text-destructive mt-4 text-center">{submissionError}</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 w-full">
        <div className="space-x-2">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            variant="outline"
            aria-label="Go to previous section"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleClearProgress}
            variant="destructive"
            aria-label="Clear saved progress"
          >
            Clear Progress
          </Button>
        </div>
        {currentSectionIndex < totalSections - 1 ? (
          <Button type="button" onClick={handleNext} aria-label="Go to next section">
            Next
          </Button>
        ) : (
          <Button type="submit" aria-label="Submit survey">
            Submit Survey
          </Button>
        )}
      </div>
    </form>
  );
}