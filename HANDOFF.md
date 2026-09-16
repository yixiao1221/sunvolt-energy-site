# SunVolt Energy + SJ DOORS — Codex 接管文档

> 这份文档用于在更换 Codex 账号/对话丢失时，让新 Codex 快速接管全部工作。
> 使用方法：新对话开始时，直接把本文件内容粘贴给 Codex，或让 Codex 读取本文件。
> 电脑坏了时：在新电脑安装 Git + Node + Codex，clone GitHub 仓库后继续读取本文件。

---

## 1. 项目总览

| 网站 | 域名 | 类型 | 技术栈 |
|------|------|------|--------|
| SunVolt Energy | sunvoltglobal.com | 储能电源 B2B | 静态 HTML/CSS/JS + Cloudflare Pages |
| SJ DOORS | aluferdoors.com | 门窗制造 | WordPress + Elementor + Astra |

SunVolt 是主打产品：39 款便携式电源（300W-1100W）、太阳能板、配件。B2B 批发为主，也做 C 端零售。

已扩展第二条产品线：
- 便携式电源：`products.html`
- 别墅 / 商业 / 离网 / 混网一体式太阳能储能：`solar-solutions.html`
- 首页已经放了“Integrated Solar Storage”入口和逆变器/蓄电池图。

**多语言与市场结构**（2026-09 完成）

| 范围 | 路径 | 说明 |
|------|------|------|
| 英文主站 | `/` | 全球总站，承接自然搜索和品牌 |
| 国家落地页 | `/ng`、`/sa` | 尼日利亚、沙特，含本地化定价与物流说明 |
| 俄语 | `/ru/` | 5 个核心页 + 博客中心 + 2 篇文章 |
| 阿拉伯语 | `/ar/` | RTL 布局，同上 |
| 法语 | `/fr/` | 同上 |
| B 端批发 | `/wholesale` | 全球批发主入口，MOQ 20 |

**定价策略**：B 端报 EXW/FOB；C 端按国家分层，零售价包含运费并按当地物流成本调整。

**增长渠道**：FB 投放当前月预算 ¥3,000-4,000，加人成本 ¥30-60，成交率 5-7%。
下一步重点是转向 B 端人群、提高客单价，而不是单纯加大预算。

---

## 2. 关键账号与凭证

### Cloudflare（部署）
- 账号 ID: `12a9f1a1cecb9c09810c089fc8277d76`
- API Token: 在本地 `C:\Users\83729\Documents\New project AI文件夹\check_deploy.py` 里
- Pages 项目: `sunvolt-energy`
- 域名: `sunvoltglobal.com`（绑定在 Pages 项目上）
- 注意: 本机访问 api.cloudflare.com 需开全局代理（2026-08-13 已验证可通）

### GitHub
- 仓库: `yixiao1221/sunvolt-energy-site`（main 分支）
- 仓库是公开的，但 push 需要写权限 token
- Token: git remote 里嵌入的 PAT 已于 2026-08-13 更新（scope: repo，有效期至 2026-11-11）
- 本地与远程已同步（HEAD `06feb82`）

### Google Analytics 4
- 属性 ID: `542483561`
- 正确测量 ID: `G-0YC6YQMSW4`
- 服务账号: `ga4-reader@gentle-post-477904-u0.iam.gserviceaccount.com`
- 服务账号 JSON: `C:\Users\83729\Downloads\gentle-post-477904-u0-07ff6805bc64.json`
- 数据 API 用法: 用服务账号 JWT → runReport 查询属性 542483561

