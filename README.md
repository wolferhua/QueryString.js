#QueryString.js
js解析QueryString神器
##依赖
1. jQuery 

##使用介绍

```
var queryString = '?day=1123&day=2&test[][12][123]=3&test[][12][]=5&test[][12][]=6&test[][12][]=5&test[][12][]=6';
var qs = new QueryString(queryString);
alert(qs.get('day'));//获取day
alert(qs.get('test.1'));//获取test[1]
```
