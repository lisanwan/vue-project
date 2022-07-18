<template>
  <div>
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      city: [
        { name: '上海', value: 62239 },
        { name: '南京', value: 55683 },
        { name: '郑州', value: 53716 },
        { name: '广州', value: 6364 },
        { name: '西安', value: 64976 },
        { name: '长沙', value: 4142 },
        { name: '昆明', value: 9524 },
        { name: '武汉', value: 28212 },
        { name: '重庆', value: 60777 },
        { name: '沈阳', value: 20900 },
        { name: '宁波', value: 66584 },
        { name: '苏州', value: 1136 },
        { name: '青岛', value: 9021 },
        { name: '成都', value: 23378 },
        { name: '北京', value: 6107 },
        { name: '天津', value: 5096 },
        { name: '深圳', value: 12480 },
        { name: '杭州', value: 19654 }
      ]
    }
  },
  methods: {
    convertData(data) {
      const res = []
      //引入城市地图
      const coordinateData = require('../config/chinaCity.json')
      for (let i = 0; i < data.length; i++) {
        const geoCoord = coordinateData[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    //引入中国地图
    echarts.registerMap('china', require('../config/china.json'))
    let option = {
      // geo注册中国地图必备
      geo: {
        map: 'china',
        zoom: 1.23 //放大倍数
      },
      // 模板渲染，要具体到对应数据，如要拿到params要使用coordinateDat函数把对应的城市搞出来从可以渲染
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' : ' + params.value[2]
        }
      },
      //地图左下角的柱状图
      visualMap: {
        min: 0,
        max: 60000,
        left: 20,
        bottom: 20,
        calculable: true,
        text: ['高', '低'],
        inRange: {
          color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
        },
        textStyle: {
          color: '#fff'
        }
      },
      // 地图数据
      series: [
        {
          name: '销量',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(this.city),
          symbolSize: 12,
          emphasis: {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75,
          tooltip: {
            show: false
          }
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped></style>
