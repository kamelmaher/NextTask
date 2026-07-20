const { GoogleGenAI } = require("@google/genai");

exports.ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
});