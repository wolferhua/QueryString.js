#QueryString.js
js解析QueryString神器
#使用介绍

```
var qs = new QueryString('?day=1123&day=2&test[][12][123]=3&test[][12][]=5&test[][12][]=6&test[][12][]=5&test[][12][]=6');
    alert(qs.get('day'));
```
