import Link from "next/link";
import { AppShell } from "@/components/app-shell";

const features = [
  { title: "小红书文案", desc: "生成种草感强、带话题标签的同城获客文案。" },
  { title: "抖音文案", desc: "生成强开头、强转化、适合短视频口播的文案。" },
  { title: "爆款标题", desc: "按改造前后、发色、脸型、痛点生成标题。" },
  { title: "提示词库", desc: "内置染发、烫发、剪发、护理、门店活动场景。" }
];

const stats = [
  { label: "注册赠送积分", value: "20" },
  { label: "MVP生成能力", value: "5类" },
  { label: "支付接口", value: "已预留" }
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-h-[420px] flex-col justify-between rounded-lg bg-ink p-8 text-white shadow-soft">
          <div>
            <p className="text-sm font-semibold text-gold">AI CONTENT GROWTH FOR SALONS</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
              把每一条发型作品，变成能获客的内容。
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              为美发店老板、美发总监和发型师设计，快速生成小红书、抖音、朋友圈和短视频脚本。
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/copywriting" className="btn-primary">
              开始生成文案
            </Link>
            <Link href="/titles" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink">
              生成爆款标题
            </Link>
          </div>
        </div>

        <div className="panel p-6">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-md border border-line bg-porcelain p-4">
                <div className="text-2xl font-bold text-ink">{item.value}</div>
                <div className="mt-1 text-xs text-neutral-500">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-md border border-line p-4">
                <h3 className="font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {["上传作品信息", "AI生成内容", "复制发布获客"].map((step, index) => (
          <div key={step} className="panel p-5">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-moss text-sm font-bold text-white">
              {index + 1}
            </div>
            <h2 className="mt-4 text-lg font-bold">{step}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {index === 0 && "选择平台、项目、客群和卖点，后续可接入视频上传和画面分析。"}
              {index === 1 && "API 会根据美发行业提示词生成结构化结果，并记录积分消耗。"}
              {index === 2 && "结果可用于小红书、抖音、朋友圈，也能沉淀到生成历史。"}
            </p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
