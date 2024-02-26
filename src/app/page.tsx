"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [sitemap, setSitemap] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/upload-sitemap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sitemap),
    });

    const data = await response.json();

    if (response.ok) {
      setSitemap("");
      alert(data.message);
    } else {
      alert(data.error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <h1>Sitemap Form</h1>

        <textarea
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
          rows={4}
          cols={50}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

