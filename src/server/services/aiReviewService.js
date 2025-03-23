
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Get AI review of code
const getCodeReview = async (code, language) => {
  try {
    const prompt = `
Review the following ${language} code and provide constructive feedback:
- Code quality, readability, and style
- Potential bugs or errors
- Performance issues
- Suggestions for improvement

CODE:
\`\`\`${language}
${code}
\`\`\`

Please format your response as a structured code review.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert software engineer specializing in code review." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI review error:', error);
    return "Unable to generate AI review at this time. Please try again later.";
  }
};

module.exports = {
  getCodeReview
};
