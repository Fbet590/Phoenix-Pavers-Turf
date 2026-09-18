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
      "https://services.leadconnectorhq.com/hooks/rDrIW6TO5WawA7pvJ58H/webhook-trigger/a8ce3f5d-ad0f-4ca7-8e49-715a2cba62b0",
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
