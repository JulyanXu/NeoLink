# NeoLink Maintenance Log

## 2026-05-19T21:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与20:00一致；HTTPS握手仍失败（SSLEOFError/EOF occurred in violation of protocol），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 海外新增/复核：Energy-Storage.News首页hash较20:00变化；新增/置顶Rept Battero印尼锂离子电芯与BESS制造设施线索，新增5月19日BESS AC/DC augmentation技术分析，并复核NSW firming tender 2,128MWh储能文章仍可访问。
- 国内新增/复核：中国储能网江苏储能文章披露江苏电网侧新型储能2026年4月底895万千瓦、2030年目标1200万千瓦以上，并补充淮安2×30万千瓦盐穴压缩空气储能项目口径；复核绿发中科储能与东方汽轮机液态空气储能合作。
- MarketTrend：SMM电池级碳酸锂行情入口、5月19日报价页和18:32日评重新抓取，继续确认均价较上个更新日下跌5000元/吨、碳酸锂主连跌3.71%；公开页未披露21:00新报价，不伪造新报价。
- 版本：202605192100；保留source/as_of/methodology/url字段。Artifacts: `var/hermes/search-notes-20260519-2100.json`。

## 2026-05-19T20:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与18:00一致；HTTPS握手仍失败（SSLEOFError/EOF occurred in violation of protocol），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 国内新增/复核：中国储能网披露赣锋锂业Cauchari-Olaroz盐湖二期项目入选阿根廷RIGI计划；陕西省省长调研中国能建陕西铜川350MW压缩空气储能电站；同步复核商水县400MW/800MWh电网侧储能项目仍可访问。
- 海外新增/复核：Energy-Storage.News 5月19日发布日本电网运营商容量市场拍卖选择1.25GW BESS并设置6小时持续时长要求；复核Canadian Solar/E-Storage产能翻倍计划与Q1 2.1GWh BESS出货收入确认口径。
- MarketTrend：SMM电池级碳酸锂行情入口、5月19日报价页和日评重新抓取，继续确认181000-192000元/吨、均价186500元/吨、较上一更新日下跌5000元/吨，主连跌3.71%；公开页未披露20:00新报价，不伪造新报价。
- 版本：202605192000；保留source/as_of/methodology/url字段，不做无内容纯时间刷新。Artifacts: `var/hermes/search-notes-20260519-2000.json`。

本文件记录“信息检查/刷新”任务的执行结果，尤其是 **no-change check**（无可信新增数据时不刷新前台时间戳）。

## 2026-05-19T18:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与17:00一致；HTTPS握手仍失败（SSLEOFError/EOF occurred in violation of protocol），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 国内新增：中国储能网披露内蒙古奈曼旗500MW/2000MWh储能电站即将转入商业运行；浙江绍兴柯桥区50MW/100MWh共享储能项目动工；远信储能参建匈牙利Oroszlány 110MWh大型储能项目取得阶段性进展；苏南首个用户侧构网型储能电站并网投运。
- 海外新增/复核：Energy-Storage.News首页新增/置顶Alsym Energy与Juniper Energy加州500MWh钠离子战略合作；继续复核Benchmark口径4月全球大型BESS投运4.5GW/12.8GWh。
- MarketTrend：SMM 5月19日电池级碳酸锂报价页与15:23日评重新抓取，确认均价较上一更新日下跌5000元/吨、碳酸锂主连跌3.71%；公开页未稳定暴露新的18:00区间价，不伪造新报价。
- 版本：202605191800；保留source/as_of/methodology/url字段，不做无内容纯时间刷新。Artifacts: `var/hermes/search-notes-20260519-1800.json`。

## 2026-05-19T17:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与16:00一致；HTTPS握手仍失败（SSLEOFError），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 国内新增：中国储能网披露中虹普能与河南周口商水县签约400MW/800MWh电网侧储能电站；华能内蒙古通威绿色基材新能源项目全容量并网，配置90MW/360MWh电化学储能；正泰电源日本鹿儿岛3.6MW/10MWh构网型储能电站并网。
- 海外新增/复核：Energy-Storage.News首页复核到Ford正式推出美国固定式储能子公司、计划2027年交付；Benchmark口径4月全球大型BESS投运4.5GW/12.8GWh。
- MarketTrend：SMM 5月19日电池级碳酸锂报价页显示均价较上一更新日下跌5000元/吨，公开页未稳定暴露新的价格区间；SMM 15:23日评显示碳酸锂主连跌3.71%。保留已确认05-19均价186500元/吨，不伪造17:00新报价。
- 版本：202605191700；保留source/as_of/methodology/url字段，不做无内容纯时间刷新。Artifacts: `var/hermes/search-notes-20260519-1700.json`。

