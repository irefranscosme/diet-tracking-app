import ollama from 'ollama';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    console.log('🚀 ~ tracker ~ message:', formData);
    const imageUrl = formData.get('imageUrl') as string;

    if (!imageUrl) {
        return NextResponse.json('Image invalid', { status: 400 });
    }

    const base64Image = imageUrl.replace(/^data:image\/\w+;base64,/, '');

    const imageBuffer = Buffer.from(base64Image, 'base64');
    console.log('🚀 ~ POST ~ imageBuffer:', imageBuffer);

    const res = await ollama.chat({
        model: 'llava',
        messages: [
            {
                role: 'user',
                content: `Please analyze the image and extract the nutritional information. Please explain also. Alwasy return the data in the following JSON format:
                        \`\`\`json
                            {
                            "calories": [value],
                            "protein": [value],
                            "carbohydrates": {
                                "total": [value],
                                "fiber": [value],
                                "sugars": [value]
                            },
                            "fat": {
                                "total": [value],
                                "saturated": [value],
                                "trans": [value]
                            },
                            "sodium": [value],
                            "cholesterol": [value],
                            "serving_size": [value],
                            "ingredients": [list_of_ingredients]
                            "explanation": [explain]
                            }
                        \`\`\`
                        Replace [value] with the corresponding numeric values and 0 if not available, and [list_of_ingredients] with the ingredients listed on the image. If any specific value is missing, return null for that field."`,
                images: [imageBuffer],
            },
        ],
        format: 'json',
    });

    return NextResponse.json(res, { status: 200 });
}
