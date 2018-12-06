# taobaoCrawler
## 主要功能
### 1.爬取淘宝类目信息。
Crawler文件夹下是使用superagent请求淘宝类目信息接口，使用getLeaves请求解析出所有叶子类目，使用叶子类目cid获取对应属性和属性值json文件存在/data/props/${cid}.json`下。
analyser文件夹下是分析脚本。负责提取/data/props文件夹下的文件解析成vid表和pid表。其中pid-重复表是检查是pid的中文名是否有重复（少量都是近义词可以忽略）。

### 2.解析淘宝官方工具「淘宝助理」导出店铺中商品数据的csv表格成格式。
parse文件夹下的casvParse
