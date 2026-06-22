import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { mealDescription } = await req.json();

        if (!mealDescription) {
            return NextResponse.json(
                {
                    error: "Meal description is required",
                },
                {
                    status: 400,
                }
            );
        }

        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `
You are a nutrition expert.

Estimate the nutritional values for:

"${mealDescription}"

Return ONLY valid JSON.

No markdown.
No explanations.
No code fences.

{
  "mealName": "",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0,
  "confidence": 0
}
`,
            });

        const text = response.text?.trim();

        if (!text) {
            throw new Error(
                "No response from Gemini"
            );
        }

        // Remove markdown if Gemini ignores instructions
        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const nutrition =
            JSON.parse(cleanedText);

        return NextResponse.json(
            nutrition
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Failed to estimate meal",
            },
            {
                status: 500,
            }
        );
    }
}