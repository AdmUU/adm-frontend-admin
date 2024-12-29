<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://gitee.com/xmo/mineadmin-vue
-->
<template>
  <div class="ma-content-block p-3 mt-3">
    <ma-chart height="300px" :option="loginChartOptions" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { graphic } from "echarts"
import AdmRequestStatistics from "@/api/adm/AdmRequestStatistics";

function graphicFactory(side) {
  return {
    type: "text",
    bottom: "8",
    ...side,
    style: {
      text: "",
      textAlign: "center",
      fill: "#4E5969",
      fontSize: 12,
    },
  }
}

const graphicElements = ref([
  graphicFactory({ left: "2.6%" }),
  graphicFactory({ right: 0 }),
]);

const loginChartOptions = ref({})
const xAxis = ref([])
const chartsData = ref([])
const getStatistics = async () => {
  const res = await AdmRequestStatistics.query({})
  if (res.data) {
    xAxis.value = res.data.map(item => item.period);
    chartsData.value = res.data.map(item => item.request_count);
  }
  
  loginChartOptions.value = {
    grid: {
      left: "2.6%",
      right: "20",
      top: "10",
      bottom: "30",
    },
    xAxis: {
      type: "category",
      offset: 2,
      data: xAxis.value,
      boundaryGap: false,
      axisLabel: {
        color: "#4E5969",
        formatter(value, idx) {
          if (idx === 0) return "";
          if (idx === xAxis.value.length - 1) return "";
          return `${value}`;
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        interval: (idx) => {
          if (idx === 0) return false;
          if (idx === xAxis.value.length - 1) return false;
          return true;
        },
        lineStyle: {
          color: "#E5E8EF",
        },
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: "#23ADFF",
          width: 2,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        formatter(value, idx) {
          if (idx === 0) return value;
          return `${value}`;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#E5E8EF",
        },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter(params) {
        return `<div class="login-chart">
          <p class="tooltip-title">${params[0].axisValueLabel}</p>
          <div class="content-panel"><span>查询次数 </span><span class="tooltip-value">${Number(
            params[0].value
          ).toLocaleString()}</span></div>
        </div>`;
      },
    },
    graphic: {
      elements: graphicElements.value,
    },
    series: [
      {
        data: chartsData.value,
        type: "line",
        smooth: true,
        symbolSize: 12,
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 2,
          },
        },
        lineStyle: {
          width: 3,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "rgba(30, 231, 255, 1)",
            },
            {
              offset: 0.5,
              color: "rgba(36, 154, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(111, 66, 251, 1)",
            },
          ]),
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(17, 126, 255, 0.16)",
            },
            {
              offset: 1,
              color: "rgba(17, 128, 255, 0)",
            },
          ]),
        },
      },
    ],
  }
}

getStatistics()
</script>