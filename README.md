# SunVolt Energy — 独立站部署指南

## 项目信息

| 项目 | 内容 |
|------|------|
| 网站域名 | https://sunvolt.aluferdoors.com |
| 上线平台 | Cloudflare Pages |
| GitHub 仓库 | https://github.com/yixiao1221/sunvolt-energy-site |
| GitHub 分支 | main（push 即自动部署） |
| Cloudflare 项目名 | sunvolt-energy |
| 本地文件夹 | C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy |
| 页面数 | 13 个 HTML 页面 |
| 样式文件 | css/style.css（所有页面共用） |
| GA4 衡量 ID | G-0BJ4JKZPC7 |

## 部署链路

修改文件 → git push → GitHub main 分支 → Cloudflare Pages 自动部署 → 网站更新

## 如何更新网站

每次改完文件后执行以下 4 行：

  cd C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy
  git add .
  git commit -m "描述你改了什么"
  git push origin main

等 1-2 分钟，Cloudflare 自动部署完成。

## Token 管理

GitHub Token 已保存在本机 .git/config 中。
如果过期，去 https://github.com/settings/tokens 创建新 token（勾选 repo），然后运行：

  cd C:\Users\83729\Documents\New project AI文件夹\sunvolt-energy
  git remote set-url origin https://yixiao1221:新token@github.com/yixiao1221/sunvolt-energy-site.git

## GA4 转化事件

- whatsapp_click — 点击任何 WhatsApp 链接
- email_click — 点击邮件链接
- form_submit — 提交联系表单

## 注意事项

- 所有页面共用 css/style.css，改样式只需改这一个文件
- 产品图是占位图（来自 1688），需换成供应商实拍
- Blog 有 5 篇空文章（链接到 #），需补内容或隐藏
- 改完没生效：去 dash.cloudflare.com → Workers & Pages → sunvolt-energy → Deployments 检查状态
- C 盘已清理过临时文件释放了约 1.6GB

最后更新：2026-07-04


---

## 待办清单 (2026-07-06)

- [ ] 换产品实拍图（目前是 1688 占位图）
- [ ] 补 5 篇空博客文章或隐藏
- [ ] 提交 Google Search Console + sitemap
- [ ] 换独立域名（稳定出单后）: sunvolt-energy.com 或类似
- [ ] 产品图片压缩（换图后做）
