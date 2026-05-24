## 2026-05-25T01:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `544d336e...`，`/markettrend/` HTTP 200 sha256 `664eae2b...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/上移：中文储能RSS sha256 `52296b32...` 较23:00新增/上移科创板影像龙头切入储能；中文BESS/电池RSS sha256 `bce9a08a...` 新增/上移新能源汽车私改电池乱象、下一代电池技术“场景为王”、奇瑞固态电池参数、比亚迪210km大电池插混、极氪009 900V/115度电池等；中文材料RSS sha256 `c0136c89...` 新增/上移钠电池产业化提速、钠电成本追平锂电讨论、欣旺达供特斯拉、比亚迪二代刀片。
- 海外新增/上移：全球BESS RSS sha256 `b52e266c...` 与储能政策RSS `a2f7b2dc...` 新增/上移Cavotec PowerAccESS港口起重机Battery ESS、高海拔水电储能、AI提升可再生能源效率、菲律宾绿色能源拍卖、泰国与IEA能源安全合作；数据中心电力RSS `093e15ef...` 新增Ford储能、AI需求下电池储能公司面临电网和供应链约束、CATL/DeepSeek数据中心基础设施等。
- 行情复核：SMM新能源 sha256 `7177d199...` 与SMM碳酸锂页 sha256 `250be88c...` 显示电池级碳酸锂178000元/吨、SMM电池级碳酸锂指数178343元/吨、磷酸铁锂61285元/吨、电解液28950元/吨、高端储能人造石墨25100元/吨，较23:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至01:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605250100`。已通过`node --check`校验feed、图谱、首页脚本、新闻页脚本、详情页脚本、图谱脚本和MarketTrend JS。Artifacts: `var/hermes/crawl-20260525-0100.py`, `var/hermes/crawl-output-20260525-0100.json`, `var/hermes/search-notes-20260525-0100.json`。

## 2026-05-24T23:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `17152d85...`，`/markettrend/` HTTP 200 sha256 `f1f7bbe9...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/上移：中文储能RSS sha256 `1bb63ade...` 较09:00新增珠海外贸储能电源通关、东莞新型储能产业链合作、包头智能组串式储能电站、科创板影像龙头切入储能、港股储能概念走强、CNE Tier1储能品牌梯队、赣锋锂业储能布局、南网储能研发投入；中文BESS/电池RSS sha256 `bf0ab576...` 新增/上移钠电池产业化提速、Model Y 4680、钙钛矿空间光伏、比亚迪元PLUS/海豚二代刀片与闪充、太蓝固态无人机电芯、欣旺达成为特斯拉电池供应商。
- 海外新增/上移：全球BESS RSS sha256 `0e3de226...` 与全球储能政策RSS `9e157487...` 较09:00新增/上移Ford Energy储能生产及EDF供货、Spearmint Energy 600MWh Texas项目融资、DHL荷兰EV/BESS电池物流枢纽、英国大型BESS、EBRD向斯洛文尼亚BESS开发商贷款7000万欧元、埃及4.75GW风电+4GWh BESS、美国Q1新增储能10GWh等。
- 行情复核：SMM新能源 sha256 `25d9f59e...` 与SMM碳酸锂页 sha256 `d3b8305e...` 显示电池级碳酸锂178000元/吨、SMM电池级碳酸锂指数178343元/吨、磷酸铁锂61285元/吨、电解液28950元/吨、高端储能人造石墨25100元/吨，较09:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至23:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605242300`。已校验feed JSON、search-notes JSON、首页/新闻/详情/MarketTrend版本与MarketTrend JS关键词；已通过rsync部署至`neolink:/var/www/neolink/`并修复权限，HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605242300`和MarketTrend JS均为200，feed generated_at、`东莞`、`Ford/EDF`与`SMM 5/24 23:00复核`关键词验证通过。Artifacts: `var/hermes/crawl-20260524-2300.py`, `var/hermes/crawl-output-20260524-2300.json`, `var/hermes/search-notes-20260524-2300.json`。

## 2026-05-24T09:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `d617863c...`，`/markettrend/` HTTP 200 sha256 `df1e0d50...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/上移：中文储能RSS sha256 `2fc370ec...` 较08:00新增MG4X半固态电池两条汽车之家视频线索，以及新浪财经“钟睒睒首次出手新能源、固态电池材料公司”报道；中文BESS/电池RSS sha256 `82cbb970...` 新增/上移空间站钙钛矿电池太空服役首秀、动力电池新增上车车型整理、小鹏G6电池供应策略、电池包维修争议、蔚来萤火虫升级大电池包。
- 海外新增/上移：全球BESS RSS sha256 `24b2f22d...` 较08:00新增/上移Teslarati关于Meta采用Tesla大型清洁能源项目；数据中心电力RSS sha256 `9b97a42a...` 新增/上移Power Grid Crunch推动Siemens Energy现金流报道。ESS News sha256 `7aa69ac6...`、Energy-Storage.News `edce5acc...`继续复核Sungrow 7.5GWh、Invinity 1600MWh、Rept印尼BESS、日本1.25GW/6小时BESS等线索。
- 行情复核：SMM新能源 sha256 `a5961734...` 与SMM碳酸锂页 sha256 `15a8b90b...` 显示电池级碳酸锂178000元/吨、SMM电池级碳酸锂指数178343元/吨、磷酸铁锂61285元/吨、电解液28950元/吨、高端储能人造石墨25100元/吨，较08:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至09:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605240900`。已校验feed JSON、首页/新闻/详情/MarketTrend版本与MarketTrend JS关键词。Artifacts: `var/hermes/crawl-20260524-0900.py`, `var/hermes/crawl-output-20260524-0900.json`, `var/hermes/search-notes-20260524-0900.json`。

## 2026-05-24T08:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `2e33390e...`，`/markettrend/` HTTP 200 sha256 `346e09b2...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/强化：中文储能RSS sha256 `c5261418...` 较07:00新增“谁是中东储能之王？”和2026年动力电池新增上车车型整理；中文BESS/电池RSS sha256 `a3cc2ce6...` 新增/上移特斯拉Model YL+电池增大续航突破800km、比亚迪第二代刀片电池+闪充首搭10款新车、奇瑞1600公里固态电池上车、比亚迪后续固态电池讨论。中国能源网 sha256 `43b7c8ee...` 复核欧盟PCS限制、新型储能质监大纲、内蒙古超级充电宝、阳光电源中东7.5GWh和碳酸锂高位震荡线索。
- 海外复核：全球BESS RSS sha256 `55d5c1b1...` 与全球储能政策RSS `f4668be4...` 较07:00无新增标题但继续显示Ford/EDF储能合作、Ford储能投资者讨论和Yellowstone 10-acre BESS；欧洲BESS RSS `6560bde7...` 继续显示Actuate Energy欧洲电池储能平台；数据中心电力RSS `9f434463...` 继续显示Data Center Dynamics关于水、电网波动与UPS battery layer负担讨论；ESS News sha256 `ed19b2d5...` 和Energy-Storage.News `edce5acc...` 复核Sungrow 7.5GWh、Invinity 1600MWh、Rept印尼BESS、日本1.25GW/6小时BESS。
- 行情复核：SMM新能源 sha256 `089c055d...` 与SMM碳酸锂页 sha256 `a683c8d...` 显示电池级碳酸锂178000元/吨、SMM电池级碳酸锂指数178343元/吨、磷酸铁锂61285元/吨、电解液28950元/吨、高端储能人造石墨25100元/吨，较07:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至08:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605240800`。已校验feed JSON、首页/新闻/详情/MarketTrend版本与MarketTrend JS关键词。Artifacts: `var/hermes/crawl-20260524-0800.py`, `var/hermes/crawl-output-20260524-0800.json`, `var/hermes/search-notes-20260524-0800.json`。

## 2026-05-24T07:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `0771c229...`，`/markettrend/` HTTP 200 sha256 `512ccc27...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/强化：中文BESS/电池RSS sha256 `87857b2c...` 较04:00新增全新问界M9增程75度电池、497kW四驱，以及“白天太阳能、晚间用电池”的加州电网重塑讨论；北极星储能 sha256 `c1638c33...` 首页复核Q1储能日均利用小时突破3h、4月储能系统中标规模暴涨、比亚迪登顶2025全球储能装机总量榜首、四川宜宾储能超400MW/800MWh。
- 海外新增/复核：全球BESS RSS sha256 `54c35b87...` 与全球储能政策RSS `dcfd27cc...` 较04:00新增Simply Wall St对Ford储能业务投资者影响的讨论；ESS News sha256 `565bd90a...` 复核Sungrow阿布扎比24/7 solar-storage项目7.5GWh订单、Invinity瑞士Flexbase 800MW/1600MWh钒液流储能；Energy-Storage.News sha256 `159cf06d...` 继续显示Rept印尼BESS、NSW 2,128MWh、日本1.25GW/6小时BESS容量市场等。
- 行情复核：SMM新能源 sha256 `c15f075f...` 与SMM碳酸锂页 sha256 `a683c8d...` 显示电池级碳酸锂178000元/吨、SMM电池级碳酸锂指数178343元/吨、磷酸铁锂61285元/吨、电解液28950元/吨、高端储能人造石墨25100元/吨，较04:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至07:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605240700`。已校验feed JSON、首页/新闻/详情/MarketTrend版本与MarketTrend JS关键词。Artifacts: `var/hermes/crawl-20260524-0700.py`, `var/hermes/crawl-output-20260524-0700.json`, `var/hermes/search-notes-20260524-0700.json`。

## 2026-05-24T03:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `24e3b4d1...`，`/markettrend/` HTTP 200 sha256 `322ca123...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增/上移：中文储能RSS sha256 `89a327e6...` 较02:00新增/上移太蓝新能源无人机固态电芯批量交付、2026款MG4半固态电池、奇瑞固态电池/ES8验证和全球首款固态电池纯电摩托量产；中文BESS/电池RSS sha256 `40913040...` 新增比亚迪大唐第二代刀片电池+闪充、比亚迪刀片电池破局、东风氢燃料电池耐久技术成果。
- 海外新增：全球BESS RSS sha256 `5284c7c5...` 新增Ford/EDF电池储能合作和Ford肯塔基Gigafactory转向电网级储能生产；全球储能政策RSS `947e9c87...` 新增Sungrow-Masdar阿布扎比7.5GWh储能系统、美国固定电费削弱屋顶光伏+电池收益、Utah Operation Gigawatt；欧洲BESS RSS `5a163e9d...` 新增Albanese政府可再生能源覆盖400万户；数据中心电力RSS `0792635f...` 新增HSBC东南亚能源转型40亿美元布局。
- 行情复核：SMM新能源 sha256 `7f9c2e75...` 与SMM碳酸锂页 sha256 `7f278467...` 显示电池级碳酸锂178000元/吨、SMM电碳指数178343元/吨、磷酸铁锂61285元/吨，较02:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至03:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605240300`。已通过`node --check`校验feed/script/news-more/article，并校验本轮JSON记录可解析；已通过rsync部署至`neolink:/var/www/neolink/`并修复权限，HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605240300`和MarketTrend JS均为200，feed generated_at、`太蓝`、`Ford`、`Sungrow-Masdar`与`SMM 5/24 03:00复核`关键词验证通过。Artifacts: `var/hermes/crawl-20260524-0300.py`, `var/hermes/crawl-output-20260524-0300.json`, `var/hermes/search-notes-20260524-0300.json`。

# NeoLink Maintenance Log

## 2026-05-24T02:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `961852d5...`，`/markettrend/` HTTP 200 sha256 `25d4de1e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `f2a3219e...` 较00:00新增宁夏同心建设储能电站助力绿色发展、每日经济新闻独家报道钟睒睒首次出手新能源并关注固态电池材料公司；中文BESS/电池RSS sha256 `3ccff72c...` 新增第二代刀片电池+闪充技术首搭10款新车、财联社“钠电成本年内望追平锂电，材料短缺或影响放量”、比亚迪全固态电池通过车规验证并计划2027年量产。
- 海外新增：全球BESS RSS sha256 `fe8bf145...` 新增Daily News Hungary“Japanese-backed solar power plant strengthens Hungary’s renewable energy supply”和Oman Observer“24/7 renewables reshape global energy debate as storage costs fall”；全球储能政策RSS `965ef290...` 与数据中心电力RSS `9948e915...` 新增EOSE股票连续上涨、CEO称AI和制造业增长正在重塑美国电力需求。
- 行情复核：SMM新能源 sha256 `a5261644...` 与SMM碳酸锂页 sha256 `6f404f81...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970；电解液28950元/吨、高端储能人造石墨25100元/吨持平，较00:00采集值未变；SMM新能源页光伏组件成分计价模型日期更新为2026-05-24。
- 动作：已更新`data/feed.js` generated_at/checked_at至02:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605240200`。Artifacts: `var/hermes/crawl-20260524-0200.py`, `var/hermes/crawl-output-20260524-0200.json`, `var/hermes/search-notes-20260524-0200.json`。

