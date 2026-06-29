import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get("ticker");
  if (!ticker) return NextResponse.json({ error: "No ticker" }, { status: 400 });

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=2d`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const data = await res.json();
    const quote = data?.chart?.result?.[0];
    if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const meta = quote.meta;
    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose ? (change / prevClose) * 100 : 0;

    return NextResponse.json({
      name: meta.shortName || ticker,
      price,
      change,
      changePercent,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}