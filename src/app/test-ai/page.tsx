"use client";

import { useState } from "react";

export default function TestAIPage() {
  const [result, setResult] = useState("");

  async function testAI() {
    const response = await fetch(
      "/api/estimate-meal",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          mealDescription:
            "Large chicken schnitzel burger and medium chips",
        }),
      }
    );

    const data =
      await response.json();

    setResult(
      JSON.stringify(
        data,
        null,
        2
      )
    );
  }
  

  return (
    <main className="p-8">
      <button
        onClick={testAI}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Test AI
      </button>

      <pre className="mt-4">
        {result}
      </pre>
    </main>
  );
}