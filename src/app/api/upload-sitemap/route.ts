import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      status: 405,
      error: "Invalid HTTP Method",
    });
  }

  const sitemap = await req.json();

  if (!sitemap) {
    return NextResponse.json({
      status: 400,
      error: "Sitemap required",
    });
  }

  const filePath = path.join(process.cwd(), "src", "app", "sitemap.xml");

  try {
    fs.writeFileSync(filePath, sitemap);
    return NextResponse.json({
      status: 200,
      message: "Uploaded sitemap",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: "Failed to upload sitemap",
    });
  }
}
