
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

Please format your response as a structured code review with these sections:
1. Overall Assessment
2. Code Quality and Style
3. Potential Issues
4. Performance Considerations
5. Suggestions for Improvement
`;

    console.log('Sending code review request to OpenAI...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert software engineer specializing in code review." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    console.log('Received response from OpenAI');
    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI review error:', error);
    return "Unable to generate AI review at this time. Please try again later. Error: " + error.message;
  }
};

module.exports = {
  getCodeReview
};
