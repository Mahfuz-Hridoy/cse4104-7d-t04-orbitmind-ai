'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─── Prompt Type Detection ────────────────────────────────────────────────────

const PROMPT_TYPES = Object.freeze({
  STUDY_PLAN:        'STUDY_PLAN',
  NOTE_SUMMARIZER:   'NOTE_SUMMARIZER',
  PRODUCTIVITY_AUDIT:'PRODUCTIVITY_AUDIT',
  CHATBOT:           'CHATBOT',
});

/**
 * Detects the intent of a prompt based on known keyword markers.
 * @param {string} prompt
 * @returns {string} One of PROMPT_TYPES
 */
const detectPromptType = (prompt) => {
  if (prompt.includes('Subject:'))  return PROMPT_TYPES.STUDY_PLAN;
  if (prompt.includes('Notes:'))    return PROMPT_TYPES.NOTE_SUMMARIZER;
  if (prompt.includes('Tasks:'))    return PROMPT_TYPES.PRODUCTIVITY_AUDIT;
  return PROMPT_TYPES.CHATBOT;
};

// ─── Mock Responses ───────────────────────────────────────────────────────────

const MOCK_NOTE = '(API key not configured — showing simulated response. Add GEMINI_API_KEY to backend/.env for live AI.)';

const getMockStudyPlan = (prompt) => {
  const match   = prompt.match(/Subject:\s*(.*)/);
  const subject = match ? match[1].trim() : 'Study Topic';

  return {
    estimatedCompletionTime: '3 weeks',
    weeklyRoadmap: [
      {
        weekNumber: 1,
        focus: `Foundation & Core Concepts of ${subject}`,
        dailyTasks: [
          { day: 'Day 1', task: 'Read introduction and basic chapters',                  hours: 2   },
          { day: 'Day 2', task: 'Summarise key terms and write definitions',              hours: 1.5 },
          { day: 'Day 3', task: 'Complete introductory quiz and practical exercises',     hours: 2   },
        ],
      },
      {
        weekNumber: 2,
        focus: 'Deep Dive & Advanced Application',
        dailyTasks: [
          { day: 'Day 4', task: 'Review intermediate topics and complex problem sets',   hours: 2.5 },
          { day: 'Day 5', task: 'Draft study notes and group-study check-in',            hours: 2   },
          { day: 'Day 6', task: 'Solve previous year exam questions',                    hours: 3   },
        ],
      },
    ],
    revisionSessions: [
      {
        sessionName:       'Final Mock Review',
        focus:             'Re-solve weak problems and time-trial tests',
        recommendedHours:  3,
      },
    ],
    smartRecommendations: [
      'Take a 5-minute break every 25 minutes using the Pomodoro technique.',
      'Focus on active recall instead of re-reading highlighted lines.',
      MOCK_NOTE,
    ],
  };
};

const getMockNoteSummary = () => ({
  title:   'Core Lecture Notes Summary',
  summary: 'This document covers primary definitions, contextual applications, and critical formulas required for assessment preparation.',
  bulletPoints: [
    'Primary concept defines the framework for all subsequent theories.',
    'Practical implementation requires resolving boundary conditions first.',
    'Optimisation relies heavily on active monitoring and adjustment.',
    MOCK_NOTE,
  ],
  keyConcepts: ['System Boundaries', 'Framework Configuration', 'Active Retrieval'],
});

const getMockProductivityAudit = () => ({
  productivityScore: 78,
  burnoutLevel:      'medium',
  burnoutWarning:    `You have a few high-priority items due. Keep an eye on task deadlines to prevent burnout. ${MOCK_NOTE}`,
  priorityAlerts:    ['Your upcoming assignments require close attention.'],
  recommendations: [
    'Schedule tasks evenly — avoid leaving projects to the final day.',
    'Complete shorter personal tasks first to build momentum.',
  ],
});

const getMockChatbotReply = (prompt) => {
  const lowerPrompt  = prompt.toLowerCase();
  const isTaskIntent = /\b(create|add|schedule)\b/.test(lowerPrompt);
  const hasTaskKeyword = /\b(task|assign|exam|study|project|due|tomorrow|monday|friday)\b/.test(lowerPrompt);

  const baseReply =
    `Hello! I am OrbitMind Coach — here to help you study smarter. ` +
    `Write any academic questions here. ${MOCK_NOTE}`;

  if (isTaskIntent && hasTaskKeyword) {
    const tomorrow = new Date(Date.now() + 86_400_000).toISOString().split('T')[0];
    return {
      reply: `${baseReply} I detected you want to schedule a task, so I have prepared one for you!`,
      taskToCreate: {
        title:          'Study session from Chat',
        description:    `Task automatically generated from message: "${prompt}"`,
        deadline:       tomorrow,
        priority:       'medium',
        category:       'study',
        estimatedHours: 2,
      },
    };
  }

  return { reply: baseReply };
};

/**
 * Returns a realistic mock response when the Gemini API is unavailable.
 * @param {string} prompt
 * @returns {object}
 */
const getMockResponse = (prompt) => {
  const type = detectPromptType(prompt);

  const handlers = {
    [PROMPT_TYPES.STUDY_PLAN]:         () => getMockStudyPlan(prompt),
    [PROMPT_TYPES.NOTE_SUMMARIZER]:    () => getMockNoteSummary(),
    [PROMPT_TYPES.PRODUCTIVITY_AUDIT]: () => getMockProductivityAudit(),
    [PROMPT_TYPES.CHATBOT]:            () => getMockChatbotReply(prompt),
  };

  return handlers[type]();
};

// ─── Gemini Client ────────────────────────────────────────────────────────────

let genAI = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.warn(
    '[aiService] WARNING: GEMINI_API_KEY is not set. ' +
    'Running in mock mode — add the key to backend/.env for live AI responses.'
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * Sends a prompt to Gemini and returns a parsed JSON response.
 * Falls back to mock data if the API is unavailable or returns invalid JSON.
 *
 * @param {string} systemInstruction - The system-level instruction for the model.
 * @param {string} prompt            - The user prompt to send.
 * @returns {Promise<object>}        - Parsed JSON response object.
 * @throws {TypeError}               - If either argument is not a non-empty string.
 */
const generateJSONContent = async (systemInstruction, prompt) => {
  if (typeof systemInstruction !== 'string' || !systemInstruction.trim()) {
    throw new TypeError('generateJSONContent: "systemInstruction" must be a non-empty string.');
  }
  if (typeof prompt !== 'string' || !prompt.trim()) {
    throw new TypeError('generateJSONContent: "prompt" must be a non-empty string.');
  }

  // No API key — use mock directly
  if (!genAI) {
    return getMockResponse(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result   = await model.generateContent(prompt);
    const text     = result.response.text();
    return JSON.parse(text);

  } catch (error) {
    console.error('[aiService] Gemini API error — falling back to mock:', error.message);
    return getMockResponse(prompt);
  }
};

module.exports = {
  generateJSONContent,
  // Exported for unit testing
  getMockResponse,
  detectPromptType,
  PROMPT_TYPES,
};