### Yandex Metrika
- Counter ID: `112582253`
- 全站已接入 `js/yandex-metrika.js`
- 已同步事件：`whatsapp_click`、`generate_lead`、`form_submit`、`checkout_click`、`cta_click`、`contact_click`

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
│   ├── index.html           # 首页（含一体式储能板块）
│   ├── products.html        # 便携式产品页（39 款）
│   ├── solar-solutions.html # 别墅/商业/离网/混网一体式储能页
│   ├── ng.html / sa.html    # 尼日利亚 / 沙特国家落地页（含本地化定价）
│   ├── blog-*.html          # 英文博客文章
│   ├── ru\                  # 俄语：5 个核心页 + blog.html + 2 篇俄语文章
│   ├── ar\                  # 阿拉伯语（RTL）：5 个核心页 + blog.html + 2 篇阿语文章
│   ├── fr\                  # 法语：5 个核心页 + blog.html + 2 篇法语文章
│   ├── checkout.html        # 结算页（USDT 收款）
│   ├── css\style.css        # 全部样式（引用时带 ?v=NN 缓存版本号）
│   ├── js\tracking.js       # GA4 + 跨平台转化事件
│   ├── js\yandex-metrika.js # Yandex Metrika 事件上报
│   ├── images\              # 压缩后图片（约 1.5MB）
│   ├── videos\              # 工厂/产品视频（H.264 MP4）
│   ├── tools\submit_indexnow.js   # 部署后提交 sitemap 给 IndexNow / Bing / Yandex
│   ├── functions\_middleware.js   # 旧域名 301 跳转
│   ├── DEPLOY.md            # 部署手册
│   └── HANDOFF.md           # 本文件
```

> 部署根目录就是 `sunvolt-energy\`，所以**不要在里面留临时文件或半成品**（会直接被发布到线上）。
> 临时脚本一律放上一层目录。

---

## 4. 部署流程（重要！）

> 不要用 Cloudflare Dashboard 的 GitHub 集成（之前坏过多次）。
> 使用 Wrangler CLI 直接部署。

> ⚠️ **必须在 `sunvolt-energy` 目录内部执行部署命令。**
> Wrangler 从「当前工作目录」查找 `functions/` 文件夹；在上层目录运行会导致
> Pages Functions 不参与编译，线上静默丢失「旧域名 301」和「内部文档屏蔽」两项功能。
> 2026-09-15 发现这个坑 —— 之前记录的 301 其实一直没生效。

```powershell
cd "C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy"

# 设置环境变量
$env:CLOUDFLARE_API_TOKEN = "你的CloudflareToken"
$env:CLOUDFLARE_ACCOUNT_ID = "12a9f1a1cecb9c09810c089fc8277d76"

# 部署（注意目录参数是 "."）
& "C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" `
  "..\node_modules\wrangler\bin\wrangler.js" `
  pages deploy "." --project-name sunvolt-energy --branch main
```

**部署成功的标志**：输出里同时出现
`✨ Compiled Worker successfully` 和 `✨ Uploading Functions bundle`。
只有静态文件上传、没有 Functions bundle，就说明中间件没进去。

**部署后自检三项**：

| 检查 | 预期 |
|------|------|
| `https://sunvoltglobal.com/` | 200 |
| `https://sunvolt.aluferdoors.com/` | 301（跳转到主域名并保留路径）|
| `https://sunvoltglobal.com/HANDOFF.md` | 410（内部文档不可公开访问）|

如果 `node_modules\wrangler` 不存在，先安装：
```powershell
cd "C:\Users\83729\Documents\New project AI文件夹"
& "C:\Users\83729\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" add wrangler
```

部署后用 `curl https://sunvoltglobal.com` 验证 200。

### 修改代码流程
1. 修改本地文件
2. `git add -A && git commit -m "说明" && git push origin main`
3. 用 Wrangler 部署
4. 验证线上

### 新文章发布后提交搜索引擎
IndexNow key: `3f9c7b2e84a14d6fa5c8e0b71d2f4936`
Key file: `https://sunvoltglobal.com/3f9c7b2e84a14d6fa5c8e0b71d2f4936.txt`

部署后运行：
```powershell
cd "C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy"
node tools\submit_indexnow.js
```

