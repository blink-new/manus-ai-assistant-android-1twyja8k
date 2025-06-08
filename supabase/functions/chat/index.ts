import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import OpenAI from "npm:openai";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // Or "gpt-4.1" for more complex tasks
      messages: [
        { role: "system", content: "You are Manus, an AI assistant. Be helpful and concise." },
        { role: "user", content: message },
      ],
      max_tokens: 250, // Adjust as needed
    });

    const reply = completion.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
