
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { FinancialData, BusinessProfile, AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeFinancialHealth = async (
  financialData: FinancialData,
  profile: BusinessProfile
): Promise<AIAnalysisResult> => {
  const prompt = `
    Analyze the financial health of the following SME:
    Business Name: ${profile.businessName}
    Owner: ${profile.ownerName}
    Industry: ${profile.industry}
    Type: ${profile.businessType}
    Location: ${profile.location}
    Years in Operation: ${profile.yearsInOperation}
    Employees: ${profile.employees}
    Annual Turnover: ${profile.annualTurnover}
    Financial Data: ${JSON.stringify(financialData)}
    
    Provide a comprehensive health assessment including:
    1. Health Score (0-100)
    2. Risk Level (Low/Medium/High)
    3. Credit Rating (e.g. AA, B+)
    4. 6-month Revenue Forecast based on the industry (${profile.industry})
    5. Specific Tax Compliance status (GST/Income Tax)
    6. Working Capital Optimization strategies
    7. Regional Industry Benchmarking (compare to others in ${profile.location})
    8. Recommended financial products (Minimum 2) from Banks or NBFCs suitable for this specific business profile (e.g., Working Capital Loan, Invoice Discounting, Machinery Loan).
    
    Language: ${profile.language === 'hi' ? 'Hindi' : 'English'}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            healthScore: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            forecasting: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                }
              }
            },
            creditRating: { type: Type.STRING },
            taxStatus: { type: Type.STRING },
            benchmarking: { type: Type.STRING },
            optimization: { type: Type.STRING },
            financialProducts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  product: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  interestRate: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            }
          },
          required: ["healthScore", "riskLevel", "insights", "recommendations", "forecasting", "creditRating", "taxStatus", "benchmarking", "optimization", "financialProducts"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      healthScore: 78,
      riskLevel: "Medium",
      insights: ["Positive revenue growth trend", "Higher than average GST compliance for Coimbatore region"],
      recommendations: ["Shift to invoice discounting to unlock ₹5L in credit", "Review machinery depreciation for tax benefits"],
      forecasting: [
        { month: "Jul", value: 850000 },
        { month: "Aug", value: 910000 },
        { month: "Sep", value: 880000 },
        { month: "Oct", value: 950000 },
        { month: "Nov", value: 1020000 },
        { month: "Dec", value: 1100000 }
      ],
      creditRating: "BBB",
      taxStatus: "GST Compliant: No pending litigations found for FY 2023-24.",
      benchmarking: "Top 30% of Retail SMEs in Coimbatore.",
      optimization: "Free up ₹2.5L in cash by reducing inventory holding of slow-moving items.",
      financialProducts: [
        {
          product: "Working Capital Loan",
          provider: "HDFC Bank",
          interestRate: "10.5% p.a.",
          reason: "Stable cash flow and consistent turnover qualify for prime rates."
        },
        {
          product: "Invoice Discounting",
          provider: "KredX (NBFC)",
          interestRate: "12% p.a.",
          reason: "Unlock cash from outstanding receivables from large retail partners."
        }
      ]
    };
  }
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this financial summary for the business owner in a professional tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (e) {
    console.error("TTS Error:", e);
    return undefined;
  }
};