脚本会读取 `sitemap.xml`，把全部 URL 提交给 IndexNow、Bing 和 Yandex。

---

## 5. 重要历史经验（踩过的坑）

### 5.1 按钮点击无效（2026-07-27 查明，原因和最初判断不同）

**真正的根因**：首页 Hero 区的装饰元素 `.hero-bg`（`<div class="hero-bg">`）铺满整个页面，
把所有按钮都盖在下面，物理点击到不了按钮。

**怎么查出来的**：在浏览器 Console 用 `document.elementFromPoint(x, y)` 取按钮中心坐标上的元素，
返回的是 `.hero-bg` 而不是按钮。这一步是决定性证据 —— 之前试过的所有改法
（换 `<a>`、加 onclick、`window.location.replace`、改 `<form>`+`<button>`）全都没用，
因为问题从来不在按钮本身。

**修复**：给 `.hero-bg` 加 `pointer-events:none`。

**教训**：
- 页面上任何 `position:absolute` 或 `fixed` 的装饰层，都要加 `pointer-events:none`。
- 遇到"按钮点不动"，先用 `elementFromPoint` 确认点击落在哪个元素上，不要盲改按钮写法。
- 另一个参考现象：代码 `.click()` 能跳转、手动点击不能 → 基本可以确定是遮罩层拦截。

### 5.2 脚本批量替换曾清空 19 个 HTML 文件（2026-08-16）

用一行字符串替换批量处理 HTML 时写错，把 19 个文件全部清空。
靠 Git 立即恢复，没有丢内容。

**教训**：批量改文件前必须先 commit；替换脚本要先在单文件上试，确认无误再全量跑。

### 5.3 其他技术坑

1. **GA4 追踪 ID**：最初用了 `G-0BJ4JKZPC7`（错误），正确的是 `G-0YC6YQMSW4`。
2. **CSS 缓存**：改 CSS 后必须同步更新 HTML 里的 `style.css?v=XX` 版本号，否则浏览器用旧缓存。
3. **`.s-dark` 背景**：必须显式用深色背景，不能继承 `--bg`（浅灰），否则白字白底看不清。
4. **深色区文字撞色**：`section-title h2` 是金底深蓝字，进了深色区容易被通用规则覆盖成"金底白字"；
   白卡片里的 `h3`/`p` 也容易被覆盖成白字。改深色板块时要单独覆盖回来。
5. **`.blog-body a` 颜色覆盖按钮**：文章里的链接颜色规则会把黄色按钮文字也染成黄色，黄底黄字看不见。
   按钮文字要用更具体的选择器强制成深蓝 `#0F2140`。
6. **不要用 Cloudflare Dashboard 的 GitHub 集成**：断连过多次，改用 Wrangler CLI 后稳定。
7. **自定义域名 SSL**：删除并重建 Pages 项目后，自定义域名要重新绑定，证书要等几分钟。
8. **PowerShell 内联 Python**：含引号的 Python 代码在 PowerShell 里会被解析错误，必须写成 `.py` 文件再执行。
9. **Cloudflare API 需要全局代理**：本机不挂代理访问 `api.cloudflare.com` 会失败。
10. **Rank Math 的 SEO meta 无法通过 REST API 写入**：官方限制。文章特色图可以用 API 设，
    但 SEO title/description 只能在 WordPress 后台手填。
11. **Wrangler 部署必须 cd 进项目目录**：`functions/` 是按「当前工作目录」查找的。
    从上层目录部署时，中间件不会编译进去，而且**不会报错**——线上静默失效。
    检查方法：部署输出里有没有 `Uploading Functions bundle`。
12. **Cloudflare Pages 里静态文件优先级高于 `_redirects`**：已有的文件无法用 `_redirects` 拦掉，
    必须用 `functions/_middleware.js`。`.assetsignore` 是 Workers Assets 的功能，Pages 不认。

### 5.4 对话被工具调用错误卡死（2026-09-15）

