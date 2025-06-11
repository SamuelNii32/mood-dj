import { config } from "dotenv";
import { OpenAI } from "openai";

config(); // Load .env variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMotivationalQuote(scenarioTitle) {
  try {
    const prompt = `Give me a short motivational quote for a footballer in this scenario: "${scenarioTitle}". Keep it inspiring and no more than 25 words.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if you're on the free tier
      messages: [
        {
          role: "system",
          content: "You are a motivational coach for elite footballers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 60,
      temperature: 0.8,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI quote generation failed:", error);
    return "Keep your head high. The game goes on.";
  }
}
