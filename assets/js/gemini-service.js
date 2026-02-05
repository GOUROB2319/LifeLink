import apiConfig from './api-config.js';

/**
 * Send a prompt to Gemini AI and get a response
 * @param {string} prompt - The text prompt to send
 * @returns {Promise<string>} - The AI response text
 */
export const askGemini = async (prompt) => {
    try {
        const apiKey = apiConfig?.gemini?.apiKey;
        if (!apiKey || apiKey.includes('YOUR_GEMINI_API_KEY_HERE')) {
            throw new Error('Missing Gemini API key. Add your key in assets/js/api-config.js');
        }

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

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;

        console.error('Gemini API Error:', data);
        throw new Error('Gemini API returned an empty response.');
    } catch (error) {
        console.error('Gemini Fetch Error:', error);
        throw error;
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

    try {
        const result = await askGemini(prompt);
        // Attempt to parse JSON from AI response
        const jsonMatch = result.match(/\{.*\}/s);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Failed to parse AI response' };
    } catch (e) {
        return { error: e.message || 'AI service unavailable' };
    }
};
