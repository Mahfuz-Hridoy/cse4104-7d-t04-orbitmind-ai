# AI Prompt Documentation

This folder contains the prompt engineering strategies and system instructions used for the OrbitMind Gemini AI integration. 

## Prompt Engineering Strategy
We utilized rigorous System Prompting combined with Few-Shot constraints to force the Google Gemini LLM to output valid JSON structures. This prevents malformed UI rendering on the frontend.

* The exact system prompts can be found in our backend codebase at: `backend/utils/prompts.js`
* The multi-model fallback and API error handling logic is located at: `backend/services/geminiService.js`