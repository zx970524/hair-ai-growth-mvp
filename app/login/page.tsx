"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { hasSupabaseBrowserConfig, supabaseBrowser } from "@/lib/supabase-client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!hasSupabaseBrowserConfig || !supabaseBrowser) {
      window.localStorage.setItem(
        "hair_ai_demo_user",
        JSON.stringify({ email, points: 20, createdAt: new Date().toISOString() })
      );
      setMessage("已进入演示模式：未配置 Supabase，登录信息已保存到本地浏览器。");
      setLoading(false);
      return;
    }

    const result =
      mode === "login"
        ? await supabaseBrowser.auth.signInWithPassword({ email, password })
        : await supabaseBrowser.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(mode === "login" ? "登录成功，可以返回首页。" : "注册成功，请按邮箱验证设置继续。");
    }

    setLoading(false);
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-6">
          <p className="text-sm font-semibold text-coral">{mode === "login" ? "欢迎回来" : "创建账号"}</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">
            {mode === "login" ? "登录美发AI获客助手" : "注册你的获客工作台"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            MVP 使用 Supabase Auth。未配置 Supabase 时，页面会进入本地演示模式，方便先体验业务流程。
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">
                邮箱
              </label>
              <input
                id="email"
                className="field"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                密码
              </label>
              <input
                id="password"
                className="field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                placeholder="至少 6 位"
                required
              />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
            </button>
          </form>

          {message && (
            <div className="mt-4 rounded-md border border-line bg-porcelain p-3 text-sm leading-6 text-neutral-700">
              {message}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-coral"
            >
              {mode === "login" ? "没有账号？去注册" : "已有账号？去登录"}
            </button>
            <Link href="/" className="text-neutral-500 hover:text-ink">
              返回首页
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-ink p-6 text-white shadow-soft">
          <h2 className="text-xl font-bold">MVP账号权益</h2>
          <div className="mt-5 space-y-4">
            {[
              "注册赠送 20 积分",
              "文案生成接口已预留真实 OpenAI 调用",
              "Supabase 用户、内容、积分表可直接建表",
              "支付接口先保留订单创建入口"
            ].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
