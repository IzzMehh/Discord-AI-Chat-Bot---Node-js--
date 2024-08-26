import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

configDotenv()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generate(prompt) {
    try {
        let modifiedPrompt = prompt;
        modifiedPrompt = `Answer in Hinglish: ${prompt}`;
        modifiedPrompt = `Respond in a chatbot style: ${modifiedPrompt}`;

        const result = await model.generateContent(modifiedPrompt);
        const response = await result.response;
        const text = response.text();

        return text
    } catch (error) {
        console.log(error.message)
    }
}

export default generate