**现象**：对话突然完全不能用了，发任何消息都在 0.3 秒内失败，
报 `No tool output found for tool call ...`，而且**无法修复**。

**原因**：一次性并行读取 6 张 390×5000 的超长截图，其中 4 张没有返回结果。
对话历史是只读的，这段"发起了但没有结果"的记录会一直留在历史里，
之后每一轮请求都会因为这段残缺记录被接口拒绝。

**教训**：
- 读图**一次最多 2 张**，看完再读下一批。
- 截图单张高度控制在 2000px 以内，整页要分段截。
- 不要一次并行发起 3 个以上的重型调用。
- 一旦发现工具调用没返回结果，立刻停手，另开新对话，不要硬撑重试。

### 5.5 关于欠费

这个对话期间发生过**两次真实的 API 余额不足**（402 Payment Required）。
充值后即可恢复。注意区分：402 是欠费，`systemError` 里的工具调用错误不是欠费，充值也救不回来。

---

## 6. 当前状态（2026-09-15）

### 已完成（主站与产品线）
- ✅ SunVolt 主页修复全屏布局（错误 `tion>` 已改回 `</section>`）
- ✅ 2026-09-12 完成流量优化：www/旧域名 301、pages.dev noindex、GA4 线索和滚动追踪 v3、批发页和一体式储能页 SEO/内链增强
- ✅ 2026-09-12 新增俄语第一版：`/ru/`、`/ru/products`、`/ru/solar-solutions`、`/ru/wholesale`、`/ru/contact`，含语言切换和 hreflang
- ✅ 2026-09-12 新增阿拉伯语第一版：`/ar/` 五个核心页面，包含 RTL 布局、EN/RU/AR 切换和 hreflang
- ✅ 2026-09-12 新增法语第一版：`/fr/` 五个核心页面，语言切换统一为 EN / RU / AR / FR
- ✅ 2026-09-12 新增地区文章：尼日利亚商业储能、俄罗斯家庭/别墅储能、沙特别墅储能、西非商业储能
- ✅ 2026-09-12 新增便携式电源地区文章：尼日利亚、俄罗斯、沙特、西非
- ✅ 2026-09-14 新增俄语/阿拉伯语/法语博客中心，修正首页、国家页和文章的长标题/描述问题
- ✅ 第二条产品线 `solar-solutions` 已上线：Villa / Commercial / Off-Grid / Hybrid
- ✅ 逆变器 + 蓄电池图片已加入主页和 Solar Solutions 页（`images/ess-inverter.jpg`、`images/ess-battery.jpg`）
- ✅ 全站导航、首页、产品页、sitemap 已加一体式储能入口
- ✅ 门窗站联系号码已统一为 `+86 18025872071`（页头/WhatsApp/联系方式页）
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
- ✅ SunVolt cta_click 修复：内联样式按钮现在也能触发（tracking.js v2，2026-08-13 上线）
- ✅ 新增 B2B 文章 `blog-import-power-stations-china`（已上线/进 sitemap）
- ✅ 修复 5 篇旧博客 JSON-LD headline 复制错误 + blog 列表页漏卡问题

### 2026-09-14 ~ 09-15 新增
- ✅ Yandex Webmaster 完成验证（HTML 文件 + meta 标签双重），sitemap 已提交
- ✅ Yandex Metrika 全站接入（Counter ID `112582253`），8 个俄语页面已提交重抓
- ✅ Yandex 侧建立 7 个转化目标：`whatsapp_click`、`generate_lead`、`form_submit`、
  `checkout_click`、`cta_click`、`contact_click`、`view_checkout`
- ✅ IndexNow 自动提交脚本 `tools/submit_indexnow.js`（提交给 IndexNow / Bing / Yandex）
- ✅ `robots.txt` 增加 Yandex 抓取与 sitemap 规则
- ✅ 扩写 6 篇多语言博客到目标长度（尼日利亚 ×2、俄罗斯 ×2、沙特 ×2）：
  英文/俄文 1000-1400 词，阿语 800-1100 词；每篇补了选型计算表、FAQ 结构化数据、
  产品型号段落和产品内链
