const { ai } = require("../config/ai");

exports.generateProposal = async (project) => {
    const prompt = `
You are an expert freelance software engineer.

Generate a professional proposal for the following project.

Title:
${project.title}

Description:
${project.desc}

Write:
- Greeting
- Short introduction
- Explain how you will solve the project
- Mention experience
- End professionally

Rules:
- Return plain text only.
- Do NOT use Markdown.
- Do NOT use **, __, #, *, -, >, or backticks.
- Do NOT use bullet points.
- Do NOT use numbered lists.
- Write in normal paragraphs.
- Use proper punctuation and line breaks only.

Keep it under 250 words.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
            { role: "user", text: prompt }
        ],
    });

    return response.text;
};