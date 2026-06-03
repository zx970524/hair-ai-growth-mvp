import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const orderNo = `MVP${Date.now()}`;

  return NextResponse.json({
    ok: true,
    order: {
      orderNo,
      provider: body.provider || "reserved",
      amount: body.amount || 0,
      points: body.points || 0,
      status: "pending"
    },
    message: "支付接口已预留，后续可接入微信支付或支付宝。"
  });
}
