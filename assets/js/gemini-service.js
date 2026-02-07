import apiConfig from './api-config.js';

export const askGemini = async (prompt) => {
    try {
        const response = await fetch(apiConfig.gemini.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        return data.text || data.response;
    } catch (error) {
        console.error('Gemini service error:', error);
        throw error;
    }
};

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
        const jsonMatch = result.match(/\{.*\}/s);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Failed to parse AI response' };
    } catch (e) {
        return { error: e.message || 'AI service unavailable' };
    }
};