## 2026-05-23T22:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `12f7c179...`，`/markettrend/` HTTP 200 sha256 `5e548a22...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `e5b655e4...` 较20:00新增21财经“千亿锂王重仓储能”和北京科锐参加2026储能高质量发展峰会；中文BESS/电池RSS sha256 `aa16e4da...` 新增中国空间站钙钛矿电池动态服役实验、奇瑞固态电池1000km/ES8装车验证、比亚迪汉EV二代刀片电池5分钟闪充、固态/锂电路线讨论和本田可拆电池电动摩托车。
- 海外新增：全球储能政策RSS sha256 `0de8eab1...` 与欧洲BESS RSS `b11b6610...` 新增pv magazine“Brazil falls short of its battery storage potential”、ESS News“Spearmint closes $450 million for 600 MWh ERCOT project / PowerBank leases 60 MWh across New York”、Mirage News 7.8GW清洁能源项目；数据中心电力RSS `0f9e686b...` 新增Data Center Dynamics关于水/电网波动加重UPS电池层负担和TradingKey关于AI数据中心电力需求/PJM拍卖/SMR线索。
- 行情复核：SMM新能源 sha256 `a2161c17...` 与SMM碳酸锂页 sha256 `f0253f1e...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970；电解液28950元/吨、高端储能人造石墨25100元/吨持平，较20:00采集值未变；SMM新能源页光伏组件成分计价模型日期2026-05-23。
- 动作：已更新`data/feed.js` generated_at/checked_at至22:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605232200`；已通过rsync部署至`neolink:/var/www/neolink/`并修复权限。HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605232200`和MarketTrend JS均为200，版本号、feed generated_at、`千亿锂王重仓储能`、`Spearmint ERCOT 600MWh`与`SMM 5/23 22:00复核`关键词验证通过。Artifacts: `var/hermes/crawl-20260523-2200.py`, `var/hermes/crawl-output-20260523-2200.json`, `var/hermes/search-notes-20260523-2200.json`。

## 2026-05-23T12:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `e14585c0...`，`/markettrend/` HTTP 200 sha256 `246f0f93...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `3e0d6554...` 较11:00新增巴西将启动首次储能电池专场招标、新型储能未来装机有望大幅提升、多只龙头股业绩回暖、正力新能前4月乘用车装机行业第五、飞轮储能人才线索，并继续复核阳光电源中东7.5GWh与国电投/宁德/华为储能合作；中文BESS/电池RSS sha256 `8f1475ff...` 新增Model Y换装4680电池、宁德时代锂离子电池相关专利、奥特维IBC电池串设备专利、极狐贝塔S3电池租用方案和大连理工PVDF基聚合物电解质研究。
- 海外新增：全球BESS RSS sha256 `14e3b7cf...` 新增City of North Bend unanimously passes BESS moratorium；全球储能政策RSS `992a9af7...` 新增India’s largest standalone BESS goes live in Gujarat、NEOS Advisory电网就绪框架和Largo钒生产商效率改善；数据中心电力RSS `4a0554c8...` 新增电网就绪框架。
- 行情复核：SMM新能源 sha256 `7ba38af1...` 与SMM碳酸锂页 sha256 `7f75534e...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变；SMM新能源页光伏组件成分计价模型日期2026-05-23。
- 动作：已更新`data/feed.js` generated_at/checked_at至12:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605231200`；已通过rsync部署至`neolink:/var/www/neolink/`并修复权限。HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605231200`和MarketTrend JS均为200，版本号、feed generated_at、`巴西`、`Gujarat`、`North Bend`与`SMM 5/23 12:00复核`关键词验证通过（HTTPS本机握手返回SSLEOF，改用HTTP验证）。Artifacts: `var/hermes/crawl-20260523-1200.py`, `var/hermes/crawl-output-20260523-1200.json`, `var/hermes/search-notes-20260523-1200.json`。

## 2026-05-23T11:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `8c12bd1d...` 较10:00新增北京科锐参加2026储能高质量发展峰会、晶澳科技换帅储能、美国储能产业扩容、东风固态电池车2027年量产、阳光电源/中东7.5GWh储能系统、国电投/宁德/华为合作、隆基德国工商业储能；中文BESS/电池RSS sha256 `e907f976...` 新增动力电池装车量TOP15、宁德时代钠新电池预计Q4量产、量产全固态电池实测、比亚迪闪充刀片电池和快充争议。
- 海外新增：全球BESS RSS sha256 `4f4a933f...` 新增Ford储能与EDF线索、Sungrow and Masdar 7.5GWh、Ford Energy接手前BlueOval SK电池工厂；全球储能政策RSS `21adb5ca...` 新增Gujarat 870MW电池储能网络和电池储能领导力线索；数据中心电力RSS `0f6575a9...` 新增Ford Energy战略转向和AI算力产业链瓶颈传导分析。
- 行情复核：SMM新能源 sha256 `487254cf...` 与SMM碳酸锂页 sha256 `0592a40f...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至11:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605231100`；已通过rsync部署至`neolink:/var/www/neolink/`并修复权限。HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605231100`和MarketTrend JS均为200，版本号、feed generated_at、`阳光电源-Masdar`、`Gujarat 870MW`与`SMM 5/23 11:00复核`关键词验证通过。Artifacts: `var/hermes/crawl-20260523-1100.py`, `var/hermes/crawl-output-20260523-1100.json`, `var/hermes/search-notes-20260523-1100.json`。

## 2026-05-23T08:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `27895c6b...` 较07:00新增千亿“锂王”重仓储能、东久上海0.5MW/1.044MWh储能电站及充电桩、阳光电源中东储能大单、国家电投/宁德时代/华为数字能源储能合作、电池材料排产向好；中文BESS/电池RSS sha256 `355760f9...` 新增加州光储调度重塑电网、比亚迪领汇e7闪充长寿命电池、名爵MG 4X半固态电池。
- 海外新增：全球储能政策RSS sha256 `205b6acb...` 新增Ford能源存储上行空间、Staten Island电池储能禁令法案受阻、数据中心微电网living lab、德国储能并网费不确定性、印度最大独立BESS投运；欧洲BESS RSS `2e82952a...` 新增SMA与海博思创全球储能合作；数据中心电力RSS `81792be2...` 新增Invinity瑞士Flexbase钒液流储能、美国储能扩张、Bloom Energy 26亿美元AI基础设施交易等。
- 行情复核：SMM新能源 sha256 `3a8420f5...` 与SMM碳酸锂页 sha256 `d264bb6b...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至08:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605230800`。Artifacts: `var/hermes/crawl-20260523-0800.py`, `var/hermes/crawl-output-20260523-0800.json`, `var/hermes/search-notes-20260523-0800.json`。

## 2026-05-23T07:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `bfdc3f84...` 较05:00新增英博智储宁夏永宁200MW/400MWh共享储能、宁德时代储能装置/供电系统国际专利申请、半固态/全固态车型与比亚迪/奇瑞固态电池线索；中文BESS/电池RSS sha256 `2097341f...` 新增旧锂电池储藏安全风险、MG4电池供应争议、腾势Z9GT大电池版和第二代刀片电池讨论。
- 海外新增：全球BESS RSS sha256 `bf01dc83...` 新增南达科他1.74亿美元BESS许可、加州12000MW储能放电、Sungrow/Masdar阿布扎比7.5GWh储能系统、独立电池储能关税风险；数据中心电力RSS `99c8b857...` 新增Goldman Sachs相关199MW电池站、底特律微电网SST实测、印度抽蓄/电网可靠性主题。
- 行情复核：SMM新能源 sha256 `9f3e80a1...` 与SMM碳酸锂页 sha256 `bd5fa0a2...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至07:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605230700`。Artifacts: `var/hermes/crawl-20260523-0700.py`, `var/hermes/crawl-output-20260523-0700.json`, `var/hermes/search-notes-20260523-0700.json`。

## 2026-05-23T05:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `e3abe19d...` 较03:00新增财联社“多重逻辑驱动港股储能概念走强，机构称三年内装机复合增速或达50%”、汽车之家“比亚迪全固态电池通过车规验证，打算在2027年量产”；中文BESS/电池RSS sha256 `f31efd3b...` 新增新能源汽车私改电池乱象调查、比亚迪第二代刀片电池续航超1000km安全性解析、比亚迪全固态电池车规验证。
- 海外新增：全球BESS RSS sha256 `ca9605d0...` 新增巴西制造商推动长期电池储能拍卖排期、Meta/Enbridge怀俄明数据中心太阳能+储能；欧洲BESS RSS `b3a41b4a...` 新增Eurohold/360 Energy保加利亚161MWp光伏园区BESS；数据中心电力RSS `f90e5506...` 新增铁电池缓解关键金属稀缺线索。
- 行情复核：SMM新能源 sha256 `9ebb74ef...` 与SMM碳酸锂页 sha256 `b1254692...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至05:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605230500`。Artifacts: `var/hermes/crawl-20260523-0500.py`, `var/hermes/crawl-output-20260523-0500.json`, `var/hermes/search-notes-20260523-0500.json`。

## 2026-05-23T03:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `1df73c61...` 较02:00新增易事特菲律宾太阳能与储能展光储充客户反馈、新京报“30天超200亿元涌入：6家扩产6家冲上市”；中文BESS/电池RSS sha256 `4df644fc...` 新增新能源电池ETF/电池ETF成交、比亚迪二代刀片电池首搭10款新车，并继续跟踪比亚迪ISO/SAE 21434证书和“十五五”新型储能方案。
- 海外新增：全球BESS RSS sha256 `71b9dc25...`、储能政策RSS `4e1b79c7...`、数据中心电力RSS `42f18f90...` 较02:00新增Enbridge/Meta Cowboy Project、Spearmint ERCOT 600MWh储能约4.5亿美元融资、Gotion钠电261Wh/kg和2万次循环、ProLogium固态电池、印度最大独立BESS、Bloom Energy/Nebius AI数据中心供能交易及北美地方锂电储能审批/反对意见。
- 行情复核：SMM新能源 sha256 `89ae8db2...` 与SMM碳酸锂页 sha256 `c54d64ee...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至03:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605230300`。Artifacts: `var/hermes/crawl-20260523-0300.py`, `var/hermes/crawl-output-20260523-0300.json`, `var/hermes/search-notes-20260523-0300.json`。

## 2026-05-23T02:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ee701985...`，`/markettrend/` HTTP 200 sha256 `330d3d4e...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `6bc36d76...` 较01:00新增东莞新型储能产业链“1天配齐、15天供货”、MG 4X半固态电池、追觅450Wh/kg固态电池线索；中文BESS/电池RSS sha256 `cc6edb0b...` 新增比亚迪电池获SGS/CertX中国首张经SAS认可ISO/SAE 21434证书、岚图电池抗冲击测试、比亚迪海獭日本市场20度电池。
- 海外新增：全球BESS RSS sha256 `d4402994...`、储能政策RSS `6f8bafaf...`、欧洲BESS RSS `59fa5f44...` 较01:00新增SK On Tennessee接管Stanton电池工厂、Tesla Megapack支撑Meta AI数据中心、南达科他1.74亿美元BESS许可、Gresham英国480MW BESS、印度最大独立BESS、澳洲100MWh BESS计划；数据中心/新型储能RSS新增微电网、铁电池、Invinity瑞士钒液流储能。
- 行情复核：SMM新能源 sha256 `901371a7...` 与SMM碳酸锂页 sha256 `b1254692...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较上一采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至02:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605230200`。Artifacts: `var/hermes/crawl-20260523-0200.py`, `var/hermes/crawl-output-20260523-0200.json`, `var/hermes/search-notes-20260523-0200.json`。

## 2026-05-22T23:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `e0ff39cb...`，`/markettrend/` HTTP 200 sha256 `e058c0f3...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML/RSS落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `ceae97a3...` 较22:00新增财联社“全球储能需求共振 机构持续看好储能赛道景气度”、新浪财经“国家电投、宁德时代联手，与华为数字能源就储能签约合作”、东莞水乡新型储能产业链精准对接、国轩高科固态电池“1元时代”；中文BESS/电池RSS sha256 `4fe29635...` 新增工信部动力电池和整车安全通告、恩捷股份终止马来西亚隔膜项目。
- 海外新增：全球BESS RSS sha256 `1c39d9ce...`、储能政策RSS `663f9052...`、欧洲BESS RSS `0849d881...` 较22:00新增Staten Island储能禁令法案停滞、宾州储能能源独立讨论、钠替代锂讨论、可再生能源并网需电网整合、Byhmgard-CMEC 1GW欧洲BESS融资协议；数据中心/新型电池RSS新增AI数据中心电池需求与Inlyte铁钠电池试点。
- 行情复核：SMM新能源 sha256 `99509db1...` 与SMM碳酸锂页 sha256 `2016e193...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较22:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至23:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605222300`；已通过rsync部署至`neolink:/var/www/neolink/`。HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605222300`和MarketTrend JS均为200，版本号、feed generated_at、`国家电投`、`Byhmgard`与`SMM 5/22 23:00`关键词验证通过。Artifacts: `var/hermes/crawl-20260522-2300.py`, `var/hermes/crawl-output-20260522-2300.json`, `var/hermes/search-notes-20260522-2300.json`。

## 2026-05-22T22:00:00+08:00 strict global crawl — no credible new data
- 重新读取：NeoLink首页HTTP 200 sha256 `e0ff39cb...`，`/markettrend/` HTTP 200 sha256 `e058c0f3...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS、SMM页面和原始HTML/RSS落盘，未仅刷新时间。
- 国内复核：北极星储能 sha256 `68bdf097...`，国家能源局 `831669d7...`，工信部 `72608afa...`，CNESA `3b567931...`；中文储能RSS `802f6f77...`、中文BESS/电池RSS `4694e65f...` 较20:00无新增标题。
- 海外复核：Energy-Storage.News `3254bb23...`，ESS News `25a4639d...`，pv magazine `e23f8c08...`，SolarQuarter `e9789360...`；全球BESS、储能政策、欧洲BESS、数据中心电力RSS较20:00均无新增标题。
- 行情复核：SMM新能源 `0c7ad848...` 与SMM碳酸锂页 `85d7186c...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970；电解液28950元/吨、高端储能人造石墨25100元/吨，核心数值较20:00未变。
- 动作：因无可信新增新闻/行情/舆情，严格按规则不更新`data/feed.js`、首页、新闻页、详情页或MarketTrend可见时间戳；仅记录本轮no-change检查和证据。Artifacts: `var/hermes/crawl-20260522-2200.py`, `var/hermes/crawl-output-20260522-2200.json`, `var/hermes/search-notes-20260522-2200.json`。

## 2026-05-22T20:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `bbd6c079...` 较19:00新增华龙网“山城西引力｜头部储能企业为何布局重庆？这场大会给出答案”、凤凰网财经HiLock固态电池温等静压装备出货，以及锂电产业链周记中阳光电源阿联酋7.5GWh储能订单、璞泰来拟56亿元扩建隔膜产能；中文BESS/电池RSS sha256 `58a57a5b...` 同步新增重庆储能企业布局与HiLock装备出货。
- 海外新增：全球BESS RSS sha256 `04fd8be6...` 与储能政策RSS sha256 `e8e64efd...` 较19:00新增Kenosha暂停电池储能设施投票、Frontier Power收购德州480MWh BESS组合、美国季度储能部署10GWh纪录、Antora热碳电池5GWh储能项目；欧洲BESS/数据中心电力RSS新增欧洲储能盈利转向、波兰300MW BESS、PowerX AI数据中心电力产品。
- 行情复核：SMM新能源 sha256 `7594f0e2...` 与SMM碳酸锂页 sha256 `134d63b8...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较19:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至20:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605222000`；已通过rsync部署至`neolink:/var/www/neolink/`并清理误落盘的根目录临时副本。HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605222000`和MarketTrend JS均为200，版本号、feed generated_at、`Frontier`与20:00关键词验证通过。Artifacts: `var/hermes/crawl-20260522-2000.py`, `var/hermes/crawl-output-20260522-2000.json`, `var/hermes/search-notes-20260522-2000.json`。