- ✅ 修复 RTL / 西里尔文页面署名行 "SunVolt Energy" 中间断行（改用 `&nbsp;`）
- ✅ 门窗站 `/shop/` 空壳修复：根因是页面用 SureCart 列表、产品却建在 WooCommerce，
  已改为 WooCommerce 产品列表
- ✅ 门窗站 15 篇文章补真实特色图（媒体库工厂/装柜/产品图）
- ✅ 门窗站 3 篇最薄文章重写（13 词 → 662 词，43 词 → 664 词，19 词 → 434 词）
- ✅ 全屏视频背景方案已回退（观感差），改为独立的 16:9 视频展示区
- ✅ 工厂视频压缩：96MB → 14MB，转为 H.264 MP4

### 2026-09-15 下午新增（Codex 接管后）
- ✅ 扩写 SunVolt 剩余 10 篇偏薄博客，现全部 18 篇 ≥800 词：
  - 法语：西非便携电源 266→1342、西非储能 495→1518
  - 英文：选购 430→1300、维护 449→1128、非洲市场 488→999、电池技术 523→973、
    尼日利亚 591→828、太阳能板 665→869、沙特别墅 720→831、中国进口 722→810
  - 每篇补了 FAQPage 结构化数据、`dateModified`、内链和 CTA
- ✅ 修正文章里的过期/错误数据：尼日利亚人口 `2.2 billion`→`230 million`、
  旧价格 `$119/$189/$299`→`$139/$219/$339`、太阳能板 `$69`→`$79`、
  产品命名 `SV-300`→`M300-03`、MOQ `10`→`20`、一个算术错误
- ✅ 内部文档屏蔽：`HANDOFF.md`、`DEPLOY.md`、`README.md`、`_SEO_POSTS.md` 等
  之前在线上公开可访问，现在 `functions/_middleware.js` 返回 410
- ✅ 修复旧域名 301 静默失效：根因是 Wrangler 从上层目录运行导致 `functions/`
  从未编译进去（不报错），改在项目目录内运行后 301 和屏蔽都生效了
- ✅ 两篇旧模板文章的 4 列表格在手机端溢出，已加 `overflow-x:auto` 包装
- ✅ 验证：18 篇结构检查全过、10 篇 390px 手机视口无横向溢出、
  线上回读确认 FAQ/dateModified/无残留旧数据

### 已完成（历史）
- ✅ GitHub PAT 已配置并推送成功，本地与远程已同步（2026-08-13）
- ✅ 门窗站 SEO 插件核查：仅 Rank Math 激活（AIOSEO、SureRank 均为停用），无冲突
- ✅ 门窗站 `/shop/` 软 404 修复（2026-08-13）：站点可见性改 Live，Shop 页指到现有页面
- ✅ 域名迁移：`sunvolt.aluferdoors.com` → `sunvoltglobal.com`，
  全站 canonical/OG/sitemap 已切换，旧域名 301 跳转已做
- ✅ Search Console 新域名已验证，sitemap 已提交

### 待办

**需要用户手动操作**
- ⏳ Search Console：每天选 3-5 个页面点 `Request indexing`，优先这 7 个：
  `/applications`、`/blog`、`/blog-import-power-stations-china`、
  `/blog-power-station-vs-generator`、`/blog-sell-portable-power-stations`、
  `/contact`、`/shipping`
- ⏳ GA4 里把 `whatsapp_click`、`form_submit` 标记为关键事件
- ⏳ 门窗站 RankMath 的 SEO title/description 需后台手填（API 写不进去），
  或装一个能写 meta 的插件后由 Codex 批量设置
- ⏳ Meta Pixel（等 FB Business 账号，需要 15 位 Pixel ID）

