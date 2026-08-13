# SunVolt Energy + SJ DOORS — Codex 接管文档

> 这份文档用于在更换 Codex 账号/对话丢失时，让新 Codex 快速接管全部工作。
> 使用方法：新对话开始时，直接把本文件内容粘贴给 Codex，或让 Codex 读取本文件。

---

## 1. 项目总览

| 网站 | 域名 | 类型 | 技术栈 |
|------|------|------|--------|
| SunVolt Energy | sunvolt.aluferdoors.com | 储能电源 B2B | 静态 HTML/CSS/JS + Cloudflare Pages |
| SJ DOORS | aluferdoors.com | 门窗制造 | WordPress + Elementor + Astra |

SunVolt 是主打产品：39 款便携式电源（300W-1100W）、太阳能板、配件。B2B 批发为主，也做 C 端零售。

---

## 2. 关键账号与凭证

### Cloudflare（部署）
- 账号 ID: `12a9f1a1cecb9c09810c089fc8277d76`
- API Token: (保存在微信/密码管理器，不在文档里)
- Pages 项目: `sunvolt-energy`
- 域名: `sunvolt.aluferdoors.com`（绑定在 Pages 项目上）

### GitHub
- 仓库: `yixiao1221/sunvolt-energy-site`（main 分支）
- 仓库是公开的，但 push 需要写权限 token
- Token: git remote 里嵌入的旧 PAT 已于 2026-08-13 失效，需用户提供新 PAT（scope: repo）
- 本地提交已推进到 `4b2dc0c`，等新 token 后执行 `git push origin main`

### Google Analytics 4
- 属性 ID: `542483561`
- 正确测量 ID: `G-0YC6YQMSW4`
- 服务账号: `ga4-reader@gentle-post-477904-u0.iam.gserviceaccount.com`
- 服务账号 JSON: `C:\Users\83729\Downloads\gentle-post-477904-u0-07ff6805bc64.json`
- 数据 API 用法: 用服务账号 JWT → runReport 查询属性 542483561

### 收款
- USDT (TRC-20): `TMhc4HFFpXCNNSSVfbYYPjyHNH19e4UmQ2`（在 checkout.html）
- PayPal / 银行转账：见 checkout.html

### 其他
- WordPress 后台（门窗站）: `yixiao1221@outlook.com`（administrator）
- 登录方式: 会话 cookie 保存在 `wp_cookies.txt`，nonce 保存在 `wp_nonce.txt`
- 注意: 该站 Application Passwords 被主机/插件禁用，后台没有"应用程序密码"选项，旧的应用密码已失效；用 cookie + X-WP-Nonce 操作 REST API

---

## 3. 本地文件位置

```
C:\Users\83729\Documents\New project AI文件夹\
├── sunvolt-energy\          # SunVolt 网站源码（Git 仓库）
│   ├── index.html           # 首页
│   ├── products.html        # 产品页（39 款）
│   ├── checkout.html        # 结算页（USDT 收款）
│   ├── css\style.css        # 全部样式
│   ├── js\tracking.js       # GA4 转化追踪
│   ├── images\              # 压缩后图片（约 1.5MB）
│   └── HANDOFF.md           # 本文件
```

---

## 4. 部署流程（重要！）

> 不要用 Cloudflare Dashboard 的 GitHub 集成（之前坏过多次）。
> 使用 Wrangler CLI 直接部署。

```powershell
cd "C:\Users\83729\Documents\New project AI文件夹"

# 设置环境变量
$env:CLOUDFLARE_API_TOKEN = "你的CloudflareToken"
$env:CLOUDFLARE_ACCOUNT_ID = "12a9f1a1cecb9c09810c089fc8277d76"

# 部署
& "C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" `
  "node_modules\wrangler\bin\wrangler.js" `
  pages deploy "sunvolt-energy" --project-name sunvolt-energy --branch main
```

如果 `node_modules\wrangler` 不存在，先安装：
```powershell
cd "C:\Users\83729\Documents\New project AI文件夹"
& "C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" add wrangler
```

部署后用 `curl https://sunvolt.aluferdoors.com` 验证 200。

### 修改代码流程
1. 修改本地文件
2. `git add -A && git commit -m "说明" && git push origin main`
3. 用 Wrangler 部署
4. 验证线上

---

## 5. 重要历史经验（踩过的坑）

