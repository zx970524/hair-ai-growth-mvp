import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/copywriting", label: "文案生成" },
  { href: "/titles", label: "标题生成" },
  { href: "/login", label: "登录" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-porcelain">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm font-bold text-white">
              AI
            </span>
            <span>
              <span className="block text-base font-bold text-ink">美发AI获客助手</span>
              <span className="block text-xs text-neutral-500">发型作品一键变成交内容</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-porcelain hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8">{children}</div>
    </main>
  );
}
