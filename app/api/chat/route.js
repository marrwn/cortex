import { createZhipu } from "zhipu-ai-provider";
import { streamText } from "ai";

const zhipu = createZhipu({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: "https://api.z.ai/api/paas/v4",
});

export const runtime = "edge";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: zhipu("glm-4-flashx-250414"),
      // SYSTEM ROLE INJECTION
      system: `You are Cortex AI, a high-performance, intelligent assistant integrated into this platform.
      Your personality is professional, slightly witty, and highly efficient.
      Keep your answers concise and scannable. Use Markdown for formatting.
      Never mention you are a 'language model' unless specifically asked—you are simply Cortex.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Cortex API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch AI" }), {
      status: 500,
    });
  }
}
