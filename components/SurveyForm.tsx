"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { surveyData } from '@/data/surveyQuestions';
import type { Section, Question } from '@/types/survey';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from "@/components/ui/card";

// Define the structure for answers state
type Answer = string | string[] | null; // string for single choice/text, string[] for checkbox
interface AnswersState {
  [questionId: string]: Answer;
}
// Define structure for the "specify" text inputs
interface SpecifyState {
    [questionId_optionId: string]: string;
}


export function SurveyForm() {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [specifyValues, setSpecifyValues] = useState<SpecifyState>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Start with the first section
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({}); // For showing errors

  const totalSections = surveyData.sections.length;
  const currentSection = useMemo(() => surveyData.sections[currentSectionIndex], [currentSectionIndex]);

  // --- Handler Functions ---

  const handleRadioChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleCheckboxChange = useCallback((questionId: string, optionId: string, checked: boolean | 'indeterminate', maxSelections?: number) => {
    setAnswers((prev) => {
      const currentSelection = (prev[questionId] as string[] | undefined) || [];
      let newSelection: string[];

      if (checked) {
        // Add selection, respecting maxSelections if defined
        if (maxSelections && currentSelection.length >= maxSelections) {
          // Optional: Provide feedback that max is reached
          console.warn(`Maximum selections (${maxSelections}) reached for question ${questionId}`);
          return prev; // Prevent adding more than max
        }
        newSelection = [...currentSelection, optionId];
      } else {
        // Remove selection
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

  // --- Validation ---
  const validateSection = (section: Section): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    section.questions
        .filter(shouldShowQuestion) // Only validate visible questions
        .forEach(question => {
      const answer = answers[question.id];
      const isRequired = question.required ?? false; // Default to not required if undefined

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
          // Clear previous error for this field if now valid
          delete errors[question.id];
        }

        // Add specific validation like email format if needed
        if (question.type === 'email' && answer && typeof answer === 'string' && !/\S+@\S+\.\S+/.test(answer)) {
            errors[question.id] = 'Please enter a valid email address.';
            isValid = false;
        }
      }

      // Validate "specify" inputs if the corresponding option is selected
      if (question.options && (question.type === 'radio' || question.type === 'checkbox')) {
        question.options.forEach(option => {
            if (option.specify) {
                const specifyKey = `${question.id}_${option.id}`;
                const isOptionSelected = question.type === 'radio'
                    ? answers[question.id] === option.id
                    : (answers[question.id] as string[] | undefined)?.includes(option.id);

                if (isOptionSelected && (!specifyValues[specifyKey] || specifyValues[specifyKey].trim() === '')) {
                    // If the 'Other' option is selected, the specify input becomes required
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

  // --- Navigation --- 
  const handleNext = () => {
    if (!validateSection(currentSection)) {
        console.log("Validation errors:", validationErrors);
        // Optionally scroll to the first error
        return;
    }
    setValidationErrors({}); // Clear errors before moving
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setValidationErrors({}); // Clear errors when going back
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateSection(currentSection)) {
      console.log("Final validation failed");
      return;
    }
    console.log('Survey Submitted!');
    console.log('Answers:', answers);
    console.log('Specify Values:', specifyValues);
    setIsSubmitted(true);
  };

  // --- Conditional Logic ---
  const shouldShowQuestion = (question: Question): boolean => {
    if (!question.conditionalOn || !question.conditionalValue) {
      return true; // Not conditional
    }
    const dependentAnswer = answers[question.conditionalOn];
    if (!dependentAnswer) return false; // Dependent question not answered

    const conditionValues = Array.isArray(question.conditionalValue)
        ? question.conditionalValue
        : [question.conditionalValue];

    if (Array.isArray(dependentAnswer)) {
        // Check if any selected checkbox value matches the condition values
        return dependentAnswer.some(ans => conditionValues.includes(ans));
    } else {
        // Check if the single radio/text value matches the condition values
        return conditionValues.includes(dependentAnswer);
    }
  };

  // Handler for the "Let's begin" button
  const handleBeginClick = () => {
    const sectionElement = document.getElementById(currentSection.id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Rendering ---

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg">{surveyData.thankYouMessage}</p>
      </div>
    );
  }

  const progressValue = ((currentSectionIndex + 1) / totalSections) * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
        {/* Introduction Block */}
         <div className="mb-8 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
            <h1 className="text-3xl font-bold mb-4 text-center">{surveyData.title}</h1>
            <p className="text-muted-foreground whitespace-pre-line">{surveyData.introduction}</p>
            {/* Add centered "Let's begin" button */} 
            <div className="flex justify-center mt-6">
                <Button type="button" onClick={handleBeginClick} size="lg">
                    Let&apos;s begin
                </Button>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 bg-background py-4 mb-8">
             <Progress value={progressValue} className="w-full" />
             <p className="text-sm text-muted-foreground text-center mt-2">Section {currentSectionIndex + 1} of {totalSections}</p>
        </div>

        {/* Render ONLY the Current Section */}
        <section key={currentSection.id} id={currentSection.id} className="space-y-6 scroll-mt-20"> {/* Added scroll-mt for offset */}
            <div>
                <h2 className="text-2xl font-bold mb-2">{currentSection.title}</h2>
                {currentSection.introduction && (
                    <p className="text-muted-foreground mb-6">{currentSection.introduction}</p>
                )}
            </div>

            {currentSection.questions.filter(shouldShowQuestion).map((question) => {
             const questionError = validationErrors[question.id];
             return (
                <Card key={question.id} className="overflow-hidden">
                    <CardContent className="pt-6 space-y-4">
                        <Label htmlFor={question.id} className="text-lg font-bold block">
                            {question.text}
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
                                >
                                {question.options.map((option) => {
                                   const specifyKey = `${question.id}_${option.id}`;
                                   const specifyError = validationErrors[specifyKey];
                                    return (
                                        <div key={option.id} className="flex flex-wrap items-center space-x-2">
                                            <div className="flex items-center space-x-2 flex-shrink-0">
                                                <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                                                <Label htmlFor={`${question.id}-${option.id}`} className="font-normal">
                                                    {option.label}
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
                                <div id={question.id} className="space-y-2">
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
                                                    {option.label}
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
                                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            )}
                        </div>

                         {questionError && <p id={`${question.id}-error`} className="text-sm text-destructive mt-1">{questionError}</p>}
                    </CardContent>
                </Card>
             );
            })}
        </section>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 w-full">
        <Button
          type="button"
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          variant="outline"
        >
          Previous
        </Button>

        {currentSectionIndex < totalSections - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="submit">Submit Survey</Button>
        )}
      </div>
    </form>
  );
} 