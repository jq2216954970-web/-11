import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingCopy = async (promoType: string, productName: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "加入我们，享受优惠！（AI Key 缺失）";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please write a short, punchy, emoji-filled marketing slogan (max 20 characters) in Chinese for a ${promoType} promotion involving ${productName}. The tone should be exciting and promotional.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `${productName} 限时优惠！不要错过！`;
  }
};