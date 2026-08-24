import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const leadData = await request.json()
    
    console.log("[v0] Received lead data:", leadData)

    // Add timestamp
    const dataWithTimestamp = {
      ...leadData,
      timestamp: new Date().toISOString(),
    }

    // Send to GoHighLevel webhook (server-side, no CORS issues)
    const res = await fetch(
      "https://services.leadconnectorhq.com/hooks/XucZS735rmKlbQTCy59O/webhook-trigger/6a565c5b-9b4a-41c0-9fef-65d497a92e03",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithTimestamp),
      }
    )

    const text = await res.text().catch(() => "")
    console.log("[v0] GoHighLevel response:", res.status, text)

    return NextResponse.json({
      success: true,
      ghl: { status: res.status, body: text },
    })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    )
  }
}
