const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateText(prompt) {
    console.log(prompt);
    

    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents:prompt
        });
        return response.text;
    }
    catch (error) {
        console.error("Error generating text:", error);
        throw error;
    }
}
    
module.exports = { generateText };