## 2026-05-19T15:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与14:00一致；HTTPS握手仍失败（SSLEOFError），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 国内新增：中国储能网新增浙江绍兴柯桥区杨汛桥芝塘湖50MW/100MWh独立电化学储能项目动工；内蒙古奈曼旗万马新能源500MW/2000MWh构网型储能电站已于2025年12月并网、目前即将转入商业运行。
- 海外新增：Energy-Storage.News披露OX2澳大利亚新南威尔士Muswellbrook 100MW/300MWh BESS+135MW光伏项目启动施工，拟以2.4km架空线路接入Ausgrid 132kV线路，预计2028年完工。
- MarketTrend：SMM电池级碳酸锂公开页复核为2026-05-19，181000-192000元/吨，均价186500元/吨，日跌5000元/吨；SMM午评14:19显示“碳酸锂跌超3%”；SMM锂电快讯披露国轩高科完成2GWh全固态电池量产线设计。
- 版本：202605191500；保留source/as_of/methodology/url字段，不做无内容纯时间刷新。

## 2026-05-19T14:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash与13:00一致；继续保存原始快照，不以单纯抓取时间伪造内容新鲜度。
- 国内新增：中国储能网披露河北交投康保县400MW/1600MWh构网型独立储能电站储能系统设备采购招标，拟采用磷酸铁锂构网型系统，新建220kV升压站并接入康保500kV变电站；另新增通辽科尔沁电网侧独立新型储能电站开发主体优选公告，单体不小于10万千瓦、申报总规模不低于40万千瓦时。
- 海外新增：Energy-Storage.News披露TNB马来西亚100MW/400MWh构网型BESS投运/启动、Enervest收购300MW Northern Border Battery、Yarra Energy Foundation墨尔本社区电池+EV充电、澳大利亚户储补贴累计400000套/11.2GWh。
- MarketTrend：SMM电池级碳酸锂公开页复核为2026-05-19，181000-192000元/吨，均价186500元/吨，日跌5000元/吨；同步更新MarketTrend内嵌事件与资源版本为`v=202605191400`。
- 版本：202605191400；保留source/as_of/methodology/url字段，不做无内容纯时间刷新。

## 2026-05-19 14:28 +0800 — no-change (consistency fix)
- Local state: `data/feed.js generated_at=2026-05-19T14:00:00+08:00` and cache params remain `feed.js?v=202605191400` (no feed/content bump).
- Homepage timestamp: fixed `index.html` hero “更新” from `13:00` → `14:00` to match the existing 14:00 feed (no fake freshness).
- Live readback/TLS: runner DNS still failed (`curl` error 6 for `www.neolink.asia`), so online entry, JS version, and HTTPS/TLS status cannot be verified here.
- Public-source verification (web.run): rechecked SMM Li2CO3 battery-grade page — still shows `renew_date=2026-05-19` with avg `186500` CNY/ton; Energy-Storage.News TNB 100MW/400MWh article still reachable; no newer credible items found vs 14:00 feed.
- Artifacts: wrote `var/hermes/search-notes-20260519-1428.json` and prepended a no-change record to `var/hermes/state/crawl_runs.json`.

## 2026-05-19 14:54 +0800 — no-change
- Local state: `data/feed.js generated_at=2026-05-19T14:00:00+08:00` and cache params remain `feed.js?v=202605191400` (no feed/content bump).
- Live readback/TLS: runner DNS failed (`curl` error 6), so online entry and HTTPS/TLS status cannot be verified in this run.
- Public-source verification: skipped due to DNS failure (cannot fetch/verify public sources in this environment).
- Artifacts: wrote `var/hermes/search-notes-20260519-1454.json` and prepended a no-change record to `var/hermes/state/crawl_runs.json`.