## 2026-05-22T19:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `31aa9f4e...` 较17:00新增“中国企业全面占领储能电芯Top10榜单”、菲律宾光储展易事特光储充、格力钛电池、储能场景赛道升温、阳光电源中东储能大单、AIDC储能阵营盘点；中文BESS/电池RSS sha256 `7b0cdc5f...` 新增凤麟核微型同位素电池、欣旺达电池回收、比亚迪ISO/SAE 21434证书等。
- 海外新增：全球BESS RSS sha256 `4aaa0664...` 与欧洲BESS RSS sha256 `f8b0fc24...` 较17:00新增Napanee 600M美元BESS提前完工、德国2029年后项目定价、EDF波兰120MWh BESS、SMA与海博思创全球合作、PowerBank纽约60MWh、Spearmint ERCOT 600MWh融资。数据中心电力RSS sha256 `8f50f44d...` 新增美国季度储能部署10GWh纪录、AI数据中心HVDC发电机线索。
- 行情复核：SMM新能源 sha256 `8ccf499b...` 与SMM碳酸锂页 sha256 `a1c244df...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较17:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至19:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605221900`。Artifacts: `var/hermes/crawl-20260522-1900.py`, `var/hermes/crawl-output-20260522-1900.json`, `var/hermes/search-notes-20260522-1900.json`。

## 2026-05-22T17:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文BESS/电池RSS sha256 `362876cc...` 较16:00新增“十五五”新型储能发展实施方案已编制完成等待发布、北航高温质子交换膜燃料电池进展、磷酸铁锂高端化争议；中文储能RSS sha256 `af049f0f...` 新增东久0.5MW/1.044MWh储能电站及充电桩项目、电池材料排产向好碳酸锂需求韧性线索。
- 海外新增：全球BESS RSS sha256 `30ec7285...` 与欧洲BESS RSS sha256 `1d42cd6a...` 较16:00新增Masdar选择阳光电源供应阿联酋24/7可再生能源项目、Invinity瑞士1.5GWh全钒液流电池、保加利亚在线储能超3.3GW、芬兰125MW电池项目交易。数据中心电力RSS sha256 `d0c3ddd4...` 新增电网电池受数据中心需求拉动、Electric Era CoPower等线索。
- 行情复核：SMM新能源 sha256 `3af5d11e...` 与SMM碳酸锂页 sha256 `4087cc16...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较16:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至17:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605221700`。Artifacts: `var/hermes/crawl-20260522-1700.py`, `var/hermes/crawl-output-20260522-1700.json`, `var/hermes/search-notes-20260522-1700.json`。

## 2026-05-22T16:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文BESS/电池RSS sha256 `bb4de9c2...` 较15:00新增2026世界动力电池大会9月3-4日宜宾举办、特来电与比亚迪电池战略合作、欣旺达或装车特斯拉等；中文储能RSS sha256 `d9861e98...` 新增地下储能、全钒液流电池导液板、草原超级充电宝等线索。
- 海外新增：全球储能政策RSS sha256 `194445d2...` 较15:00新增美国Q1储能部署约10GWh纪录、Spearmint约4.5亿美元/600MWh ERCOT融资、Ford Energy/EDF最高20GWh合作、Antora 5GWh热电池项目和德州480MWh开发线索。
- 行情复核：SMM新能源 sha256 `8ef9e538...` 与SMM碳酸锂页 sha256 `19eb5bdd...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较15:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至16:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表、MarketTrend资产版本和MarketTrend内置行情/舆情关键词至`202605221600`。Artifacts: `var/hermes/crawl-20260522-1600.py`, `var/hermes/crawl-output-20260522-1600.json`, `var/hermes/search-notes-20260522-1600.json`。

## 2026-05-22T15:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `91d04343...` 较14:00新增新浪财经“阳光电源再揽中东7.5GWh超级大单”、DoNews“十五五新型储能发展实施方案编制完成”、虎嗅碳酸锂价格高位震荡、CESC2026储能大会定档南京等。
- 电池产业新增：中文BESS/电池RSS sha256 `1232c567...` 较14:00新增高镍三元补位eVTOL、比亚迪第二代刀片电池/闪充、退役电池重生、固态锂电池451.5Wh/kg等。
- 海外新增：pv magazine sha256 `580aff1a...` 新增墨西哥启动与CFE挂钩的可再生能源及储能项目征集、哥伦比亚输电容量分配规则、Anker Solix E10深度评测；SolarQuarter sha256 `62d8c4e4...` 新增IRENA理事会、EBRD土耳其绿色融资等。
- 行情复核：SMM新能源 sha256 `e0ebe7d4...` 与SMM碳酸锂页 sha256 `b7dd71db...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较14:00采集值未变。
- 动作：已更新`data/feed.js` generated_at/checked_at至15:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221500`。Artifacts: `var/hermes/crawl-20260522-1500.py`, `var/hermes/crawl-output-20260522-1500.json`, `var/hermes/search-notes-20260522-1500.json`。

## 2026-05-22T14:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增：中文储能RSS sha256 `ad054394...` 较13:00新增搜狐网“十五五”新型储能发展实施方案已编制完成等待发布”、泰山财经新平储能电站企业开放日、时代储能网海洋重力储能、汽车之家MG4半固态电池+CTB。
- 电池产业新增：中文BESS/电池RSS sha256 `23466112...` 较13:00新增2026世界动力电池大会9月3日至4日在宜宾举办、比亚迪/宁德时代磷酸铁锂高端定义争议、电池ETF份额变化等。
- 行情复核：SMM新能源 sha256 `9b059c1d...` 与SMM碳酸锂页 sha256 `a657511c...` 显示电池级碳酸锂178000元/吨、日跌4000；SMM电池级碳酸锂指数178343元/吨、日跌3389；磷酸铁锂61285元/吨、日跌970，较13:00采集值未变。
- 海外复核：全球BESS/储能政策/欧洲BESS/固态钠电RSS均已抓取；前20条相较13:00无更强新增标题，保留前序海外BESS线索继续跟踪。
- 动作：已更新`data/feed.js` generated_at/checked_at至14:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221400`。Artifacts: `var/hermes/crawl-20260522-1400.py`, `var/hermes/crawl-output-20260522-1400.json`, `var/hermes/search-notes-20260522-1400.json`。

## 2026-05-22T13:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `73b29a75...`，`/markettrend/` HTTP 200 sha256 `3b240416...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 行情新增变化：SMM新能源 sha256 `763e00e6...` 显示磷酸铁锂61285元/吨、日跌970元/吨，较12:00采集值62255元/吨下修970；SMM碳酸锂页 sha256 `403f49a8...` 显示电池级碳酸锂178000元/吨、日跌4000元/吨，SMM电池级碳酸锂指数178343元/吨、日跌3389元/吨。
- 国内新增/强化：中文储能RSS sha256 `f3886d0a...` 较12:00新增南方日报“为大湾区电网装上副交感神经”和凤凰网汽车“工信部加快十五五标准构建，固态电池、L3全拿下”；中文BESS/电池RSS sha256 `81e287b9...` 新增重庆微型同位素电池、东风氢燃料电池10000小时耐久验证、清陶能源IPO、奇瑞星途ES8固态电池等线索。
- 海外新增/复核：全球固态/钠电RSS sha256 `aae509a2...` 较12:00新增Electrek“Solid-state EV batteries hit another major milestone in China”；全球BESS/储能政策RSS本轮无更强新题材，保留12:00 Sungrow-Masdar 7.5GWh线索。
- 动作：已更新`data/feed.js` generated_at/checked_at至13:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221300`。Artifacts: `var/hermes/crawl-20260522-1300.py`, `var/hermes/crawl-output-20260522-1300.json`, `var/hermes/search-notes-20260522-1300.json`。

## 2026-05-22T12:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `dd95b4f0...`，`/markettrend/` HTTP 200 sha256 `873ba745...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增/强化：中文BESS/电池RSS sha256 `e2d2f9e4...` 较11:00新增界面新闻“阳光电源宣布中标阿联酋7.5GWh储能订单”；中文储能RSS sha256 `8cbde658...` 新增90台储能集装箱出海厦门港口局护航、工信部十五五标准构建/固态电池/L3线索。北极星储能 sha256 `dad739f1...` 显示重庆推动储能参与电力交易、现货和辅助服务，新疆推动独立储能全面参与调频辅助服务，天津10个储能相关项目入选先进智能工厂，福建钠科万吨钠电正极+1GWh系统集成项目获环评受理。
- 海外新增/复核：全球BESS RSS sha256 `a395c2c0...` 新增PR Newswire“Sungrow and Masdar Sign 7.5GWh Energy Storage System for Abu Dhabi’s World First RTC Project”，与中文RSS形成交叉验证；同时新增Guilderland BESS moratorium。
- 行情复核：SMM碳酸锂页 sha256 `19eb5bdd...` 和SMM新能源页 sha256 `9c2595e4...` 均显示电池级碳酸锂178000元/吨、日跌4000元/吨，SMM电池级碳酸锂指数178343元/吨、日跌3389元/吨；磷酸铁锂62255元/吨、日涨725元/吨，电解液28950元/吨持平，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至12:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221200`。已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605221200`均为200，首页与MarketTrend版本号、feed generated_at/headline关键词验证通过。Artifacts: `var/hermes/crawl-20260522-1200.py`, `var/hermes/crawl-output-20260522-1200.json`, `var/hermes/search-notes-20260522-1200.json`。

## 2026-05-22T11:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `ff8c9f83...`，`/markettrend/` HTTP 200 sha256 `02025562...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增/强化：北极星储能sha256 `3ce33496...` 首页显示广西灌阳150MW/600MWh构网型独立储能EPC招标、配套15MW/30s超级电容调频系统，并显示安徽300MW/600MWh电网侧储能EPC招标；中文储能RSS sha256 `f0f41f7c...` 较10:00新增界面新闻Q1净利同比+84.31%、汉阳大学固态电池阴极保护层、华泰期货碳酸锂宽幅震荡、广西桂林600MWh招标；中文BESS/电池RSS sha256 `b348a2dd...` 新增高比能固态锂电池451.5Wh/kg进展和印度电池计划线索。
- 海外新增/复核：ESS News sha256 `65ea4658...` 与欧洲BESS RSS sha256 `4261868c...` 显示IRENA 2035年35%电气化目标、2035年2.5TW和2050年6.9TW储能目标；全球BESS RSS sha256 `4cb4b0bf...` 新增New Energy New York向美国电池技术项目授予31.4万美元以上资金。
- 行情复核：SMM碳酸锂页sha256 `dca4f593...` 和SMM新能源页sha256 `56714c94...` 均显示电池级碳酸锂178000元/吨、日跌4000元/吨，SMM电池级碳酸锂指数178343元/吨、日跌3389元/吨；磷酸铁锂62255元/吨、日涨725元/吨，电解液28950元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至11:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221100`。Artifacts: `var/hermes/crawl-20260522-1100.py`, `var/hermes/crawl-output-20260522-1100.json`, `var/hermes/search-notes-20260522-1100.json`。

## 2026-05-22T10:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `e4051389...`，`/markettrend/` HTTP 200 sha256 `1ee30180...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增/强化：中文储能RSS sha256 `5e8bdacc...` 较09:00新增财联社“固态电池产业化持续推进”、国际储能网“云能魔方170MWh移动储能项目交付”、弘正储能后集成时代竞争力、盐穴储气；中文BESS/电池RSS sha256 `14ef9cff...` 新增电池ETF华泰柏瑞上市、蜂巢能源9月混合固液电池装车量产、2026年新能源城市公交车及动力电池更新补贴实施细则、SpaceX得州10GW太阳能工厂。
- 海外新增/复核：全球BESS RSS sha256 `a7ab2243...` 新增Ford AI相关储能业务；全球储能政策RSS sha256 `58ba76c8...` 新增/强化Texas电池储能纪录、美国Q1部署10GWh、哥伦比亚储能规则；欧洲BESS RSS sha256 `84c8af74...` 无新增标题，继续显示EBRD 302MW/最高7000万欧元、波兰300MW BESS、HyperStrong/SMA。
- 行情复核：SMM碳酸锂页sha256 `38947768...` 显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `902107bb...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，光伏组件模型日期2026-05-22，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至10:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605221000`；已通过rsync部署至`neolink:/var/www/neolink/`。HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605221000`均为200，版本号、feed generated_at与“云能魔方170MWh”“固态电池”“182000”关键词验证通过。Artifacts: `var/hermes/crawl-20260522-1000.py`, `var/hermes/crawl-output-20260522-1000.json`, `var/hermes/search-notes-20260522-1000.json`。

## 2026-05-22T09:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5339e669...`，`/markettrend/` HTTP 200 sha256 `6f8ad48f...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 国内新增/强化：中文储能RSS sha256 `e8e26f0c...` 较08:00新增国际储能网“大力储能与湖北矿投签署战略合作协议”、新浪财经“清陶能源越卖越亏、连续资不抵债，IPO能否成为解药？”；中文BESS/电池RSS sha256 `b3ca5c38...` 新增新能源电池ETF银华半日成交1814.57万元、比亚迪第二代刀片电池及闪充技术、印度20亿美元电池计划执行落差。
- 海外复核：全球BESS RSS sha256 `faf464cb...` 和欧洲BESS RSS sha256 `1a475a1b...` 较08:00无新增标题，继续显示South Dakota 1.74亿美元BESS许可、Michigan储能审批、Ford改造前BlueOval SK工厂、数据中心电网电池、EBRD支持302MW/最高7000万欧元、波兰300MW BESS、HyperStrong/SMA合作。
- 行情复核：SMM碳酸锂页sha256 `84e7bada...` 显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `7a24a34b...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，光伏组件成分计价模型日期2026-05-22，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至09:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605220900`；已通过rsync部署至`neolink:/var/www/neolink/`。HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605220900`均为200，版本号、feed generated_at与“大力储能”“清陶能源”“182000”关键词验证通过。Artifacts: `var/hermes/crawl-20260522-0900.py`, `var/hermes/crawl-output-20260522-0900.json`, `var/hermes/search-notes-20260522-0900.json`。

