"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";

const platforms = [
  { value: "xiaohongshu", label: "小红书", cost: 3 },
  { value: "douyin", label: "抖音", cost: 3 },
  { value: "moments", label: "朋友圈", cost: 2 },
  { value: "script", label: "短视频脚本", cost: 5 }
];

export default function CopywritingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    platform: "xiaohongshu",
    serviceType: "染发",
    city: "",
    audience: "想显白、显脸小的年轻女性",
    tone: "专业但亲切",
    sellingPoint: "",
    offer: "",
    notes: ""
  });

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    const response = await fetch("/api/generate/copywriting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      setError(data.message || "生成失败，请稍后重试。");
    } else {
      setResult(data.content);
    }
    setLoading(false);
  }

  const currentPlatform = platforms.find((item) => item.value === form.platform);

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-coral">AI文案生成</p>
              <h1 className="mt-2 text-3xl font-bold">生成平台营销文案</h1>
            </div>
            <div className="rounded-md bg-porcelain px-3 py-2 text-sm font-semibold text-ink">
              {currentPlatform?.cost || 3} 积分/次
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label">发布平台</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateField("platform", item.value)}
                    className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                      form.platform === item.value
                        ? "border-coral bg-coral text-white"
                        : "border-line bg-white text-neutral-600 hover:border-coral"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="serviceType">
                  项目类型
                </label>
                <select
                  id="serviceType"
                  className="field"
                  value={form.serviceType}
                  onChange={(event) => updateField("serviceType", event.target.value)}
                >
                  {["染发", "烫发", "剪发", "接发", "护理", "门店活动"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="city">
                  城市/商圈
                </label>
                <input
                  id="city"
                  className="field"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="例如：杭州滨江"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="audience">
                目标客群
              </label>
              <input
                id="audience"
                className="field"
                value={form.audience}
                onChange={(event) => updateField("audience", event.target.value)}
                placeholder="例如：上班族、大学生、圆脸女生"
              />
            </div>

            <div>
              <label className="label" htmlFor="tone">
                内容风格
              </label>
              <select
                id="tone"
                className="field"
                value={form.tone}
                onChange={(event) => updateField("tone", event.target.value)}
              >
                {["专业但亲切", "小红书种草", "抖音强钩子", "高端门店质感", "朋友圈熟人转化"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="sellingPoint">
                核心卖点
              </label>
              <textarea
                id="sellingPoint"
                className="field min-h-24"
                value={form.sellingPoint}
                onChange={(event) => updateField("sellingPoint", event.target.value)}
                placeholder="例如：显白发色、修饰脸型、不用每天打理、改造前后反差明显"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="offer">
                  活动优惠
                </label>
                <input
                  id="offer"
                  className="field"
                  value={form.offer}
                  onChange={(event) => updateField("offer", event.target.value)}
                  placeholder="例如：私信预约送护理"
                />
              </div>
              <div>
                <label className="label" htmlFor="notes">
                  补充信息
                </label>
                <input
                  id="notes"
                  className="field"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="例如：客单价、发型师称呼"
                />
              </div>
            </div>

            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "生成中..." : "生成文案"}
            </button>
          </form>
        </div>

        <div className="panel flex min-h-[520px] flex-col p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-moss">生成结果</p>
              <h2 className="mt-2 text-2xl font-bold">可直接复制发布</h2>
            </div>
            <button
              type="button"
              onClick={() => result && navigator.clipboard.writeText(result)}
              className="btn-secondary"
              disabled={!result}
            >
              复制
            </button>
          </div>
          <div className="mt-5 flex-1 rounded-md border border-line bg-porcelain p-4">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && !result && (
              <p className="text-sm leading-6 text-neutral-500">
                填写左侧信息后生成内容。未配置 OpenAI API Key 时会返回演示文案。
              </p>
            )}
            {result && <pre className="whitespace-pre-wrap text-sm leading-7 text-ink">{result}</pre>}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
