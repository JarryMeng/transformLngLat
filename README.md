## 以下转换说明

[gcj02towgs84 国测局转 wgs84]
[gcj02tobd09 国测局转百度]
[bd09togcj02 百度转国测局]
[bd09towgs84 百度转 wgs84]
[wgs84togcj02 wgs84 转国测局]
[wgs84tobd09 wgs84 转国百度]

## import 引入方式

import { bd09togcj02, bd09towgs84 } from "transformlnglat";
bd09togcj02(118, 32)

## js 引入方式

<script type="text/javascript" src="transformlnglat.js"></script>

transformlnglat.bd09togcj02(118, 32)

## 支持的传入方式

1.  bd09togcj02(113.3123,46.324) 传入经纬度 返回 Array 格式 [113.3456,46.6786]
2.  bd09togcj02([{lng:113.3123,ylng:46.324}]) 传入数组 list 格式 默认去寻找 item 中的 x,y 进行转换 返回转换后的 list
    2.1 bd09togcj02([{x:113.3123,y:46.324}],['x','y']) 支持第二项参数传入 itemKey 匹配 list.item 进行转换
    2.2 bd09togcj02([{lng:113.3123,lng:46.324,X:113.3123,Y:46.324}],[['lng','lat'],['X','Y']]) 第二项参数 支持多组合 key 进行转换
3.  bd09togcj02({x:113.3123,y:46.324},['x','y']) 支持对象传入
    3.1 bd09togcj02({lng:113.3123,lng:46.324},['lng','lat']) 对象传入 itemKey 同 2.1
    3.2 bd09togcj02({lng:113.3123,lng:46.324,X:113.3123,Y:46.324},[['lng','lat'],['X','Y']]) 对象传入 itemKey 同 2.2
4.  bd09togcj02([113.3123,46.324]) // 一维坐标数组
5.  bd09togcj02([[113.3123,46.324],[113.3123,46.324]]) // 二维坐标数组
    ps: object array 项中如果有 lng lat 的 key 会默认转换