1. **按钮点击无效**：之前 `.btn-primary` 类导致按钮不可点击，最终用**内联样式 + `<a>` 标签**解决，不要用 CSS 类控制按钮跳转。
2. **GA4 追踪 ID 错误**：最初用了 `G-0BJ4JKZPC7`（错误），正确是 `G-0YC6YQMSW4`。改 ID 时要在**全部 18 个 HTML 文件**里替换。
3. **CSS 缓存**：改 CSS 后要更新 HTML 里的 `style.css?v=XX` 版本号，否则浏览器用旧缓存。
4. **`.s-dark` 背景问题**：`.s-dark` 必须用深色背景（`#0a1428`），不能继承 `--bg`（浅灰）。
5. **图片压缩**：已把 27.5MB 压缩到 1.5MB，PNG 无透明度的已转 JPG（HTML 引用已更新）。
6. **不要用 Cloudflare Dashboard GitHub 集成**：之前多次断连，改用 Wrangler 后稳定。
7. **自定义域名 SSL**：删除重加 Pages 项目后，自定义域名需要重新绑定，SSL 证书要等几分钟。
8. **PowerShell 内联 Python 问题**：在 PowerShell 里运行含双引号的 Python 代码会被解析错误，必须把 Python 脚本写成 .py 文件再执行。

---

## 6. 当前状态（2026-08-13）

### 已完成
- ✅ 全部按钮可用（内联样式方案）
- ✅ 文字对比度修复（深色区域/白字/金标题）
- ✅ GA4 正确 ID + 转化事件（whatsapp_click、cta_click、form_submit、begin_checkout、purchase）
- ✅ 图片压缩（27.5MB → 1.5MB）
- ✅ Hero 全屏（min-height:100vh）+ 容器 1400px
- ✅ 产品卡文字黑色
- ✅ FAQ 答案金色
- ✅ SEO 基础完整（18 页标题/描述/canonical/JSON-LD）
- ✅ sitemap.xml + robots.txt
- ✅ URL 统一为无 .html 的干净地址（canonical/内链/sitemap，2026-08-13 已用 Wrangler 部署上线并验证）
- ✅ robots.txt 开头的 BOM 已移除
- ✅ 门窗站 WordPress 后台可编辑（cookie + nonce 会话，已验证 administrator 权限）
- ✅ Cloudflare 部署通道验证通过（token 在本地 `check_deploy.py`，访问 api.cloudflare.com 需开全局代理）

### 待办
- ⏳ Meta Pixel（等用户创建 FB Business 账号后提供 15 位 Pixel ID）
- ⏳ Google Ads 转化代码（如果用户要投 Google Ads）
- ⏳ GA4 里把 whatsapp_click/form_submit 标记为关键事件（用户手动操作）
- ⏳ Facebook 广告投放（用户计划投 FB）
- ⏳ GitHub 新 PAT（旧 token 失效，本地提交 `4b2dc0c` 及之前的 `sync` 提交尚未推送）
- ⏳ 门窗站 AIOSEO 与 Rank Math 同时激活（首页 meta/sitemap 实际由 Rank Math 输出），需决定保留哪一个，避免 SEO 冲突

---

## 7. 新 Codex 对话开场白模板

> 请读取 `C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy\HANDOFF.md`，这是网站管理文档。
> 我需要你继续管理 SunVolt 和门窗网站。当前任务是：______（描述你要做的事）

或者直接粘贴 HANDOFF.md 内容。

---

## 8. 常用工具路径

```powershell
# Python
"C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

# Node.js
"C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

# Wrangler（需要先 pnpm add wrangler）
"C:\Users\83729\Documents\New project AI文件夹\node_modules\wrangler\bin\wrangler.js"

# pnpm
"C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"

# Git（如果 PATH 没有）
"C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe"
```

---

## 9. GA4 数据查询方法

用服务账号 JSON 获取 OAuth token，然后调用：
```
POST https://analyticsdata.googleapis.com/v1beta/properties/542483561:runReport
```
可查询：sessions、users、pageViews、channels、countries、hostname 等。

参考脚本：`C:\Users\83729\Documents\New project AI文件夹\seo_audit.py`

---

## 10. 门窗网站（WordPress）

- 域名: aluferdoors.com
- 平台: WordPress + Elementor + Astra
- SEO 插件: AIOSEO 与 Rank Math **同时激活**（首页 meta 与 sitemap 实际由 Rank Math 输出）
- GA4: 已检测到 Google Site Kit 注入的 `GT-5786T895`，数据确认进入属性 `542483561`
- 后台: `yixiao1221@outlook.com`（administrator），用 `wp_cookies.txt` + `wp_nonce.txt` 操作
- 主要用途: 门窗业务展示 + SunVolt 关联推荐
