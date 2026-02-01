// API Configuration for External Services

const apiConfig = {
    gemini: {
        apiKey: "AIzaSyAgAbBqrtBUpBt-Tf4iNYeh7LjcDskefzg",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    },
    googleMaps: {
        apiKey: "", // Placeholder for future use
        libraries: ["places", "geometry"]
    }
};

export default apiConfig;
