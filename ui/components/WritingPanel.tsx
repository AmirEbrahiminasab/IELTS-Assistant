"use client";

/**
 * WritingPanel Component
 *
 * Interactive writing panel for IELTS Writing tests.
 * Supports both Training and Exam modes with two parts.
 *
 * Features:
 * - Part 1: Split layout (33% image/task, 67% writing area)
 * - Part 2: Full-width task description with writing area below
 * - Navigation between parts (configurable based on mode)
 * - Word count tracking
 * - Exam mode: forward only navigation
 * - Training mode: back and forth navigation
 */

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface WritingPanelProps {
  section: "writing";
  mode: "training" | "exam";
  testNumber: number;
}

// Task descriptions for each part
const taskDescriptions = {
  part1: {
    title: "Writing Task 1",
    description: "You should spend about 20 minutes on this task.",
    instruction: "Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWords: 150,
    topic: "",
  },
  part2: {
    title: "Writing Task 2",
    description: "You should spend about 40 minutes on this task.",
    instruction: "Write about the following topic:",
    minWords: 250,
    topic: "Some people believe that technology has made our lives more complicated. Others think it has made life easier. Discuss both views and give your own opinion.",
  },
};

export default function WritingPanel({ section, mode, testNumber }: WritingPanelProps) {
  const router = useRouter();
  
  // Current part state (1 or 2)
  const [currentPart, setCurrentPart] = useState<1 | 2>(1);
  
  // Writing content for each part
  const [part1Content, setPart1Content] = useState("");
  const [part2Content, setPart2Content] = useState("");
  
  // Word counts
  const [part1WordCount, setPart1WordCount] = useState(0);
  const [part2WordCount, setPart2WordCount] = useState(0);
  
  // Textarea refs for focus management
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Update word count when content changes
  useEffect(() => {
    const content = currentPart === 1 ? part1Content : part2Content;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    if (currentPart === 1) {
      setPart1WordCount(words);
    } else {
      setPart2WordCount(words);
    }
  }, [currentPart, part1Content, part2Content]);
  
  // Handle navigation between parts
  const handleNext = () => {
    if (currentPart === 1) {
      setCurrentPart(2);
    } else {
      // Finish button - submit or navigate away
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentPart === 2) {
      setCurrentPart(1);
    }
  };
  
  // Handle finish/submit
  const handleSubmit = () => {
    // For now, just navigate back to test selection
    // In production, this would save/submit the answers
    const confirmed = confirm("Are you sure you want to finish? Your answers will be saved.");
    if (confirmed) {
      router.push(`/${section}/${mode}`);
    }
  };
  
  // Get current content and setter based on part
  const currentContent = currentPart === 1 ? part1Content : part2Content;
  const setCurrentContent = currentPart === 1 ? setPart1Content : setPart2Content;
  const currentWordCount = currentPart === 1 ? part1WordCount : part2WordCount;
  const currentTask = currentPart === 1 ? taskDescriptions.part1 : taskDescriptions.part2;
  
  // Can go back? (always false in exam mode)
  const canGoBack = mode === "training";
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-white">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            IELTS Cambridge {testNumber} - {section.charAt(0).toUpperCase() + section.slice(1)} {mode === "training" ? "Training" : "Exam"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Part {currentPart} of 2
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Timer placeholder */}
          <div className="px-4 py-2 bg-[var(--surface-medium)] rounded-lg">
            <span className="text-[var(--text-primary)] font-mono">
              {currentPart === 1 ? "20:00" : "40:00"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {currentPart === 1 ? (
          /* Part 1: Split Layout */
          <div className="flex h-full">
            {/* Left Side - Task (33%) */}
            <div className="w-1/3 border-r border-[var(--border-subtle)] bg-[var(--surface-light)] overflow-y-auto">
              <div className="p-6">
                {/* Task Title */}
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {currentTask.title}
                </h2>
                
                {/* Time Instruction */}
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {currentTask.description}
                </p>
                
                {/* Placeholder Image */}
                <div className="w-full h-48 bg-[var(--surface-medium)] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                
                {/* Task Instruction */}
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {currentTask.instruction}
                </p>
                
                {/* Minimum Words */}
                <div className="mt-4 px-3 py-2 bg-[var(--surface-medium)] rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)]">
                    Minimum {currentTask.minWords} words
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Writing Area (67%) */}
            <div className="w-2/3 flex flex-col">
              <div className="flex-1 p-6">
                <textarea
                  ref={textareaRef}
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                  placeholder="Start writing your response here..."
                  className="w-full h-full p-4 resize-none border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--slate-gray)] bg-white text-[var(--text-primary)]"
                />
              </div>
              
              {/* Word Count */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">
                    Word Count
                  </span>
                  <span className={`font-semibold ${
                    currentWordCount >= currentTask.minWords 
                      ? "text-green-600" 
                      : "text-[var(--text-secondary)]"
                  }`}>
                    {currentWordCount} / {currentTask.minWords}+ words
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Part 2: Full Width Layout */
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Task Description - Top */}
            <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--surface-light)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {currentTask.title}
              </h2>
              
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {currentTask.description}
              </p>
              
              <p className="text-[var(--text-primary)] mb-4">
                {currentTask.instruction}
              </p>

              {/* Topic Box - Only show if topic exists */}
              {currentTask.topic && (
                <div className="p-4 bg-white border border-[var(--border-subtle)] rounded-lg">
                  <p className="text-[var(--text-primary)] leading-relaxed italic">
                    "{currentTask.topic}"
                  </p>
                </div>
              )}

              {/* Minimum Words */}
              <div className="mt-4 px-3 py-2 bg-[var(--surface-medium)] rounded-lg inline-block">
                <p className="text-sm text-[var(--text-secondary)]">
                  Minimum {currentTask.minWords} words
                </p>
              </div>
            </div>

            {/* Writing Area - Bottom */}
            <div className="flex-1 p-6">
              <textarea
                ref={textareaRef}
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="Start writing your essay here..."
                className="w-full h-[400px] p-4 resize-none border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--slate-gray)] bg-white text-[var(--text-primary)]"
              />
              
              {/* Word Count */}
              <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white border border-[var(--border-subtle)] rounded-lg">
                <span className="text-sm text-[var(--text-secondary)]">
                  Word Count
                </span>
                <span className={`font-semibold ${
                  currentWordCount >= currentTask.minWords 
                    ? "text-green-600" 
                    : "text-[var(--text-secondary)]"
                }`}>
                  {currentWordCount} / {currentTask.minWords}+ words
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[var(--border-subtle)] bg-white">
        {/* Previous Button */}
        {currentPart === 2 && canGoBack && (
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-medium)] rounded-lg transition-all duration-200"
          >
            <span>←</span>
            <span>Previous</span>
          </button>
        )}
        
        {/* Next/Finish Button */}
        <button
          onClick={handleNext}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg
            transition-all duration-200
            ${currentPart === 2 
              ? "bg-[var(--charcoal)] text-white hover:bg-[var(--charcoal)]/90" 
              : "bg-[var(--slate-gray)] text-white hover:bg-[var(--slate-gray)]/90"
            }
          `}
        >
          <span>{currentPart === 2 ? "Finish" : "Next"}</span>
          {currentPart === 1 && <span>→</span>}
        </button>
      </div>
    </div>
  );
}
