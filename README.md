# NeoLink V3

当前网站源码保存在本仓库的 `codex/current-v3` 分支。`main` 是原有旧版，并用于现有 GitHub Pages；两个版本分别保留。

项目是静态网站，无需构建。要在电脑上临时检查，可克隆本分支后在项目目录运行：

```sh
git clone --branch codex/current-v3 https://github.com/JulyanXu/NeoLink.git
cd NeoLink
python3 -m http.server 4186 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:4186/。维护要求、验证方法和部署边界见 `MAINTENANCE.md`；V3 的历史设计说明见 `docs/V3-UPGRADE.md`。

当前 GitHub 分支是源码备份，不会自动更新或部署。原每日任务仍依赖原电脑和桌面目录，删除目录会使该任务失效；迁移自动更新需要另行配置并验证调度、凭据和服务器访问。网站服务器及其凭据不在本仓库中。