## 2026-05-22T07:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5339e669...`，`/markettrend/` HTTP 200 sha256 `6f8ad48f...`；web_search三组国内/海外查询HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `4c8660a8...` 新增/上移South Dakota 1.74亿美元BESS许可申请、E&E News数据中心推动电网电池；欧洲BESS RSS sha256 `4fd00d6a...` 新增EBRD支持302MW储能/最高7000万欧元贷款、波兰300MW BESS、HyperStrong/SMA合作。
- 国内复核：中文RSS sha256 `bff4444f...` / `630adbb6...` 显示阳光电源中东7.5GWh、内蒙古“超级充电宝”、湖北京山100MW/200MWh独立储能送电、融科储能钒液流IEC标准、451.5Wh/kg固态锂电池研究进展。
- 行情复核：SMM碳酸锂页sha256 `f424ce1b...` 显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `74183ce8...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，光伏组件成分计价模型日期2026-05-22，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至07:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605220700`。Artifacts: `var/hermes/crawl-20260522-0700.py`, `var/hermes/crawl-output-20260522-0700.json`, `var/hermes/search-notes-20260522-0700.json`。

## 2026-05-22T05:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5339e669...`，`/markettrend/` HTTP 200 sha256 `6f8ad48f...`；web_search国内HTTP 432、海外SSL超时，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `d9bec491...` 较04:00新增WDRB/Ford改造前BlueOval SK工厂以满足电池储能需求、Utility Dive/Enbridge与Meta 365MW太阳能+200MW储能项目；全球储能政策RSS sha256 `775862c0...` 新增哥伦比亚储能规则/投资者线索、美国单季10GWh储能纪录、加州插电式太阳能法案含电池储能条款。
- 国内复核：中文RSS sha256 `96110e2a...` / `c6733817...` 显示阳光电源中东7.5GWh、阿联酋30GW光伏+8GW储能、内蒙古“超级充电宝”、CIBF2026电池技术进展、量产全固态电池实测、融科储能钒液流电池IEC标准立项等。
- 行情复核：SMM碳酸锂页sha256 `accf7f8f...` 显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `9234e0d7...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，光伏组件成分计价模型日期2026-05-22，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至05:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605220500`。Artifacts: `var/hermes/crawl-20260522-0500.py`, `var/hermes/crawl-output-20260522-0500.json`, `var/hermes/search-notes-20260522-0500.json`。

## 2026-05-22T02:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `6afbbcb6...`，`/markettrend/` HTTP 200 sha256 `01a064ce...`；web_search国内/海外仍HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `459a1fe7...` 较01:00新增PR Newswire/PowerBank纽约州北部三个项目合计60MWh、The Olympian的Thurston County储能设施上诉、Solar Builder美国Q1 2026储能创纪录、GeekWire/Electric Era数据中心电池系统；全球储能政策RSS sha256 `e5cc1abd...` 新增SEIA电网安全/光储、PowerBank 60MWh、Solar Builder和ESS News/IRENA 35%电气化目标。
- 国内复核：中文RSS sha256 `115d426b...` / `2308f474...` 较01:00新增证券日报“全球化布局成效凸显 阳光电源斩获海外储能大单”和汽车之家比亚迪二代刀片/固态电池线索；继续显示阳光电源中东7.5GWh、阿联酋30GW光伏+8GW储能、锂价供给扰动等。
- 行情复核：SMM碳酸锂页sha256 `8f240321...` 显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `d18db225...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，光伏组件成分计价模型日期2026-05-22，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至02:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605220200`；已通过rsync部署至`neolink:/var/www/neolink/`。HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605220200`均为200，版本号、feed generated_at与`PowerBank`、`Electric Era`、`182000`关键词验证通过。Artifacts: `var/hermes/crawl-20260522-0200.py`, `var/hermes/crawl-output-20260522-0200.json`, `var/hermes/search-notes-20260522-0200.json`。

## 2026-05-22T01:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `6afbbcb6...`，`/markettrend/` HTTP 200 sha256 `01a064ce...`；web_search国内/海外仍HTTP 432，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `3e52de51...` 较00:00新增Batteries News的OCI Energy/CPS Energy开工Alamo City Battery Energy Storage Project、pv magazine USA美国单季部署创纪录10GWh储能、Killeen Daily Herald补充Savoy BESS时间线；全球储能政策RSS sha256 `8a51ef47...` 新增Solar Power Portal关于Island Green Power英国125MW BESS许可。
- 国内复核：中文RSS sha256 `0fbd8864...` / `38490296...` 较00:00新增/强化阿联酋30GW光伏+8GW储能超级工程、中东储能出海、第三代元PLUS二代刀片电池+闪充、旧锂电池安全风险、固态电池设备卡位等；北极星 sha256 `d23f3b0e...` 继续显示阳光电源阿联酋7.5GWh、河北400MW/1.6GWh构网型储能招标等。
- 行情复核：SMM碳酸锂页sha256 `e5a891c1...` 显示电池级碳酸锂180000-184000元/吨、均价182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `aeec4dcf...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至01:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605220100`。Artifacts: `var/hermes/crawl-20260522-0100.py`, `var/hermes/crawl-output-20260522-0100.json`, `var/hermes/search-notes-20260522-0100.json`。

## 2026-05-22T00:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `6afbbcb6...`，`/markettrend/` HTTP 200 sha256 `01a064ce...`；web_search国内/海外仍HTTP 432，web_extract本站回读被私网策略阻断，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `5508f714...` 较23:00新增KTEN Savoy BESS时间线、Frontier Power USA收购Bimerg储能项目、计划480MWh Texas电池建设、EDF Power波兰大型储能电池；ESS News sha256 `6da134f7...` 显示IRENA提出2035年全球电气化35%目标，并提及2035年2.5TW、2050年6.9TW储能/风光项目排队。
- 国内复核：中文RSS sha256 `748553e2...` / `fe6625b9...` 较23:00新增/强化新京报锂价供给扰动、晶澳储能新总裁、比亚迪全固态电池车规验证/2027量产、清陶能源IPO等；北极星 sha256 `d23f3b0e...` 继续显示阳光电源阿联酋7.5GWh、河北400MW/1.6GWh构网型储能招标、宁夏200MW/400MWh共享储能EPC候选人。
- 行情复核：SMM碳酸锂页sha256 `90bdd367...` 显示电池级碳酸锂180000-184000元/吨、均价182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `cc5895a6...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至00:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605220000`。Artifacts: `var/hermes/crawl-20260522-0000.py`, `var/hermes/crawl-output-20260522-0000.json`, `var/hermes/search-notes-20260522-0000.json`。

## 2026-05-21T23:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，web_extract本站回读被私网策略阻断，改用requests直连、Google News RSS和原始HTML落盘，未仅刷新时间。
- 海外新增/强化：全球BESS RSS sha256 `55d72316...` 显示Michigan Public密歇根地方政府支持储能、Spearmint约4.5亿美元融资支持ERCOT 600MWh BESS、GridStor收购Colorado 199MW/796MWh Birdseye项目、PowerBank 60MWh、数据中心电网电池和Ford/EDF最高20GWh框架。
- 国内复核：中文RSS sha256 `61422e63...` / `e377bcc3...` 显示海辰储能517公益实践、阳光电源中东7.5GWh、晶澳储能管理调整、CIBF2026、融科钒液流IEC标准、内江钠电、4月电池产量同比+34%等。
- 行情复核：SMM碳酸锂页sha256 `d4863eb2...` 显示电池级碳酸锂180000-184000元/吨、均价182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨；SMM新能源页sha256 `b87f21e1...` 显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨，280Ah储能LFP电芯成本模型+1.54%。
- 动作：已更新`data/feed.js` generated_at/checked_at至23:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605212300`。Artifacts: `var/hermes/crawl-20260521-2300.py`, `var/hermes/crawl-output-20260521-2300.json`, `var/hermes/search-notes-20260521-2300.json`。

## 2026-05-21T20:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，web_extract本站回读被私网策略阻断，改用requests直连、Google News RSS和候选页，未仅刷新时间。
- 海外新增/强化：Google News全球BESS RSS sha256 `d839f99f...`显示PowerBank纽约州北部三个项目合计60MWh、ESS News加州插电式太阳能法案含储能条款、E&E/POLITICO数据中心推动电网电池增长、CPS Energy大型储能系统等。
- 国内复核：中文RSS sha256 `3be8a1d4...` / `b6bde0fd...`继续显示中国网内蒙古“超级充电宝”、鲁西电厂熔盐储能GIS间隔接入完成、云能魔方170MWh移动储能交付、CIBF2026电池技术进展、融科储能两项钒液流IEC标准获批立项等。
- 行情复核：SMM碳酸锂页sha256 `dcc192b2...`显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `4510ec5e...`显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至20:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605212000`。Artifacts: `var/hermes/crawl-20260521-2000.py`, `var/hermes/crawl-output-20260521-2000.json`, `var/hermes/article-fetch-20260521-2000.py`, `var/hermes/article-fetch-20260521-2000.json`, `var/hermes/search-notes-20260521-2000.json`。

## 2026-05-21T19:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和候选页，未仅刷新时间。
- 国内新增：Google News中文RSS sha256 `6724f185...` / `067541f1...`显示中国网内蒙古“超级充电宝”、鲁西电厂熔盐储能GIS间隔接入完成、云能魔方170MWh移动储能交付、CIBF2026电池技术进展、融科储能两项钒液流IEC标准获批立项等。
- 海外新增：Google News全球BESS RSS sha256 `a7f30066...`显示E&E/POLITICO数据中心推动电网电池增长、Business Journals CPS Energy大型储能系统；Google News钠电/固态/碳酸锂RSS sha256 `efe89897...`显示Benchmark称中国4月电池出口在税退变化后仍强。
- 行情复核：SMM碳酸锂页sha256 `ada8690b...`显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `093a26bb...`显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至19:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211900`。Artifacts: `var/hermes/crawl-20260521-1900.py`, `var/hermes/crawl-output-20260521-1900.json`, `var/hermes/article-fetch-20260521-1900.py`, `var/hermes/article-fetch-20260521-1900.json`, `var/hermes/search-notes-20260521-1900.json`。

## 2026-05-21T18:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和文章页，未仅刷新时间。
- 国内新增：SMM储能电芯周评sha256 `9df5c016...`（18:00发布）显示“630”备货拉动储能市场供需两旺、产能紧俏，但涨价受阻且局部延迟提货；SMM碳酸锂库存分析sha256 `cbea0507...`显示大样本库存总计137260吨、环比-0.8%，仓单总量超过5万吨。
- 海外新增/复核：SEIA Q2 2026 sha256 `b5a20286...`显示美国Q1新增9.7GWh储能；Energy-Storage.News sha256 `3a58d0bb...`显示东盟BESS政策/市场框架需演进；同站复核日本1.251GW BESS、NSW 2128MWh储能。
- 行情复核：SMM碳酸锂页sha256 `e8ff7a30...`显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `bc16c2ff...`显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至18:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211800`。Artifacts: `var/hermes/crawl-20260521-1800.py`, `var/hermes/crawl-output-20260521-1800.json`, `var/hermes/article-fetch-20260521-1800.py`, `var/hermes/article-fetch-20260521-1800.json`, `var/hermes/search-notes-20260521-1800.json`。

## 2026-05-21T17:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，Google News RSS直连SSL失败，改用公开页面直连和文章页，未仅刷新时间。
- 国内新增：北极星储能sha256 `fa8b2e4c...`显示河北交投400MW/1.6GWh构网型储能系统招标、宁夏200MW/400MWh共享储能EPC中标候选人、四川宜宾储能超400MW/800MWh重点项目、瑞浦兰钧获易工品2GWh电芯大单；EnergyTrend文章sha256 `50d71d87...`显示7个电池和储能项目总投资超283亿元。
- 海外新增：ESS News sha256 `94c8a7f8...`显示Antora热碳电池获美国5GWh储能项目；SolarQuarter sha256 `b3b20e14...`显示EBRD 7000万欧元支持欧洲大型电池储能，另复核Trina Storage Elementa 3、Equis澳大利亚2.5GW可再生能源和电池储能组合。
- 行情复核：SMM碳酸锂页sha256 `9723b474...`显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `671773b7...`显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至17:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211700`。Artifacts: `var/hermes/crawl-20260521-1700.py`, `var/hermes/crawl-output-20260521-1700.json`, `var/hermes/article-fetch-20260521-1700.py`, `var/hermes/article-fetch-20260521-1700.json`, `var/hermes/article-fetch-extra-20260521-1700.py`, `var/hermes/article-fetch-extra-20260521-1700.json`, `var/hermes/search-notes-20260521-1700.json`。

## 2026-05-21T16:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和文章页，未仅刷新时间。
- 国内新增：中文RSS sha256 `6029b068...` / `5114e369...`显示融科储能两项钒液流电池IEC标准获批立项、河南南阳淅川100MW/200MWh独立储能招标、阳光电源中东7.5GWh储能订单、内蒙古90MW/360MWh储能项目并网等线索。
- 海外新增：英文RSS sha256 `cca5907f...`显示英国BESS盈利需更复杂交易策略、OCI/CPS Texas 120MW电池项目开工、GridStor收购Colorado Birdseye battery项目等线索；SEIA Q2储能展望继续复核。
- 行情复核：SMM碳酸锂页sha256 `262fbf8f...`显示电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `d0ba4b01...`显示磷酸铁锂62255元/吨、日涨725元/吨，高端储能人造石墨25100元/吨持平。
- 动作：已更新`data/feed.js` generated_at/checked_at至16:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211600`。Artifacts: `var/hermes/crawl-20260521-1600.py`, `var/hermes/crawl-output-20260521-1600.json`, `var/hermes/article-fetch-20260521-1600.py`, `var/hermes/article-fetch-20260521-1600.json`, `var/hermes/search-notes-20260521-1600.json`。

## 2026-05-21T13:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和站内链接，未仅刷新时间。
- 国内新增/复核：SMM碳酸锂页sha256 `2b02b353...`显示5月21日电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `b70c9f86...`显示磷酸铁锂62255元/吨、日涨725元/吨（较12:00记录61530元/吨出现日内上修）。
- 海外新增采信：SEIA Q2 2026 Outlook sha256 `552a05e1...`披露美国Q1新增储能9.7GWh、同比+32%，公用事业规模7.8GWh/1.5GW，2030年年新增超110GWh、累计613GWh；Energy-Storage.News REPT文章sha256 `11ae0e7f...`披露印尼8GWh储能锂电池及BESS制造设施开业、投资2.23亿美元；AC/DC augmentation文章sha256 `3ee1954b...`补充系统增容方法证据。
- 动作：已更新`data/feed.js` generated_at/checked_at至13:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211300`。Artifacts: `var/hermes/crawl-20260521-1300.py`, `var/hermes/crawl-output-20260521-1300.json`, `var/hermes/article-fetch-20260521-1300.py`, `var/hermes/article-fetch-20260521-1300.json`, `var/hermes/search-notes-20260521-1300.json`。

