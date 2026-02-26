import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.ZAI_API_KEY) {
      console.error("❌ ZAI_API_KEY missing");
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const cleanMessages = messages
      .filter((m) => m.content && m.content.trim() !== "")
      .map((m) => ({
        role: m.role || "user",
        content: m.content,
      }));

    const response = await fetch(
      "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ZAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "glm-4-flash", // Try "glm-4" or "glm-4-flash" or "glm-4-0520"
          messages: [
            { role: "system", content: "You are Cortex AI." },
            ...cleanMessages,
          ],
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      console.error("❌ Zhipu API Error Detail:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
