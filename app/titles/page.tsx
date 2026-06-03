"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";

export default function TitlesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    serviceType: "染发",
    painPoint: "显黑、没气色、发型普通",
    highlight: "显白、修饰脸型、改造前后反差明显",
    audience: "想提升氛围感的女生",
    city: "",
    tone: "真实种草",
    count: "12"
  });

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    const response = await fetch("/api/generate/title", {
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

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-coral">爆款标题</p>
              <h1 className="mt-2 text-3xl font-bold">生成短视频标题</h1>
            </div>
            <div className="rounded-md bg-porcelain px-3 py-2 text-sm font-semibold text-ink">1 积分/次</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                <label className="label" htmlFor="count">
                  生成数量
                </label>
                <select
                  id="count"
                  className="field"
                  value={form.count}
                  onChange={(event) => updateField("count", event.target.value)}
                >
                  {["8", "12", "20"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label" htmlFor="painPoint">
                顾客痛点
              </label>
              <input
                id="painPoint"
                className="field"
                value={form.painPoint}
                onChange={(event) => updateField("painPoint", event.target.value)}
                placeholder="例如：显老、脸大、头顶塌、发色显黑"
              />
            </div>

            <div>
              <label className="label" htmlFor="highlight">
                发型亮点
              </label>
              <textarea
                id="highlight"
                className="field min-h-24"
                value={form.highlight}
                onChange={(event) => updateField("highlight", event.target.value)}
                placeholder="例如：层次轻盈、发色显白、自然不夸张、好打理"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="audience">
                  目标客群
                </label>
                <input
                  id="audience"
                  className="field"
                  value={form.audience}
                  onChange={(event) => updateField("audience", event.target.value)}
                />
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
                  placeholder="例如：上海徐汇"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="tone">
                标题风格
              </label>
              <select
                id="tone"
                className="field"
                value={form.tone}
                onChange={(event) => updateField("tone", event.target.value)}
              >
                {["真实种草", "强痛点", "改造反差", "高级审美", "同城获客"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "生成中..." : "生成标题"}
            </button>
          </form>
        </div>

        <div className="panel flex min-h-[520px] flex-col p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-moss">标题结果</p>
              <h2 className="mt-2 text-2xl font-bold">适合小红书/抖音</h2>
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
                输入作品痛点和亮点后生成标题。未配置 OpenAI API Key 时会返回演示标题。
              </p>
            )}
            {result && <pre className="whitespace-pre-wrap text-sm leading-7 text-ink">{result}</pre>}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