## 2026-05-21T12:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和站内链接，未仅刷新时间。
- 国内新增/复核：SMM碳酸锂页sha256 `262fbf8f...`显示5月21日电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `cc906eca...`显示磷酸铁锂61530元/吨、日跌1820元/吨。工信部五部门废旧动力电池回收联合执法通知sha256 `0a3e63cb...`补充电池回收合规线索。
- 海外新增采信：ESN Edify文章sha256 `fdee7e16...`披露澳洲昆士兰600MW/2,400MWh BESS+720MWp光伏完成财务关闭，Rio Tinto 20年协议采购90%容量；ESN EDP文章sha256 `12651b4b...`披露ARENA 300万澳元微网资金；ESN Sunraycer文章sha256 `9877ac82...`披露美国得州三个光储项目9.01亿美元融资。
- 动作：已更新`data/feed.js` generated_at/checked_at至12:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211200`。Artifacts: `var/hermes/crawl-20260521-1200.py`, `var/hermes/crawl-output-20260521-1200.json`, `var/hermes/article-fetch-20260521-1200.py`, `var/hermes/article-fetch-20260521-1200.json`, `var/hermes/search-notes-20260521-1200.json`。

## 2026-05-21T11:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和站内链接，未仅刷新时间。
- 国内新增采信：SMM碳酸锂页sha256 `ed1f9e24...`显示5月21日电池级碳酸锂182000元/吨、日涨3000元/吨，SMM电池级碳酸锂指数181732元/吨、日涨2116元/吨；SMM新能源页sha256 `3a524efe...`显示磷酸铁锂61530元/吨、日跌1820元/吨。中国能源网质监大纲sha256 `2c3f6d8f...`继续作为监管背景证据。
- 海外新增采信：ESS News澳洲文章sha256 `91a6caf2...`披露2.4GWh财务关闭及200MWh开建；ESS News德国文章sha256 `2ed7e681...`披露2GWh储能规划；ESS News加州文章sha256 `ac495b51...`披露400MWh独立电池投运；SolarQuarter马来西亚文章sha256 `067d2890...`披露100MW/400MWh Santong BESS；ESN瑞浦兰钧印尼文章sha256 `9cf40dd7...`披露电芯和BESS制造设施投产。
- 动作：已更新`data/feed.js` generated_at/checked_at至11:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211100`。Artifacts: `var/hermes/crawl-20260521-1100.py`, `var/hermes/crawl-output-20260521-1100.json`, `var/hermes/article-fetch-20260521-1100.py`, `var/hermes/article-fetch-20260521-1100.json`, `var/hermes/search-notes-20260521-1100.json`。

## 2026-05-21T10:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `5c779bac...`，`/markettrend/` HTTP 200 sha256 `0cc08a82...`；web_search国内/海外仍HTTP 432，改用公开页面直连、Google News RSS和站内链接，未仅刷新时间。
- 国内新增采信：中国能源网/科技日报质监大纲sha256 `2c3f6d8f...`显示国家能源局发布新型储能电站建设工程质量监督大纲，适用于电源侧/电网侧100MW及以上电化学储能和压缩空气储能工程；EnergyTrend楚能文章sha256 `fc9be8c9...`显示武汉、宜昌、孝感三项锂电项目节能审查获批，合计新增规划产能290GWh。SMM碳酸锂页sha256 `b2a10f3d...`复核电池级碳酸锂179000元/吨、指数179616元/吨；SMM新能源页sha256 `c749ab8e...`复核磷酸铁锂61530元/吨。
- 海外新增采信：ESN Ford-EDF文章sha256 `1231e453...`显示五年BESS供应框架每年最高4GWh、总潜在20GWh；ESN日本OCCTO文章sha256 `c84e892c...`显示19个BESS项目合计1,251MW且有6小时要求；ESN新南威尔士文章sha256 `33ebc03b...`显示第七轮firming tender签约2,128MWh储能；ESN澳洲户储文章sha256 `ba0a6426...`显示户用电池超过40万套、累计11.2GWh。
- 动作：已更新`data/feed.js` generated_at/checked_at至10:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605211000`。Artifacts: `var/hermes/crawl-20260521-1000.py`, `var/hermes/crawl-output-20260521-1000.json`, `var/hermes/article-fetch-20260521-1000.py`, `var/hermes/article-fetch-20260521-1000.json`, `var/hermes/search-notes-20260521-1000.json`。

## 2026-05-21T09:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `1c8e2173...`，`/markettrend/` HTTP 200 sha256 `56dbd069...`；web_search国内/海外仍HTTP 432，改用公开页面直连与Google News RSS，未仅刷新时间。
- 国内新增采信：中国能源网/财联社六氟磷酸锂文章sha256 `02c97b4b...`显示均价113500元/吨、单周涨超12%、行业库存约一周；SMM碳酸锂页sha256 `b943e12c...`复核电池级碳酸锂179000元/吨、指数179616元/吨，SMM新能源页sha256 `bca96718...`复核磷酸铁锂61530元/吨。
- 海外新增采信：SolarQuarter/JMK-IEEFA文章sha256 `9a10f948...`显示印度储能累计招标容量2018年6.8GW增至2025年90.7GW、2025年独立BESS分配10.4GW；ESN Sunraycer文章sha256 `213e6853...`显示9.01亿美元融资支持479.5MW光伏+236.5MW两小时BESS；SolarQuarter埃及文章sha256 `9087aebc...`显示Obelisk 1.1GW光伏+200MWh BESS通过EETC研究；ESN Canadian Solar文章sha256 `0dab0723...`显示计划翻倍电芯/BESS制造能力，E-Storage Q1外部BESS出货2.1GWh、同比+142%。
- 动作：已更新`data/feed.js` generated_at/checked_at至09:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605210900`。已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605210900`均为200，版本号、feed generated_at与`六氟磷酸锂`、`90.7GW`、`113500`关键词验证通过。Artifacts: `var/hermes/crawl-20260521-0900.py`, `var/hermes/crawl-output-20260521-0900.json`, `var/hermes/article-fetch-20260521-0900.py`, `var/hermes/article-fetch-20260521-0900.json`, `var/hermes/search-notes-20260521-0900.json`。

## 2026-05-21T08:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `1c8e2173...`，`/markettrend/` HTTP 200 sha256 `56dbd069...`；web_search国内/海外仍HTTP 432，改用公开页面直连与Google News RSS，未仅刷新时间。
- 国内新增采信：中国能源网储能招标文章sha256 `6e85758f...`显示2026年4月储能EPC/PC、储能系统、储能电芯新增招标27.2GW/85.3GWh，同比+132%，创月度新高；中国能源网/科技日报质监大纲文章sha256 `2c3f6d8f...`显示适用电源侧和电网侧100MW及以上电化学储能、压缩空气储能工程。
- 海外新增采信：ESS News澳洲文章sha256 `ffa3a213...`显示Edify两个昆士兰光储项目合计2.4GWh BESS；ESS News德国文章sha256 `767c09a3...`显示德国Bühl计划500MW/2GWh BESS；ESN瑞浦印尼文章sha256 `0ae6f45c...`显示8GWh电芯与BESS制造设施开业；ESN NSW文章sha256 `b47de452...`显示2,128MWh储能容量被锁定。
- MarketTrend/SMM：SMM碳酸锂页sha256 `d547adb5...`复核电池级碳酸锂179000元/吨、指数179616元/吨；SMM新能源页sha256 `4209cb03...`复核磷酸铁锂61530元/吨；不把08:00读取时间写成报价发布日期。
- 动作：已更新`data/feed.js` generated_at/checked_at至08:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605210800`。Artifacts: `var/hermes/crawl-20260521-0800.py`, `var/hermes/crawl-output-20260521-0800.json`, `var/hermes/article-fetch-20260521-0800.py`, `var/hermes/article-fetch-20260521-0800.json`, `var/hermes/search-notes-20260521-0800.json`。

## 2026-05-21T07:00:00+08:00 strict global crawl — updated
- 重新读取：NeoLink首页HTTP 200 sha256 `97c22c20...`，`/markettrend/` HTTP 200 sha256 `4ec47b44...`；web_search国内/海外仍HTTP 432，改用公开页面直连与Google News RSS，未仅刷新时间。
- 国内新增采信：EnergyTrend楚能文章sha256 `fc9be8c9...`显示湖北发改委对楚能武汉、宜昌、孝感三地锂离子电池制造项目作出节能审查批复，合计新增规划产能290GWh；SMM国轩文章sha256 `8ab36a87...`显示2GWh全固态电池量产线设计完成；SMM源电文章sha256 `7c42ab07...`显示池州0.2GWh固态及固液混合电池科研总部成立。
- 海外新增采信：Energy-Storage.News Antora文章sha256 `f2ed6492...`显示美国南达科他州POET生物燃料工厂部署5GWh多日时长热储能系统。
- MarketTrend/SMM：SMM碳酸锂页sha256 `44293fdd...`复核电池级碳酸锂仍为179000元/吨、日跌7500元/吨；不把07:00读取时间写成报价发布日期。
- 动作：已更新`data/feed.js` generated_at/checked_at至07:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本、移动端兜底列表和MarketTrend资产版本至`202605210700`。Artifacts: `var/hermes/crawl-20260521-0700.py`, `var/hermes/crawl-output-20260521-0700.json`, `var/hermes/article-fetch-20260521-0700.py`, `var/hermes/article-fetch-20260521-0700.json`, `var/hermes/article-extra-20260521-0700.json`, `var/hermes/search-notes-20260521-0700.json`。