**等外部结果**
- ⏳ Yandex 抓取队列结果复查（提交后 1-3 天）
- ⏳ Google / Yandex 实际收录数量复查（1-2 周）
- ⏳ sitemap 在 Yandex 的处理状态（1-2 周，属正常速度）

**可以继续推进**
- ⏳ 【最高优先】门窗站 18 篇已发布文章全部偏薄（0 篇达 800 词，10 篇 <350 词），
  需按 SunVolt 同样的方式扩写。前提：先解决 RankMath meta 无法用 API 写入的问题
- ⏳ 门窗站有一篇中文 URL 编码 slug 的文章待处理（改英文 slug + 301）
- ⏳ 观察 `/ru/`、`/ar/`、`/fr/` 的真实自然流量，按数据补内容
- ⏳ 外链建设：B2B 平台、行业目录、LinkedIn / Facebook / YouTube
- ⏳ Google Ads 转化代码（如果要投 Google Ads）

**暂缓（已评估过，暂不做）**
- 🚫 不做新网站。策略是「一个主站 + 国家子页」，即 `sunvoltglobal.com/ng`、`/sa` 这种结构
- 🚫 暂不买本地域名（如 `sunvolt.ng`），等某个市场真正做起来再说
- 🚫 俄罗斯市场需要先解决 EAC 认证和跨境结算，再考虑规模投入

---

## 7. 新 Codex 对话开场白模板

> 请读取 `C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy\HANDOFF.md`，这是网站管理文档。
> 我的电脑/聊天记录可能已更换，请先确认当前网站线上状态再继续。
> 我需要你继续管理 SunVolt 和门窗网站。当前任务是：______（描述你要做的事）

电脑全丢后的“接力提示”：
> 我换了新电脑，旧的本地文件和 Codex 聊天记录都没有了。请先读取仓库里的 `HANDOFF.md` 和 `DEPLOY.md`，告诉我 SunVolt Energy 和门窗网站的当前状态，然后我们一起继续。

或者直接粘贴 HANDOFF.md 内容。

### 接手速查（最容易搞错的几点，先看这里）

1. **部署必须在 `sunvolt-energy` 目录内运行**。Wrangler 从「当前工作目录」找 `functions/`，
   在别处跑会导致旧域名 301 和内部文档 410 屏蔽静默失效（不报错）。
2. **别重复劳动**：SunVolt 18 篇博客已全部 ≥800 词并上线；门窗站 18 篇还没扩写。
3. **当前真值**：价格 M300-03=$139 / M500-06=$219 / P1000-01=$339 / SP-100W=$79；
   GA4 是 `G-0YC6YQMSW4`；主域名 `sunvoltglobal.com`；内部文档返回 410 是正常的，不是坏了。
4. **门窗站门槛**：RankMath 的 SEO title/description 无法用 REST API 写入，做门窗文章前
   要先装能写 meta 的插件或让用户在后台手填。
5. **防对话卡死**：读图一次最多 2 张、截图单张 ≤2000px、PowerShell 内联含引号的 Python 会解析失败，
   必须写成 `.py` 文件。
6. **凭证分工**：敏感 token/密码只在 `_EMERGENCY_新电脑恢复包_20260910.md`（本机、未进仓库）；
   `HANDOFF.md` 是公开的，不含密码。

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
- SEO 插件: 仅 **Rank Math** 激活（AIOSEO、SureRank 停用），首页 meta 与 sitemap 由 Rank Math 输出
- GA4: 已检测到 Google Site Kit 注入的 `GT-5786T895`，数据确认进入属性 `542483561`
- 后台: `yixiao1221@outlook.com`（administrator），用 `wp_cookies.txt` + `wp_nonce.txt` 操作
- 转化追踪: Site Kit 自动追踪 CF7 表单与 WooCommerce 事件；WhatsApp 浮窗点击未埋点（低优先级）
- 主要用途: 门窗业务展示 + SunVolt 关联推荐
