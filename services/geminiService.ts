
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The question text in Arabic.",
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 4 possible answers in Arabic.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The correct answer from the options array, in Arabic.",
      },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

export const generateQuizQuestions = async (category: string): Promise<QuizQuestion[]> => {
  try {
    const prompt = `
      أنشئ 5 أسئلة للمسابقة باللغة العربية للأطفال الذين تتراوح أعمارهم بين 9 و 12 عامًا في المملكة العربية السعودية.
      يجب أن تكون الأسئلة حول موضوع: "${category}".
      يجب أن يكون لكل سؤال 4 خيارات، مع تحديد الإجابة الصحيحة.
      يجب أن تكون الأسئلة ممتعة وتعليمية ومناسبة ثقافيًا.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);

    // Validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Invalid question format received from API.");
    }

    return questions as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // Fallback to dummy data in case of API error
    return [
        { question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "الدمام", "مكة"], correctAnswer: "الرياض" },
        { question: "ما هو الكوكب الأحمر؟", options: ["الأرض", "المريخ", "زحل", "المشتري"], correctAnswer: "المريخ" },
    ];
  }
};
