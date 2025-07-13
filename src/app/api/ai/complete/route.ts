import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = 'gpt-3.5-turbo', temperature = 0.7, maxTokens = 500 } = await req.json();

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens: maxTokens,
    });

    return NextResponse.json({ 
      completion: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('AI completion error:', error);
    return NextResponse.json(
      { error: 'Failed to generate completion' },
      { status: 500 }
    );
  }
}