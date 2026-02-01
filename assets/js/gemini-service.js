import { apiConfig } from './config.js';

/**
 * Send a prompt to Gemini AI and get a response
 * @param {string} prompt - The text prompt to send
 * @returns {Promise<string>} - The AI response text
 */
export const askGemini = async (prompt) => {
    try {
        const response = await fetch(`${apiConfig.gemini.baseUrl}?key=${apiConfig.gemini.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Gemini API Error:', data);
            return 'Sorry, I couldn\'t process that request right now.';
        }
    } catch (error) {
        console.error('Gemini Fetch Error:', error);
        return 'An error occurred while connecting to the AI service.';
    }
};

/**
 * Match donor and recipient using Gemini
 * @param {Object} donor - Donor data
 * @param {Object} recipient - Recipient data
 * @returns {Promise<Object>} - Match analysis
 */
export const getAiMatchAnalysis = async (donor, recipient) => {
    const prompt = `
        Analyze the compatibility between a blood donor and a recipient:
        Donor: ${JSON.stringify(donor)}
        Recipient: ${JSON.stringify(recipient)}
        Provide a compatibility score (0-100), medical considerations, and urgency advice.
        Return as JSON format: { "score": number, "compatibility": "string", "advice": "string" }
    `;

    const result = await askGemini(prompt);
    try {
        // Attempt to parse JSON from AI response
        const jsonMatch = result.match(/\{.*\}/s);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Failed to parse AI response' };
    } catch (e) {
        return { error: 'Invalid AI response format' };
    }
};