## 2026-05-21T06:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `97c22c20...`，`/markettrend/` HTTP 200 sha256 `4ec47b44...`；web_search国内/海外仍HTTP 432，改用requests抓取公开源和Google News RSS，未仅刷新时间。
- 国内行情/成本：SMM新能源sha256 `f38f3966...`显示电池级碳酸锂179000元/吨、日跌7500元/吨，SMM电池级碳酸锂指数179616元/吨；储能型方形LFP电芯成本项+1.54%。
- 海外新增采信：Energy-Storage.News日本拍卖文章sha256 `458bfee2...`显示19个BESS项目、合计1,251MW、6小时容量要求；NSW文章sha256 `a87e0b6b...`显示532MW firming/2,128MWh储能；ESS News德国文章sha256 `4c9d55ca...`显示Bühl规划500MW/2GWh四小时储能；瑞浦兰钧印尼基地sha256 `c814cf83...`与EnergyTrend 22GWh订单汇总sha256 `6053aea5...`补强制造/订单证据。
- 动作：已更新`data/feed.js` generated_at/checked_at至06:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605210600`。Artifacts: `var/hermes/crawl-20260521-0600.py`, `var/hermes/crawl-output-20260521-0600.json`, `var/hermes/article-fetch-20260521-0600.py`, `var/hermes/article-fetch-20260521-0600.json`, `var/hermes/search-notes-20260521-0600.json`。

## 2026-05-21T05:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `97c22c20...`，`/markettrend/` HTTP 200 sha256 `4ec47b44...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源和Google News RSS，未仅刷新时间。
- 国内行情/成本：SMM新能源首页sha256 `ccff3dc2...`显示光伏组件成分计价模型日期更新至2026-05-21，锂离子电芯成本模型为2026-04，储能型方形LFP电芯成本项+1.54%；SMM碳酸锂页sha256 `44293fdd...`仍为电池级碳酸锂179000元/吨、指数179616元/吨。
- 海外/全球新增：ESS News首页sha256 `75cf6d03...`出现澳大利亚BESS线索：2.4GWh财务关闭、OX2 200MWh开工；Google News中文RSS sha256 `ec9551c5...`出现澳洲10个月安装40万套户用电池、新增11.2GWh线索；英文RSS sha256 `7f13b915...`出现CPS Energy 120MW、GridStor科罗拉多BESS收购、Ford-EDF最高20GWh框架等线索。
- 动作：已更新`data/feed.js` generated_at/checked_at至05:00，新增headline/latest/materials/metrics/market/overseas/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605210500`。Artifacts: `var/hermes/crawl-20260521-0500.py`, `var/hermes/crawl-output-20260521-0500.json`, `var/hermes/article-fetch-20260521-0500.json`, `var/hermes/search-notes-20260521-0500.json`。

## 2026-05-21T03:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `97c22c20...`，`/markettrend/` HTTP 200 sha256 `4ec47b44...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源和Google News RSS，未仅刷新时间。
- 国内政策新增：中国能源网多用户绿电直连文章sha256 `169aee45...`，项目年自发自用电量占总可用发电量不低于60%，占总用电量不低于30%并逐步提高至35%以上；主责单位可统筹连接线路、变电设施、储能及运营平台。
- 国内项目/交易：北极星储能首页sha256 `8a417ed1...`本轮出现台区储能季度新增14GWh、安徽Q1独立储能现货结算收益约0.23元/kWh、江西需求响应鼓励独立储能/配储经虚拟电厂参与、山西200MW/400MWh独立储能EPC中标等线索。
- 行情复核：SMM碳酸锂页sha256 `44293fdd...`仍为电池级碳酸锂179000元/吨、日跌7500元/吨；SMM电池级碳酸锂指数179616元/吨、日跌4555元/吨；CIF中日韩21.55美元/千克。
- 海外新增：Batteries News Ford-EDF文章sha256 `bc57ae86...`，五年框架最高20GWh、每年4GWh DC Block BESS；Energy-Storage.News Moment文章sha256 `b541d3b7...`和Batteries News Moment文章sha256 `8afa438d...`，二次利用BESS安全认证涉及UL 1974/1973/9540。
- 动作：已更新`data/feed.js` generated_at/checked_at至03:00，新增headline/latest/materials/metrics/market/policy/overseas/safety/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605210300`。Artifacts: `var/hermes/crawl-20260521-0300.py`, `var/hermes/crawl-output-20260521-0300.json`, `var/hermes/article-fetch-20260521-0300.json`, `var/hermes/search-notes-20260521-0300.json`。

## 2026-05-21T01:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `221d03d4...`，`/markettrend/` HTTP 200 sha256 `6db185d7...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 国内政策/需求新增：工信部等五部门通知sha256 `0a3e63cb...`，全国开展废旧动力电池回收利用联合执法；中国能源网/国家能源局文章sha256 `a9f27ed9...`，4月全社会用电量8205亿千瓦时同比+6.0%，充换电服务业用电同比+61.9%，互联网数据服务同比+42.8%。
- 国内技术/行情：SMM国轩文章sha256 `4bf7ea9a...`，已完成2GWh全固态电池量产线设计；源电新能文章sha256 `9f0f1f79...`，池州0.2GWh固态/固液混合电池科研总部成立；SMM电池级碳酸锂页sha256 `494b9d25...`仍为179000元/吨、日跌7500元/吨。
- 海外新增：Energy-Storage.News日本文章sha256 `9f797dcf...`，日本容量市场选出19个BESS项目合计1,251MW并要求6小时；NSW文章sha256 `48faae9b...`，第七轮招标锁定532MW/2,128MWh储能；ESS News德国文章sha256 `ae9183d5...`，Bühl规划500MW/2GWh大型储能。
- 动作：已更新`data/feed.js` generated_at/checked_at至01:00，新增headline/latest/materials/metrics/market/policy/overseas/safety/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605210100`。已通过rsync部署至`neolink:/var/www/neolink/`；HTTP线上回读首页、`/markettrend/`、`data/feed.js?v=202605210100`和MarketTrend JS均为200，feed generated_at、`1,251MW`、`废旧动力电池`、MarketTrend版本与`sentimentScore:77`验证通过。Artifacts: `var/hermes/crawl-20260521-0100.py`, `var/hermes/crawl-output-20260521-0100.json`, `var/hermes/article-fetch-20260521-0100.json`, `var/hermes/search-notes-20260521-0100.json`。

## 2026-05-21T00:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `aed67b38...`，`/markettrend/` HTTP 200 sha256 `91e03ef0...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 国内电价/装机新增：CNESA电价文章sha256 `b497dc86...`，5月10省17细分区峰谷价差超0.6元/kWh、珠三角五市最高1.2547元/kWh，29省系统运行费上涨；CNESA装机文章sha256 `db609712...`，Q1新增10.43GW/27.05GWh，同比+59%/+76%。
- 政策新增：SMM快讯sha256 `b64b6c07...`、中国能源网通知sha256 `71837ea7...`，多用户绿电直连年自发自用电量占总可用发电量不低于60%、占总用电量不低于30%。
- 材料/企业/回收：SMM电池级碳酸锂页sha256 `8024a2e4...`仍为均价179000元/吨、日跌7500元/吨；中国能源网宁德时代文章sha256 `ce720d39...`显示Q1动力和储能电池销量超过200GWh、储能约25%；回收文章sha256 `930440a3...`显示正规产能利用率不足20%、约75%废旧动力电池未入正规网络。
- 海外/安全补充：Energy Storage Canada文章sha256 `535ef09a...`，加拿大2024年底储能552MW、2035年需10GW、2050年需35GW；CNESA英国火灾文章sha256 `4ff34ed1...`，Rufford 7MW/7MWh电站火灾暴露存量安全风险。
- 动作：已更新`data/feed.js` generated_at/checked_at至00:00，新增headline/latest/materials/metrics/market/policy/overseas/safety/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605210000`。已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605210000`均为200，版本号、feed generated_at与`1.2547`关键词验证通过。Artifacts: `var/hermes/crawl-20260521-0000.py`, `var/hermes/crawl-output-20260521-0000.json`, `var/hermes/article-fetch-20260521-0000.json`, `var/hermes/search-notes-20260521-0000.json`。

## 2026-05-20T23:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `aed67b38...`，`/markettrend/` HTTP 200 sha256 `91e03ef0...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外/产能新增：EnergyTrend楚能文章sha256 `fc9be8c9...`，三项目新增规划产能290GWh，四基地有效产能110GWh、在建及规划390GWh、总规划500GWh；订单汇总sha256 `6053aea5...`含Ford/EDF五年最高20GWh与瑞浦兰钧2GWh采购。
- 海外项目新增：ESS News澳大利亚文章sha256 `52107f5a...`，Edify两个昆士兰项目各配300MW/1200MWh储能，合计2.4GWh；德国文章sha256 `8cf9c9c3...`，Bühl拟建500MW/2GWh四小时储能。
- 国内技术补充：SMM/电池网国轩文章sha256 `6c24a05c...`，已完成2GWh全固态电池量产线设计；中虹普能文章sha256 `3d376fff...`，签约400MW/800MWh电网侧储能项目。
- 行情复核：SMM电池级碳酸锂页sha256 `0aab4b13...`仍为均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至23:00，新增headline/latest/materials/metrics/market/overseas/technology/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605202300`。Artifacts: `var/hermes/crawl-20260520-2300.py`, `var/hermes/crawl-output-20260520-2300.json`, `var/hermes/article-fetch-20260520-2300.json`, `var/hermes/search-notes-20260520-2300.json`。

## 2026-05-20T22:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `def30b0c...`，`/markettrend/` HTTP 200 sha256 `70030ce9...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：SolarQuarter/JMK-IEEFA文章sha256 `e3757e1e...`，印度累计招标储能容量由2018年6.8GW增至2025年90.7GW；2025年ESS占总招标容量超71%，独立BESS分配10.4GW；截至2026年3月已投运并网级BESS约1.8GWh。
- 国内材料新增：SMM人造石墨文章sha256 `e8127c16...`，2026年4月中国人造石墨进口量757吨、环比+12.4%、同比-32.9%；源电新能文章sha256 `dcd33dc2...`，安徽池州0.2GWh固态/固液混合电池科研总部成立。
- 技术补充：ESS News构网型文章sha256 `32c52e95...`，沙特三站7.8GWh项目采用阳光电源PowerTitan 3.0；Energy-Storage.News BESS AC/DC增容文章sha256 `3d0e6b22...`。
- 行情复核：SMM电池级碳酸锂页sha256 `d6259c31...`仍为均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至22:00，新增headline/latest/materials/metrics/market/overseas/technology/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605202200`。 已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605202200`均为200，首页与MarketTrend版本号、feed generated_at/headline关键词验证通过。 Artifacts: `var/hermes/crawl-20260520-2200.py`, `var/hermes/crawl-output-20260520-2200.json`, `var/hermes/article-fetch-20260520-2200.json`, `var/hermes/article-fetch-extra-20260520-2200.json`, `var/hermes/search-notes-20260520-2200.json`。

## 2026-05-20T21:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `def30b0c...`，`/markettrend/` HTTP 200 sha256 `70030ce9...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：ESS News澳洲BESS快讯sha256 `5a962f32...`，Edify两个昆士兰混合项目完成融资，每个300MW光伏+300MW/1200MWh电池、合计2.4GWh；德国Bühl项目sha256 `bf12eb03...`，规划500MW/2GWh四小时储能。
- 海外补充：MN8 Pome文章sha256 `77b04907...`，100MW/400MWh南加州独立BESS商业运行；Grenergy PPA文章sha256 `ba401bc7...`，229MW光伏+183MWh电池签20年Georgia Power PPA。
- 国内/产业链新增：EnergyTrend楚能文章sha256 `fc9be8c9...`，武汉、宜昌、孝感三项锂电项目获节能审查批复，新增规划产能合计290GWh。
- 行情复核：SMM电池级碳酸锂页sha256 `598eec62...`仍为均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至21:00，新增headline/latest/materials/metrics/market/overseas/projects/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605202100`。Artifacts: `var/hermes/crawl-20260520-2100.py`, `var/hermes/crawl-output-20260520-2100.json`, `var/hermes/article-fetch-20260520-2100.json`, `var/hermes/article-fetch-extra-20260520-2100.json`, `var/hermes/search-notes-20260520-2100.json`。

## 2026-05-20T20:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `def30b0c...`，`/markettrend/` HTTP 200 sha256 `70030ce9...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：ESS News澳洲NSW文章sha256 `c19a83d4...`，Tender 8采购2.5GW可再生能源、Tender 9寻求最高约12GWh长时储能；Energy-Storage.News瑞浦印尼文章sha256 `bf4b426d...`，开放锂离子电芯/BESS制造设施，此前规划8GWh、投资约2.23亿美元。
- 国内新增：SMM国轩文章sha256 `cca3ea72...`，已完成2GWh全固态电池量产线设计；SMM中虹普能文章sha256 `3808ffb9...`，商水400MW/800MWh储能项目签约、投资约12.8亿元；工信部五部门文件sha256 `0a3e63cb...`，4-6月开展废旧动力电池回收联合执法。
- 行情复核：SMM电池级碳酸锂页sha256 `cefaf832...`仍为均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至20:00，新增headline/latest/materials/metrics/market/overseas/policy/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605202000`。Artifacts: `var/hermes/crawl-20260520-2000.py`, `var/hermes/crawl-output-20260520-2000.json`, `var/hermes/article-fetch-20260520-2000.json`, `var/hermes/search-notes-20260520-2000.json`。

## 2026-05-20T19:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `951a4dc1...`，`/markettrend/` HTTP 200 sha256 `708bc8c6...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：ESS News德国Bühl文章sha256 `1993da30...`，Copenhagen Energy与Akaysha拟建设500MW/2GWh、4小时储能；MN8加州Pome文章sha256 `78d208d3...`，100MW/400MWh BESS商业运行并签10年tolling协议。
- 国内政策新增：国家能源局多用户绿电直连通知sha256 `a2f89ed8...`、答问sha256 `4114aea1...`，支持工商业园区、零碳园区等近区新能源消纳。
- 行情复核：SMM电池级碳酸锂页sha256 `f6a3e72c...`仍为174000-184000元/吨、均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至19:00，新增headline/latest/materials/metrics/market/overseas/policy/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201900`。Artifacts: `var/hermes/crawl-20260520-1900.py`, `var/hermes/crawl-output-20260520-1900.json`, `var/hermes/article-fetch-20260520-1900.json`, `var/hermes/search-notes-20260520-1900.json`。

## 2026-05-20T18:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `030e35ef...`，`/markettrend/` HTTP 200 sha256 `295b89c5...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：ESS News首页sha256 `f214db71...`；Grenergy/Georgia Power PPA文章sha256 `ce8e0b10...`，Beaver Creek项目229MW光伏+183MWh储能，20年PPA预计约400GWh/年，2028Q3商运、2029年5月PPA生效。
- 海外供应链/市场：Energy-Storage.News瑞浦兰钧印尼基地文章sha256 `6d4a7ae9...`，印尼锂电池与BESS制造基地开业，前期计划8GWh、2.23亿美元；日本LTDA文章sha256 `0c29ddec...`，19个BESS项目合计1,251MW、6小时、20年固定收入。
- 国内政策新增：CNESA华北两个细则征求意见sha256 `a1e63467...`，储能电站AGC/AVC并网后六个月内完成，违反调度纪律每次按装机容量×3小时考核电量，并涉及一次调频/APC/黑启动等辅助服务补偿。
- 行情复核：SMM电池级碳酸锂页sha256 `36b21ebd...`仍为174000-184000元/吨、均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至18:00，新增headline/latest/materials/metrics/market/overseas/policy/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201800`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1800.py`, `var/hermes/crawl-output-20260520-1800.json`, `var/hermes/article-fetch-20260520-1800-extra.json`, `var/hermes/search-notes-20260520-1800.json`。

## 2026-05-20T17:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `030e35ef...`，`/markettrend/` HTTP 200 sha256 `295b89c5...`；web_search国内/海外仍HTTP 432，web_extract将NeoLink判为内网阻断，改用requests抓取公开源，未仅刷新时间。
- 海外新增：ESS News首页sha256 `8084e6d2...`；NSW第8/9轮招标文章sha256 `b1fe76dd...`，Tender 8寻求2.5GW发电，Tender 9寻求最高12.5GWh、8小时长时储能，注册6月16日截止、投标7月14日截止。
- 国内政策新增：CNESA/国家能源局质量监督大纲sha256 `fe03e24b...`，适用电源侧和电网侧100MW及以上电化学/压缩空气储能；吉林规则sha256 `0f37a309...`，独立储能/虚拟电厂/绿电直连可参与中长期、现货和调频，独立储能门槛5MW/10MW/2h。
- 国内监管新增：工信部等五部门废旧动力电池回收联合执法通知sha256 `0a3e63cb...`，专项行动2026年4月至6月底，聚焦违规交售、非法拆解、溯源信息等。
- 行情复核：SMM电池级碳酸锂页sha256 `5e70c1c7...`仍为174000-184000元/吨、均价179000元/吨、日跌7500元/吨；CIF中日韩21.55美元/千克、跌0.5。
- 动作：已更新`data/feed.js` generated_at/checked_at至17:00，新增headline/latest/materials/metrics/market/overseas/policy/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201700`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1700.py`, `var/hermes/crawl-output-20260520-1700.json`, `var/hermes/article-fetch-20260520-1700.json`, `var/hermes/search-notes-20260520-1700.json`。

