# NeoLink Maintenance Log

## 2026-05-20T15:00:00+08:00 strict global crawl — updated
- 重新抓取：NeoLink首页HTTP 200 sha256 `524f6be6...`，`/markettrend/` HTTP 200 sha256 `016c8ce6...`；web_search国内/海外仍HTTP 432，改用requests抓取公开源，未仅刷新时间。
- 海外新增产能：EnergyTrend首页sha256 `5f0c57c4...`；楚能三地锂电项目文章直连sha256 `fc9be8c9...`，披露武汉90GWh、宜昌100GWh、孝感100GWh三项锂电制造项目获节能审查批复，新增规划产能合计290GWh，楚能湖北四基地整体规划约500GWh。
- 国内材料新增：中国储能网首页sha256 `9cf999a5...`；六氟磷酸锂文章sha256 `fc75ac09...`，显示国产六氟磷酸锂现货均价升至17.65万元/吨，较5月初9.8万元/吨上涨近80%，文中归因于储能需求、长单锁价和供给收缩。
- 行情复核：SMM电池级碳酸锂页HTTP 200 sha256 `82be1060...`；05-20报价文章sha256 `059a83a4...`显示均价较上个更新日下跌7500元/吨；公开页仍为174000-184000元/吨、均价179000元/吨。
- 北极星索引：北极星储能sha256 `567863d0...` 首页展示台区储能季度新增14GWh、安徽Q1独立储能收益约0.23元/kWh、福特20GWh订单等标题；详情直连为WAF脚本，未扩写未核验正文。
- 动作：已更新`data/feed.js` generated_at/checked_at至15:00，新增headline/latest/materials/metrics/market/source_index条目；更新首页/新闻/详情feed cache版本和MarketTrend资产版本至`202605201500`。`/var/www/neolink`不存在，未做本地镜像部署。Artifacts: `var/hermes/crawl-20260520-1500.py`, `var/hermes/crawl-output-20260520-1500.json`, `var/hermes/article-fetch-20260520-1500.json`, `var/hermes/search-notes-20260520-1500.json`。

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
