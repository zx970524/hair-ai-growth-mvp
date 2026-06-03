import { NextResponse } from "next/server";
import { buildHairContext, generateText } from "@/lib/ai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const count = Number(body.count || 12);
    const pointsCost = 1;

    const context = buildHairContext({
      项目类型: body.serviceType,
      顾客痛点: body.painPoint,
      发型亮点: body.highlight,
      目标客群: body.audience,
      城市: body.city,
      标题风格: body.tone
    });

    const system = [
      "你是美发行业爆款标题策划专家。",
      "请生成中文短视频和小红书都可使用的标题。",
      "标题要真实、有点击欲望，不要使用医疗或绝对化承诺。"
    ].join("\n");

    const user = [
      `请生成 ${count} 个爆款标题。`,
      context,
      "要求：每个标题不超过 28 个汉字，优先突出改造效果、痛点、适合人群、反差感。"
    ].join("\n");

    const fallback = [
      "1. 脸型不流畅，试试这个层次剪",
      "2. 黄皮也能驾驭的显白发色",
      "3. 上班族低维护发型这样剪",
      "4. 头顶塌的人别再乱烫了",
      "5. 普通发型和氛围感只差这一步",
      "6. 适合圆脸姐妹的轻盈锁骨发",
      "7. 这款发色显白但不夸张",
      "8. 发量少也能有空气感",
      "9. 改完像换了个人的发型思路",
      "10. 第一次染发可以选这个方向",
      "11. 不想每天打理就这样剪",
      "12. 同城姐妹可以直接参考这款"
    ].slice(0, count).join("\n");

    const result = await generateText({ system, user, fallback });

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("generation_tasks").insert({
        type: "title",
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
