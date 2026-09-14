# SunVolt Energy — 部署 & 恢复手册

## 📦 项目位置
- GitHub 仓库：`yixiao1221/sunvolt-energy-site`（主分支 `main`）
- 线上地址：`https://sunvoltglobal.com`
- Cloudflare Pages 项目：`sunvolt-energy`

## 🔑 需要保存的关键信息
以下信息请保存在微信、密码管理器等安全的地方：

| 项目 | 值 | 在哪获取 |
|------|-----|---------|
| GitHub Token | (记录在微信里) | GitHub Settings → Developer settings → Personal access tokens |
| Cloudflare API Token | (记录在微信里) | Cloudflare Dashboard → My Profile → API Tokens |
| Cloudflare Account ID | (记录在微信里) | Cloudflare Dashboard → 右键页面 → 查看URL中的数字ID |
| GA4 Property ID | `542483561` | Google Analytics → Admin → Property Settings |
| USDT Wallet (TRC-20) | (记录在微信里) | 欧易账户 → 充值 → USDT-TRC20 |

---

## 🚀 新电脑恢复流程（电脑坏了/换新电脑）

### 1. 安装 Git
下载：https://git-scm.com/downloads
安装时全部默认选项即可。

### 2. 克隆仓库
```
git clone https://github.com/yixiao1221/sunvolt-energy-site.git
cd sunvolt-energy-site
```

### 3. 安装 Node.js
下载：https://nodejs.org/（下载 LTS 版本）
安装后打开 PowerShell 验证：
```
node --version
npx --version
```

### 4. 部署网站

> **必须在 `sunvolt-energy` 目录内部执行。**
> Wrangler 是从「当前工作目录」找 `functions/` 文件夹的。
> 如果在上层目录运行，Pages Functions（旧域名 301、内部文档屏蔽）不会被编译进部署，
> 线上会静默丢失这两项功能 —— 2026-09-15 踩过这个坑。

```powershell
cd sunvolt-energy

# 设置 Cloudflare API Token（每次部署都需要）
$env:CLOUDFLARE_API_TOKEN = "你保存的API Token"
$env:CLOUDFLARE_ACCOUNT_ID = "12a9f1a1cecb9c09810c089fc8277d76"

# 部署到 Cloudflare Pages（注意是 "."，不是 "sunvolt-energy"）
npx wrangler pages deploy . --project-name sunvolt-energy --branch main
```

> 第一次运行 `npx wrangler` 会自动安装 wrangler，稍等即可。
>
> 部署成功的标志：输出里出现
> `✨ Compiled Worker successfully` 和 `✨ Uploading Functions bundle`。
> 如果只有 `Uploading ... files` 而没有 Functions bundle，说明中间件没进去。

### 5. 验证
打开浏览器访问 `https://sunvolt-energy.pages.dev` 确认网站正常。

---

## 📝 日常更新流程

### 修改代码后部署
```
# 1. 在本地修改完代码后
git add -A
git commit -m "描述你的修改"
git push origin main

# 2. 部署（必须在 sunvolt-energy 目录内执行）
cd sunvolt-energy
$env:CLOUDFLARE_API_TOKEN = "你的API Token"
$env:CLOUDFLARE_ACCOUNT_ID = "12a9f1a1cecb9c09810c089fc8277d76"
npx wrangler pages deploy . --project-name sunvolt-energy --branch main
```

### 部署后必须验证

```powershell
# 主站正常
curl.exe -s -o NUL -w "%{http_code}`n" https://sunvoltglobal.com/

# 旧域名 301（应返回 301）
curl.exe -s -o NUL -w "%{http_code}`n" https://sunvolt.aluferdoors.com/

# 内部文档不可访问（应返回 410）
curl.exe -s -o NUL -w "%{http_code}`n" https://sunvoltglobal.com/HANDOFF.md
```

三项都符合预期，才算部署成功。

### 添加到 Codex 对话
在新对话中粘贴这段提示，Codex 就能直接接手：
```
我知道你的网站信息：
- GitHub: yixiao1221/sunvolt-energy-site
- Cloudflare Pages: sunvolt-energy
- 域名: sunvoltglobal.com
- Cloudflare Account ID: (记账里)
- Cloudflare API Token: (记账里)
帮我更新网站，需要先 pull 最新代码，修改后 push 并部署。
```

> **安全提示：**`DEPLOY.md` 不包含实际密码/Token，这些信息请保存在微信或密码管理器里。

---

## 🏗️ 项目结构
```
sunvolt-energy-site/
├── index.html          # 首页
├── products.html       # 产品页（39款产品 + 价格表）
├── about.html          # 关于我们
├── contact.html        # 联系方式
├── blog.html           # 博客列表
├── blog-*.html         # 5篇SEO博客文章
├── checkout.html       # USDT付款页面
├── wholesale.html      # 批发页面
├── privacy.html        # 隐私政策
├── shipping.html       # 物流信息
├── warranty.html       # 保修政策
├── robots.txt          # SEO爬虫配置
├── sitemap.xml         # 站点地图
├── css/                # 样式文件
├── js/                 # 脚本文件
├── images/             # 产品图片 + 工厂照片
└── DEPLOY.md           # 本文件（部署手册）
```