## 2026-05-20T16:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `a7f36bcb...`，`/markettrend/` HTTP 200 sha256 `1f79b87b...`；web_search国内/海外仍HTTP 432，改用requests抓取公开源，未仅刷新时间。
- 海外新增：Energy-Storage.News首页sha256 `f83abef6...`；NSW第七轮firming招标文章sha256 `e3f93f8b...`，签下532MW firming项目，包含1个BESS和1个VPP，合计2,128MWh储能容量，目标2027年11月底前商运。
- 国内材料新增：SMM新能源sha256 `b3d65e9a...`；六氟磷酸锂出口文章sha256 `63006510...`，显示2026年4月中国六氟磷酸锂累计出口量约868吨、环比下降约80.9%。
- 国内项目新增：SMM/电池网文章sha256 `634184bf...`，中虹普能与河南周口商水县签约400MW/800MWh电网侧储能电站，总投资约12.8亿元；标题口径为20天内两项目约32亿元。
- 行情复核：SMM电池级碳酸锂页sha256 `f1caf44d...`仍为174000-184000元/吨、均价179000元/吨、日跌7500元/吨；指数179616元/吨、日跌4555元/吨。
- 动作：已更新`data/feed.js` generated_at/checked_at至16:00，新增headline/latest/materials/metrics/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201600`。已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605201600`均为200，版本号/`generated_at`/关键词验证通过。Artifacts: `var/hermes/crawl-20260520-1600.py`, `var/hermes/crawl-output-20260520-1600.json`, `var/hermes/article-fetch-20260520-1600.json`, `var/hermes/search-notes-20260520-1600.json`。

