import { NextResponse } from "next/server";
import { buildHairContext, generateText } from "@/lib/ai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const pointCostByPlatform: Record<string, number> = {
  xiaohongshu: 3,
  douyin: 3,
  moments: 2,
  script: 5
};

const platformNames: Record<string, string> = {
  xiaohongshu: "小红书",
  douyin: "抖音",
  moments: "朋友圈",
  script: "短视频脚本"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = String(body.platform || "xiaohongshu");
    const platformName = platformNames[platform] || "小红书";
    const pointsCost = pointCostByPlatform[platform] || 3;

    const context = buildHairContext({
      平台: platformName,
      项目类型: body.serviceType,
      城市: body.city,
      目标客群: body.audience,
      内容风格: body.tone,
      核心卖点: body.sellingPoint,
      活动优惠: body.offer,
      补充信息: body.notes
    });

    const system = [
      "你是资深美发行业新媒体运营专家。",
      "请用中文输出，内容要自然、有转化力、避免夸大承诺。",
      "面向美发店老板、美发总监、发型师使用。",
      "输出结构清晰，适合直接复制发布。"
    ].join("\n");

    const user = [
      `请生成一份${platformName}营销内容。`,
      context,
      "要求：",
      "1. 开头要抓住顾客痛点。",
      "2. 突出发型效果、适合人群和到店理由。",
      "3. 包含行动引导。",
      "4. 如果适合平台，请补充话题标签。"
    ].join("\n");

    const fallback = [
      `【${platformName}文案】`,
      "总觉得发型显脸大、没精神？这次改造重点不是盲目跟风，而是根据脸型、肤色和日常打理习惯重新设计。",
      "",
      "这款发型适合想提升气质、上班通勤也好打理的姐妹。发色显白，层次轻盈，拍照会更有轮廓感。",
      "",
      "想看自己适合什么发型，可以带照片到店沟通。私信发送“发型设计”，帮你先做初步建议。",
      "",
      "#发型设计 #同城美发 #显白发色 #发型改造"
    ].join("\n");

    const result = await generateText({ system, user, fallback });

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("generation_tasks").insert({
        type: "copywriting",
        input_payload: body,
        status: "completed",
        points_cost: pointsCost,
        model_name: result.model
      });
    }

    return NextResponse.json({
      ok: true,
      content: result.content,
      pointsCost,
      model: result.model,
      isDemo: result.isDemo
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "生成失败"
      },
      { status: 500 }
    );
  }
}
