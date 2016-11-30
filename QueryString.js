/* js操作queryString类库 */
;(function (w, d, $) {
    "use strict";
    function QueryString(queryString) {
        var the = this;
        //字符串
        the.qs = queryString + '';
        //解析后得到的数据
        the.data = qsAll(the.qs);
    }

    /**
     * 获取到QueryString某个下标 Key 数据
     * @param query
     * @param key
     * @returns {*}
     */
    function qsGet(query, key) {
        //尝试简单方法获取值
        var patten = new RegExp('(^|&)' + key + '=([^=&]*)', 'g');
        var result = null,
            ret = null,
            i = null, iKey = null;
        while ((result = patten.exec(query)) != null) {
            ret = result[2];
        }
        if (ret == null) {
            //复杂数据
            patten = new RegExp('(^|\\?|&)' + key + '((\\[([^\\]]*)\\])*)=([^=&]*)', 'g');
            i = 0;
            var iList = {};
            while ((result = patten.exec(query)) != null) {
                var val = result[result.length - 1], exp = result[2], k = 0;
                var expList = exp.match(/\[[^\]\[]*\]/g), expLen = expList == null ? 0 : expList.length, expStr = '', eVal = val, _eval;
                for (var j = expLen - 1; j >= 0; j--) {
                    expStr = expList[j].slice(1, -1);
                    iKey = expList.slice(0, j + 1).join('-');
                    if (!iList[iKey]) {
                        iList[iKey] = 0;
                    }
                    if (expStr == '') {//数组
                        if (j == 0) {
                            _eval = eVal;
                            eVal = [];
                            eVal[iList[iKey]++] = _eval;
                        } else {
                            eVal = [eVal];
                        }
                    } else {
                        _eval = eVal;
                        eVal = {};
                        eVal[expStr] = _eval;
                    }
                }
                ret = $.extend(true, {}, ret, eVal);
            }

        }

        return ret;
    }

    /**
     * 获取到QueryString 所有数据
     * @param query string
     * @returns {{}}
     */
    function qsAll(query) {
        var GET = {};
        //判断queryString 状态
        if (query) {
            //修复异常的&amp;
            query = query.replace('&amp;', '&');
            var result;
            //获取所有key
            var patten = new RegExp('(^|\\?|&)([^\\?\\[=]*)(=|\\[)', 'g');
            while ((result = patten.exec(query)) != null) {
                GET[result[2]] = undefined;
            }
            //获取所有key 的值
            $.each(GET, function (key, val) {
                GET[key] = qsGet(query, key);
            });
        }
        return GET;
    }


    var QS = w.QS = w.QueryString = QueryString;
    QS.pt = QS.prototype;

    /**
     * 获取数据
     * @param key
     * @returns {{}|*|string|Object[]|CanvasPixelArray}
     */
    QS.pt.get = function (key) {
        key = key + '';
        var keys = key.split('.'), ret = this.data;
        if (ret && keys.length > 0) {
            var keyLen = keys.length, iKey = '';
            for (var i = 0; i < keyLen; i++) {
                iKey = keys[i];
                if (ret[iKey] != undefined) {
                    ret = ret[iKey];
                } else {
                    ret = null;
                    break;
                }
            }
        }
        return ret;
    };

})(window, document, jQuery);