## 2026-05-20T15:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `524f6be6...`，`/markettrend/` HTTP 200 sha256 `016c8ce6...`；web_search国内/海外仍HTTP 432，改用requests抓取公开源，未仅刷新时间。
- 海外新增产能：EnergyTrend首页sha256 `5f0c57c4...`；楚能三地锂电项目文章直连sha256 `fc9be8c9...`，披露武汉90GWh、宜昌100GWh、孝感100GWh三项锂电制造项目获节能审查批复，新增规划产能合计290GWh，楚能湖北四基地整体规划约500GWh。
- 国内材料新增：中国储能网首页sha256 `9cf999a5...`；六氟磷酸锂文章sha256 `fc75ac09...`，显示国产六氟磷酸锂现货均价升至17.65万元/吨，较5月初9.8万元/吨上涨近80%，文中归因于储能需求、长单锁价和供给收缩。
- 行情复核：SMM电池级碳酸锂页HTTP 200 sha256 `82be1060...`；05-20报价文章sha256 `059a83a4...`显示均价较上个更新日下跌7500元/吨；公开页仍为174000-184000元/吨、均价179000元/吨。
- 北极星索引：北极星储能sha256 `567863d0...` 首页展示台区储能季度新增14GWh、安徽Q1独立储能收益约0.23元/kWh、福特20GWh订单等标题；详情直连为WAF脚本，未扩写未核验正文。
- 动作：已更新`data/feed.js` generated_at/checked_at至15:00，新增headline/latest/materials/metrics/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201500`。已通过rsync部署至`neolink:/var/www/neolink/`并修复权限；HTTP线上回读首页、`/markettrend/`和`data/feed.js?v=202605201500`均为200，版本号/`generated_at`验证通过。Artifacts: `var/hermes/crawl-20260520-1500.py`, `var/hermes/crawl-output-20260520-1500.json`, `var/hermes/article-fetch-20260520-1500.json`, `var/hermes/search-notes-20260520-1500.json`。

## 2026-05-20T14:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `524f6be6...`，`/markettrend/` HTTP 200 sha256 `016c8ce6...`；web_search国内/海外仍HTTP 432，改用requests抓取公开源，未仅刷新时间。
- 国内/出海新增项目：中国储能网首页HTTP 200 sha256 `2af9a72b...`；中南院稿源直连sha256 `c5120cf2...`，中国能建乌兹别克斯坦三期四座储能电站全部倒送电，总规模400MW/800MWh，每站100MW/200MWh，总投资约3.2亿美元。
- 国内长时储能新增：辽水新能抚顺100MW/400MWh压缩空气+10MW飞轮项目直连sha256 `6edcfa8a...`；项目总投资9.14亿元，电电转换效率不低于67.8%，飞轮50毫秒响应。
- 海外容量/订单：Energy-Storage.News首页sha256 `db6ca991...`；日本19个BESS项目合计1.251GW直连sha256 `bb9a0aa9...`；REPT印尼制造基地sha256 `a5bd0fb8...`；EnergyTrend超22GWh订单汇总sha256 `97ef49d7...`；ESS News印度10.4GW独立BESS分配sha256 `588ccf46...`。
- 北极星索引：北极星储能sha256 `de1a2726...` 首页展示Ford 20GWh订单、广西煤电容量电价247.5元/kW·年、山西200MW/400MWh EPC 1元/Wh、江西需求响应0-3元/kWh等标题；详情直连为WAF脚本，未扩写未核验正文。
- 行情复核：SMM电池级碳酸锂页HTTP 200 sha256 `80fdf0b2...`；5月20日价格区间174000-184000元/吨、均价179000元/吨、日跌7500元/吨，MarketTrend更新14:00项目/容量市场证据链，不伪造新报价。
- 动作：已更新`data/feed.js` generated_at/checked_at至14:00，新增headline/latest/projects/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201400`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1400.py`, `var/hermes/crawl-output-20260520-1400.json`, `var/hermes/article-fetch-20260520-1400.json`, `var/hermes/search-notes-20260520-1400.json`。

## 2026-05-20T13:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `524f6be6...`，`/markettrend/` HTTP 200 sha256 `016c8ce6...`；web_search国内/海外仍HTTP 432，web_extract被私网策略拦截，改用requests抓取公开源，未仅刷新时间。
- 国内新增项目：中国储能网首页HTTP 200 sha256 `2af9a72b...`，直连文章sha256 `fa6bf114...`；中国能建山西院中标娄烦县云顶独立混合储能项目，正文披露总容量200MW/360.222MWh，一期180MW/360MWh、二期20MW/0.222MWh飞轮储能。
- 海外新增招标/运维：Energy-Storage.News首页sha256 `8fdea3fb...`；NSW 2.5GW发电+12GWh长时储能招标直连sha256 `4eb8b811...`；Hitachi/Akaysha 155MW/298MWh Ulinda Park BESS 20年LTSA直连sha256 `2e8b7836...`。
- 国内首页索引：北极星储能sha256 `4937fb6e...` 展示安徽Q1独立储能现货收益约0.23元/kWh、台区储能季度新增14GWh、山西200MW/400MWh EPC中标1元/Wh、江西需求响应0-3元/kWh等标题；详情直连为WAF脚本，未扩写未核验正文。
- 行情复核：SMM电池级碳酸锂页HTTP 200 sha256 `225795d1...`；5月20日均价179000元/吨口径不变，MarketTrend更新13:00项目/招标证据链，不伪造新报价。
- 动作：已更新`data/feed.js` generated_at/checked_at至13:00，新增headline/latest/projects/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201300`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1300.py`, `var/hermes/crawl-output-20260520-1300.json`, `var/hermes/article-fetch-20260520-1300.json`, `var/hermes/search-notes-20260520-1300.json`。

## 2026-05-20T12:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `69c30b8c...`，`/markettrend/` HTTP 200 sha256 `2a9ed9be...`；HTTPS回读仍SSL EOF。web_search国内/海外仍HTTP 432，web_extract被私网策略拦截，改用requests抓取公开源，未仅刷新时间。
- 国内新增项目：中国储能网首页HTTP 200 sha256 `d81657a1...`，直连文章sha256 `4ea64652...`；中国能建海投投资、中南院EPC总承包的乌兹别克斯坦三期储能项目群四座储能电站倒送电完成，总规模400MW/800MWh、总投资约3.2亿美元，商运后每年可提供5.8亿度电力调节能力。
- 国内新增监管：工信部入口sha256 `be85661f...`，五部门专项行动直连sha256 `0a3e63cb...`；规范废旧动力电池回收利用联合执法从2026年4月至6月底，聚焦违规交售、非法拆解、溯源、运输和电动自行车违规使用等问题。
- 行情复核：SMM电池级碳酸锂页HTTP 200 sha256 `ec9767d2...`；5月20日均价179000元/吨口径不变，MarketTrend不伪造新报价，仅补充12:00项目/监管证据链。
- 海外复核：Energy-Storage.News sha256 `b5336109...`、EnergyTrend `572c0f6f...`、ESS News `e879b8b1...`、pv magazine `d7f9608d...`；继续展示Rept印尼制造、印度10.4GW、日本1.25GW、阿曼2.7GW等线索，未发现高于乌兹项目/工信部监管的新增海外头条。
- 动作：已更新`data/feed.js` generated_at/checked_at至12:00，新增headline/latest/projects/policy/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201200`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1200.py`, `var/hermes/crawl-output-20260520-1200.json`, `var/hermes/article-fetch-20260520-1200.json`, `var/hermes/search-notes-20260520-1200.json`。

## 2026-05-20T11:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `69c30b8c...`，`/markettrend/` HTTP 200 sha256 `2a9ed9be...`；HTTPS回读仍SSL EOF，已记录。web_search国内/海外仍HTTP 432，web_extract被私网策略拦截，改用requests抓取公开源，未仅刷新时间。
- 国内新增行情：SMM电池级碳酸锂页HTTP 200 sha256 `eccf5455...`已显示5月20日报价：电池级碳酸锂174000-184000元/吨、均价179000元/吨、日跌7500；价格指数179616元/吨、日跌4555。MarketTrend主材行情同步更新。
- 国内新增政策/安全监管：国家能源局官网HTTP 200 sha256 `3021d390...`，直连《新型储能电站建设工程质量监督大纲》文章sha256 `7df81136...`；北极星储能首页sha256 `925c0ba8...`同步展示政策解读和适用功率100MW及以上储能等标题。
- 海外复核：Energy-Storage.News sha256 `1c3ca0a2...`、EnergyTrend `572c0f6f...`、ESS News `4b41ff24...`、pv magazine `796bfe85...`；继续展示Rept印尼BESS制造基地、印度10.4GW独立BESS、阿曼2.7GW连续风光储PPA等，未发现高于SMM/NEA的新增头条。
- 动作：已更新`data/feed.js` generated_at/checked_at至11:00，新增headline/latest/policy/materials/metrics/market/source_index条目；更新首页静态时间、首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201100`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1100.py`, `var/hermes/crawl-output-20260520-1100.json`, `var/hermes/search-notes-20260520-1100.json`。

## 2026-05-20T10:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `69c30b8c...`，`/markettrend/` HTTP 200 sha256 `2a9ed9be...`；HTTPS回读仍SSL EOF，已记录。web_search国内/海外仍HTTP 432，web_extract被私网策略拦截，改用requests抓取公开源，未仅刷新时间。
- 海外新增：EnergyTrend 05-19直连200 sha256 `97ef49d7...`，采信近期储能合作超22GWh、瑞浦兰钧/易工品2GWh电芯采购、Ford/EDF最高20GWh BESS框架；Energy-Storage.News Rept印尼制造基地直连200 sha256 `405fe4af...`，复核8GWh规划产能与约2.23亿美元投资。
- 国内复核：北极星储能首页HTTP 200 sha256 `fa3dd753...`展示瑞浦兰钧2GWh电芯大单、Q1储能日均利用小时数突破3h、深莞锂电池海运出口监管快车道等标题；详情页触发WAF验证，未扩写未核验正文。中国储能网首页继续展示商水县400MW/800MWh、今日行业动态等储能信息。
- MarketTrend/SMM：SMM电池级碳酸锂页sha256 `c8ce82a9...`；公开页仍仅显示5月19日电池级碳酸锂报价，未发现5月20新报价，不伪造行情日期。
- 动作：已更新`data/feed.js` generated_at/checked_at至10:00，新增headline/latest/overseas/enterprise/metrics/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201000`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1000.py`, `var/hermes/crawl-output-20260520-1000.json`, `var/hermes/direct-output-20260520-1000.json`, `var/hermes/search-notes-20260520-1000.json`。

## 2026-05-20T09:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `69c30b8c...`，`/markettrend/` HTTP 200 sha256 `2a9ed9be...`；HTTPS回读出现SSL EOF/SSL_ERROR_SYSCALL，未阻止HTTP基线刷新但已记录。web_search国内/海外仍HTTP 432，web_extract被私网策略拦截，改用requests抓取公开源，未仅刷新时间。
- 海外复核：Energy-Storage.News `a3ca2afb...`、EnergyTrend `572c0f6f...`、ESS News `1dfead5d...`、pv magazine `f9e0db02...`；公开标题继续覆盖Ford/EDF BESS、NSW 2,128MWh、印度10.4GW、阿曼2.7GW等。
- 国内新增：中国储能网05-20行业动态直连200 sha256 `379f9730...`，采信福特/EDF 20GWh储能大单、佐治亚电力2-6GW可调度资源RFP、法国Harmony 100MW/200MWh项目；中国储能网商水县项目直连200 sha256 `544967c7...`，采信400MW/800MWh电网侧储能签约、总投资约12.8亿元。
- MarketTrend/SMM：SMM电池级碳酸锂页sha256 `66289181...`；公开页仍仅显示5月19日电池级碳酸锂报价，未发现5月20新报价，不伪造行情日期。
- 动作：已更新`data/feed.js` generated_at/checked_at至09:00，新增headline/latest/project/domestic/metrics/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605200900`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-0900.py`, `var/hermes/crawl-output-20260520-0900.json`, `var/hermes/search-notes-20260520-0900.json`。

## 2026-05-20T08:00:00+08:00 strict global crawl — no credible new data
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动web_search国内/海外两次仍返回HTTP 432，本轮继续改用requests直接抓取公开页面并保存原始HTML，未仅刷新时间。
- 海外复核：Energy-Storage.News首页sha256 `fc110290...`，EnergyTrend新闻页`572c0f6f...`，ESS News首页`e1284fd8...`，pv magazine储能栏目`2ceec11c...`。可见标题仍为AC/DC augmentation、瑞浦兰钧印尼电芯+BESS工厂、NSW 2,128MWh、印度10.4GW独立BESS、阿曼2.7GW连续风光储PPA、德国Lidl 2.24kWh电池€299等，未发现较06:00/07:00可采信新增事实。
- 国内复核：中国储能网首页sha256 `36cb7cd0...`、北极星储能首页`70f4893a...`；可见标题仍覆盖2026年全球储能158GW/459GWh预测、4月新增招标85.3GWh、Q1日均利用小时突破3h、河北400MW/1.6GWh构网型招标、四川宜宾储能超400MW/800MWh等，未发现较06:00可采信新增事实。
- MarketTrend/SMM：SMM电池级碳酸锂页sha256 `00dc07c0...`、SMM新能源页`c5c41888...`；公开页仍为2026-05-19报价：电池级碳酸锂181000-192000元/吨、均价186500元/吨、日跌5000元/吨；指数184171元/吨、日跌6694。未发现2026-05-20新报价，不伪造行情日期。
- 动作：本轮记录为no-change check；`data/feed.js`、前台cache版本、MarketTrend资产版本和可见更新时间保持06:00，不做无内容纯时间刷新。Artifacts: `var/hermes/crawl-20260520-0800.py`, `var/hermes/crawl-output-20260520-0800.json`, `var/hermes/search-notes-20260520-0800.json`。

## 2026-05-20T07:00:00+08:00 strict global crawl — no credible new data
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动web_search两次仍返回HTTP 432，本轮继续改用requests直接抓取公开页面并保存原始HTML，未仅刷新时间。
- 海外复核：Energy-Storage.News首页sha256 `4f1cfdbe...`，EnergyTrend新闻页`572c0f6f...`，ESS News首页`a15a52e6...`，pv magazine储能栏目`f7c53acd...`。可见标题仍为瑞浦兰钧印尼电芯+BESS工厂、NSW 2,128MWh、印度10.4GW独立BESS、阿曼2.7GW连续风光储PPA、澳大利亚40万套/11.2GWh户储、德国Lidl 2.24kWh电池€299等，未发现较06:00可采信新增事实。
- 国内复核：中国储能网首页sha256 `36cb7cd0...`、北极星储能首页`70f4893a...`；可见标题仍覆盖2026年全球储能158GW/459GWh预测、4月新增招标85.3GWh、Q1日均利用小时突破3h、河北400MW/1.6GWh构网型招标、四川宜宾储能超400MW/800MWh等，未发现较06:00可采信新增事实。
- MarketTrend/SMM：SMM电池级碳酸锂页sha256 `4b91b56f...`；公开页仍为2026-05-19报价：电池级碳酸锂181000-192000元/吨、均价186500元/吨、日跌5000元/吨；指数184171元/吨、日跌6694。未发现2026-05-20新报价，不伪造行情日期。
- 动作：本轮记录为no-change check；`data/feed.js`、前台cache版本和可见更新时间保持06:00，不做无内容纯时间刷新。Artifacts: `var/hermes/update-20260520-0700.py`, `var/hermes/search-notes-20260520-0700.json`, `var/hermes/crawl-output-20260520-0700.json`。

## 2026-05-20T06:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动搜索工具仍HTTP 432，web_extract因私网策略拦截，本轮改用直接公开页面抓取，覆盖海外Energy-Storage.News、EnergyTrend、ESS News、pv magazine及国内中国储能网、北极星储能、SMM，未仅刷新时间。
- 海外新增/复核：ESS News首页显示印度2025年独立BESS授标10.4GW，但tariff viability仍是风险；pv magazine储能栏目显示阿曼电力公司签署2.7GW连续风-光-储项目PPA，并列出德国Lidl 2.24kWh电池€299、GCL拓展LFP储能业务等线索。
- 国内新增/复核：北极星储能首页显示26年Q1储能日均利用小时数突破3h、河北交投400MW/1.6GWh构网型储能系统招标、搭载587Ah电芯的1.96GW/5.45GWh储能动态、四川宜宾重点项目储能超400MW/800MWh。
- 中国储能网：复核江苏地区储能种类全揭秘、赣锋锂业Cauchari-Olaroz盐湖二期项目入选阿根廷RIGI计划。
- MarketTrend/SMM：SMM电池级碳酸锂页重抓sha256 `5789f4ae...`，公开表格仍为2026-05-19报价：181000-192000元/吨、均价186500元/吨、日跌5000元/吨；未发现5月20新报价，不伪造行情刷新。
- 版本：202605200600；保留source/as_of/methodology/url/sha256字段。Artifacts: `var/hermes/update-20260520-0600.py`, `var/hermes/search-notes-20260520-0600.json`。

## 2026-05-20T05:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动搜索工具仍返回HTTP 432，本轮改用直接公开页面抓取，覆盖海外Energy-Storage.News、EnergyTrend及国内中国储能网、北极星入口、SMM，未仅刷新时间。
- 海外新增/复核：Energy-Storage.News首页更新并抓取瑞浦兰钧印尼锂离子电芯+BESS制造设施开业；同站复核澳大利亚NSW第七轮firming tender签约532MW、2,128MWh储能容量。
- 全球格局：EnergyTrend披露近期全球储能订单更新超过22GWh；另据其援引口径，2025全球储能系统集成商Top10中中国企业8席，BYD 13%、Tesla 10%、阳光电源9%。
- 国内新增/复核：中国储能网复核宁夏中卫200MW/400MWh共享储能EPC中标公示，折合约1.2098元/Wh；行业动态披露楚能与中车株洲所等签订50GWh电池大单，储能电池、算力纳入节能监察重点。
- MarketTrend/SMM：SMM电池级碳酸锂页重抓并解压sha256 `b9a2fc03...`，公开表格仍为2026-05-19报价：181000-192000元/吨、均价186500元/吨、日跌5000元/吨；未发现5月20新报价，不伪造行情刷新。
- 版本：202605200500；保留source/as_of/methodology/url/sha256字段。Artifacts: `var/hermes/update-20260520-0500.py`。

## 2026-05-20T04:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动搜索工具仍返回HTTP 432，本轮改用直接公开页面抓取，覆盖海外Energy-Storage.News、ESS News、EnergyTrend、pv magazine及国内中国储能网、北极星储能网、SMM，未仅刷新时间。
- 海外新增/复核：Energy-Storage.News披露日本第三轮LTDA长期脱碳电源拍卖选出19个BESS项目、合计1,251MW，要求6小时持续时间并给予20年固定收入；欧洲项目汇总显示意大利、罗马尼亚、德国、波兰、丹麦等约3.3GWh BESS推进。
- 全球预测：中国储能网转引BNEF《2026年上半年储能市场展望》，预计2026年全球储能部署158GW/459GWh，2025年为112GW/307GWh，2036年累计2.9TW/10.5TWh。
- 国内新增/复核：中国储能网周度统计显示5月8-14日招标4.27GW/16.27GWh、落地3.17GW/9.35GWh，4h以上容量占比73.7%，磷酸铁锂中标均价0.747元/Wh、加权均价0.834元/Wh；4月新增招标85.3GWh继续作为需求背景。
- MarketTrend/SMM：SMM电池级碳酸锂页重抓sha256 `15e1ce85...`，公开HTML未解析出5月20新报价；沿用上一轮已核验2026-05-19均价186500元/吨并明确标注，不伪造04:00新报价。
- 版本：202605200400；保留source/as_of/methodology/url/sha256字段。Artifacts: `var/hermes/update-20260520-0400.py`、`var/hermes/raw/*_20260520_0400.html`。

## 2026-05-20T03:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200，hash分别为`2def089f...`和`ee39164c...`；主动搜索工具仍返回HTTP 432，本轮改用直接公开页面抓取，覆盖海外Energy-Storage.News、ESS News、EnergyTrend、pv magazine及国内中国储能网、北极星储能网、SMM，未仅刷新时间。
- 海外新增：EnergyTrend披露近期全球储能订单更新超过22GWh，Ford最高20GWh，瑞浦兰钧-易工品2GWh；Energy-Storage.News复核瑞浦兰钧印尼8GWh电芯及BESS制造设施开业。
- 海外市场：ESS News披露印度2025年独立BESS授标10.4GW，但低价竞标带来执行/资产质量风险；澳大利亚10个月安装约40万套户储，合计11.2GWh。
- 国内新增/复核：中国储能网招中标动态覆盖安徽滁州200MW/400MWh独立储能EPC候选、宁夏200MW/400MWh共享储能EPC中标、内蒙古通辽200MW/800MWh招标、河北康保400MW/1600MWh构网型储能系统招标。
- MarketTrend/SMM：SMM电池级碳酸锂页重抓sha256 `904ef315...`，公开HTML未解析出5月20新报价；沿用上一轮已核验2026-05-19均价186500元/吨并明确标注，不伪造03:00新报价。
- 版本：202605200300；保留source/as_of/methodology/url/sha256字段。Artifacts: `var/hermes/search-notes-20260520-0300.json`、`var/hermes/update-20260520-0300.py`、`var/hermes/raw/*_20260520_0300.html`。

## 2026-05-20T01:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200；HTTPS入口仍为LibreSSL SSL_ERROR_SYSCALL并留痕。主动搜索工具仍返回HTTP 432，本轮改用直接公开页面抓取，覆盖海外Energy-Storage.News、ESS News、EnergyTrend、pv magazine及国内中国储能网、北极星储能网、SMM，未仅刷新时间。
- 海外新增/复核：Energy-Storage.News披露澳大利亚NSW第七轮firming tender签约532MW，含BESS与VPP，合计2,128MWh储能容量，要求2027年11月底前商运，以覆盖2027-28夏季供应缺口。
- 海外PPA：pv magazine披露阿曼Nama Power & Water Procurement与O-Green签署2.7GW wind-solar-storage连续供电PPA；O-Green披露阿曼/博茨瓦纳组合含超过3.3GW风光与2.3GWh BESS，阿曼2030目标约7GW光伏、3GW风电、3GW储能。
- 国内新增/复核：北极星储能网首页出现1.96GW/5.45GWh储能动态、河北交投400MW/1.6GWh构网型储能系统招标、中核汇能安徽首个200MW/400MWh独立共享储能项目启动、深莞锂电池海运出口监管通道等线索。
- MarketTrend/SMM：SMM电池级碳酸锂页和新能源页重抓，公开表格仍为2026-05-19报价：181000-192000元/吨、均价186500元/吨、日跌5000元/吨；指数184171元/吨、跌6694。记录为行情复核，不伪造01:00新报价。
- 版本：202605200100；保留source/as_of/methodology/url/sha256字段。Artifacts: `var/hermes/raw/source_20260520_0101_*`、`var/hermes/update-20260520-0100.py`。

## 2026-05-20T00:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200；HTTPS入口仍为SSLEOFError并留痕。主动搜索/抓取海外ESS News、EnergyTrend、Energy-Storage.News、pv magazine及国内中国储能网、SMM，未仅刷新时间。
- 海外新增：ESS News披露印度2025年独立BESS分配10.4GW，累计储能招标容量从2018年6.8GW增至2025年90.7GW；2小时BESS最低电价1.48 lakh卢比/MW/月，约75%两小时容量处于可行性风险类别。
- 海外政策/户储：澳大利亚Cheaper Home Battery补贴10个多月带来40万+套、11.2GWh户储，2030目标超200万套、约40GWh；同期电网级电池新增11.219GWh。
- 海外材料：GCL Technology扩展至LFP储能材料，鑫能40万吨LFP正极材料项目已形成20万吨初始产能并进入调试。
- 国内新增/复核：中国储能网中美关系与储能机遇分析；宁夏探维200MW/400MWh共享储能EPC由中国电建吉林院3.9亿元中标；赣锋锂业Cauchari-Olaroz盐湖二期入选阿根廷RIGI计划。
- MarketTrend/SMM：SMM电池级碳酸锂行情页重抓并解压，公开表格仍为181000-192000元/吨、均价186500元/吨、日跌5000元/吨；记录为行情复核而非伪造新报价。
- 版本：202605200000；保留source/as_of/methodology/url字段。Artifacts: `var/hermes/search-notes-20260520-0000.json`。

## 2026-05-19T23:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200；本轮继续用HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 海外新增：EnergyTrend 5月19日文章披露5家企业储能订单/项目更新超22GWh；Ford Energy与EDF相关主体签署5年BESS供货框架，年度上限4GWh、5年累计上限20GWh；瑞浦兰钧2GWh电芯采购框架。
- 海外格局：EnergyTrend援引Benchmark/Electrek披露2025全球储能系统集成商Top10中中国企业8席；BYD以13%份额居首，Tesla 10%，阳光电源9%；BYD 2025储能系统出货超60GWh，阳光电源43GWh。
- 国内新增/复核：中国储能网行业动态披露2026Q1电化学储能电站日均利用小时数3.1h、日均等效充放电0.67次、平均利用率指数48%；内蒙古9批次新型储能指标共44.62GW/190.16GWh；国内大型数据中心首次经虚拟电厂参与现货交易；奈曼旗500MW/2000MWh构网型储能即将商业运行。
- MarketTrend/SMM：SMM电池级碳酸锂行情页重抓，公开表格显示181000-192000元/吨、均价186500元/吨、日跌5000元/吨；SMM锂电快讯披露国轩高科已完成2GWh全固态电池量产线设计。
- 版本：202605192300；保留source/as_of/methodology/url字段。Artifacts: `var/hermes/search-notes-20260519-2300.json`。

## 2026-05-19T22:00:00+08:00 strict global crawl
- 重新抓取：NeoLink首页与`/markettrend/` HTTP入口均返回200；HTTPS握手仍失败（SSLEOFError/EOF occurred in violation of protocol），本轮以HTTP入口做可用性/内容hash复核，未仅刷新时间。
- 海外新增/复核：Energy-Storage.News首页复核Pew美国DER Policy Playbook，公开摘要称为州监管者提供扩张本地发电/分布式能源的实践案例；同时复核BW ESS 11.5小时Bannaby BESS访谈作为长时储能背景线索。
- 国内新增/复核：中国储能网招中标动态披露宁夏中卫200MW/400MWh共享储能EPC中标价4.839亿元、折合约1.2098元/Wh，并补充通辽200MW/800MWh电网侧独立储能、康保400MW/1600MWh构网型独立储能招标。
- 技术新增：天津大学高温复合相变储热材料披露531.1J/g熔化焓、50次热循环后约93%储热保持、25秒升至550℃、全光谱平均吸收率92.7%、最高光热转换效率91.6%。
- MarketTrend：SMM电池级碳酸锂行情入口、5月19日报价页和18:32日评重新抓取，继续确认均价较上个更新日下跌5000元/吨、碳酸锂主连跌3.71%；公开页未披露22:00新报价，不伪造新报价。
- 版本：202605192200；保留source/as_of/methodology/url字段。Artifacts: `var/hermes/search-notes-20260519-2200.json`。

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
