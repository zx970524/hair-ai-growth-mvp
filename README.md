# 美发AI获客助手 MVP

面向美发店老板、美发总监、发型师的 AI 内容获客工具。当前 MVP 已完成中文 Web 界面、登录页、首页、文案生成页、标题生成页、Node API 路由、Supabase 接入封装和 OpenAI API 接入预留。

## 技术栈

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: Next.js Route Handlers, Node.js
- Database/Auth: Supabase
- AI: OpenAI Responses API
- Deploy: Vercel

## 已完成功能

- 首页工作台
- 登录/注册页面
- 文案生成页面
  - 小红书文案
  - 抖音文案
  - 朋友圈文案
  - 短视频脚本
- 爆款标题生成页面
- 文案生成 API
- 标题生成 API
- 支付订单接口预留
- Supabase 浏览器端和服务端客户端封装
- OpenAI API 未配置时的本地演示模式

## 线上地址

当前 MVP 已部署到 Vercel：

```text
https://ai-1-2-3-4-5.vercel.app
```

说明：当前线上环境未配置 Supabase 和 OpenAI 密钥，页面和接口会以演示模式运行。

## 项目结构

```text
.
├── app
│   ├── api
│   │   ├── generate
│   │   │   ├── copywriting
│   │   │   │   └── route.ts
│   │   │   └── title
│   │   │       └── route.ts
│   │   └── payments
│   │       └── create-order
│   │           └── route.ts
│   ├── copywriting
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── titles
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── app-shell.tsx
├── lib
│   ├── ai.ts
│   ├── supabase-admin.ts
│   └── supabase-client.ts
├── supabase
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

填写以下变量：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

NEXT_PUBLIC_APP_NAME=美发AI获客助手
```

说明：

- 未配置 `OPENAI_API_KEY` 时，生成接口会返回演示内容，方便本地跑通页面。
- 未配置 Supabase 时，登录页会进入本地演示模式。
- 生产环境必须在 Vercel 项目设置中配置真实环境变量。

## 本地启动

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问：

```text
http://localhost:3000
```

构建检查：

```bash
npm run build
npm run lint
```

## API 路由

生成文案：

```text
POST /api/generate/copywriting
```

生成标题：

```text
POST /api/generate/title
```

创建支付订单，当前为预留接口：

```text
POST /api/payments/create-order
```

## 部署到 Vercel

1. 将代码推送到 GitHub。
2. 打开 Vercel 控制台。
3. 点击 `Add New Project`。
4. 选择当前 GitHub 仓库。
5. Framework Preset 选择 `Next.js`。
6. 在 Environment Variables 中配置：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `NEXT_PUBLIC_APP_NAME`
7. 点击 `Deploy`。

部署完成后，Vercel 会生成线上访问地址。后续推送到 GitHub 默认分支后，Vercel 会自动重新部署。

## 下一步开发建议

- Supabase 数据表 SQL 和 RLS 策略
- 登录态保护和用户信息展示
- 积分余额、积分扣减、积分流水
- 生成历史页面
- 美发行业提示词库页面
- 视频上传、音频转写和关键帧提取
- 支付订单落库与微信/支付宝支付接入
- 后台管理页面
