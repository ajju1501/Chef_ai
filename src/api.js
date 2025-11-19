// import Anthropic from "@anthropic-ai/sdk"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba 
//     // for ANTHROPIC_API_KEY
//     apiKey:  import.meta.env.VITE_ANTHROPIC_API_KEY,

//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     console.log(msg.content[0].text)
//     return msg.content[0].text
// }

// const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//       console.log("apicall")
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         })
//         console.log(response.choices[0].message.content)
//         return response.choices[0].message.content
//     } catch (err) {
//         console.error(err.message)
//     }
// }



// const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;
  
    try {
      console.log("Calling Gemini API...");
  
      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash-001",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
  
      console.log("Full Gemini Response:", result);
  
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (!text) throw new Error("No text found in Gemini API response");
  
      console.log("Gemini Response Text:", text);
      return text;
    } catch (err) {
      console.error("Error from Gemini API:", err.message);
      return "Sorry, I couldn't generate a recipe.";
    }
  }
