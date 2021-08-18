import coordtransform from "coordtransform";

/**
 * [gcj02towgs84 国测局转wgs84]
 * @param  {Number} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function gcj02towgs84(x = 0, y = 0, replace = true) {
    return transformLngLat(x, y, coordtransform.gcj02towgs84, replace);
}
/**
 * [gcj02tobd09 国测局转百度]
 * @param  {Array} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function gcj02tobd09(x = 0, y = 0, replace = true) {
    return transformLngLat(x, y, coordtransform.gcj02tobd09, replace);
}
/**
 * [bd09togcj02 百度转国测局]
 * @param  {Array} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function bd09togcj02(x = 0, y = 0, replace = true) {
    return transformLngLat(x, y, coordtransform.bd09togcj02, replace);
}

/**
 * [bd09towgs84 百度转wgs84]
 * @param  {Array} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function bd09towgs84(x = 0, y = 0, replace = true) {
    return transformLngLat(
        x,
        y,
        (x, y) => {
            // 百度转国测局 => 国测局转wgs84
            const [lng, lat] = coordtransform.bd09togcj02(x, y);
            return coordtransform.gcj02towgs84(lng, lat);
        },
        replace
    );
}

/**
 * [wgs84togcj02 wgs84转国测局]
 * @param  {Number} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function wgs84togcj02(x = 0, y = 0, replace = true) {
    return transformLngLat(x, y, coordtransform.wgs84togcj02, replace);
}
/**
 * [wgs84tobd09 wgs84转国百度]
 * @param  {Number} [x=0] [description]
 * @param  {Number} [y=0] [description]
 * @return {[Array]}       [description]
 */
export function wgs84tobd09(x = 0, y = 0, replace = true) {
    return transformLngLat(
        x,
        y,
        (x, y) => {
            // wgs84转国测局 => 国测转局百度
            const [lng, lat] = coordtransform.wgs84togcj02(x, y);
            return coordtransform.gcj02tobd09(lng, lat);
        },
        replace
    );
}

function transformLngLatForKey(data, keyArr, transformFn, replace) {
    if (keyArr && isPlainArray(keyArr)) {
        const isAllArr = keyArr.every((d) => isPlainArray(d));
        if (isAllArr) {
            let lngLat = {};
            keyArr.forEach((keys) => {
                let [xKey, yKey] = keys;
                let [tX, tY] = transformFn(data[xKey], data[yKey]);
                if (replace) {
                    lngLat[xKey] = tX;
                    lngLat[yKey] = tY;
                } else {
                    lngLat["new" + xKey] = tX;
                    lngLat["new" + yKey] = tY;
                }
            });
            return {
                ...transformObj(data, transformFn, replace),
                ...lngLat,
            };
        } else {
            let [xKey, yKey] = keyArr;
            let [tX, tY] = transformFn(data[xKey], data[yKey]);
            let lngLat = {};
            if (replace) {
                lngLat[xKey] = tX;
                lngLat[yKey] = tY;
            } else {
                lngLat["new" + xKey] = tX;
                lngLat["new" + yKey] = tY;
            }
            return {
                ...transformObj(data, transformFn, replace),
                ...lngLat,
            };
        }
    } else {
        return transformObj(data, transformFn, replace);
    }
}
function transformObj(data, transformFn, replace) {
    if (data.lng && data.lat) {
        let [lng, lat] = transformFn(data.lng, data.lat);
        let lngLat = {};
        if (replace) {
            lngLat = {
                lng,
                lat,
            };
        } else {
            lngLat["newlng"] = lng;
            lngLat["newlat"] = lat;
        }
        return {
            ...data,
            ...lngLat,
        };
    }
    return data;
}
export function transformLngLat(x, y, transformFn, replace) {
    if (typeof x === "object") {
        const lnglats = x;
        const transformKeys = y;
        if (isPlainArray(lnglats)) {
            let transformArr = [];
            const isAllObjArr = lnglats.every((d) => typeof d === "object");
            if (isAllObjArr) {
                lnglats.forEach((item) => {
                    if (isPlainObject(item)) {
                        const newItem = transformLngLatForKey(
                            item,
                            transformKeys,
                            transformFn,
                            true
                        );
                        transformArr.push(newItem);
                    } else if (isPlainArray(item)) {
                        transformArr.push(transformFn(item[0], item[1]));
                    }
                });
            } else {
                const [lng, lat] = lnglats;
                transformArr = transformFn(lng, lat);
            }

            return transformArr;
        } else if (isPlainObject(lnglats)) {
            return transformLngLatForKey(
                lnglats,
                transformKeys,
                transformFn,
                replace
            );
        }
    } else {
        return transformFn(x, y);
    }
}

/**
 * 判断是否为对象
 * @return {[boolean]}
 */
function isPlainObject(data) {
    return Object.prototype.toString.call(data) === "[object Object]";
}
/**
 * 判断是否为数组
 * @return {[boolean]}
 */
function isPlainArray(data) {
    return Object.prototype.toString.call(data) === "[object Array]";
}
