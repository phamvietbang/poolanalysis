import { fixedLargeNumber, numberWithCommas } from "../../../utils/utility";

export function setUpOptions(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: {
        xaxis: {
          title: {
            text: "Date time",
          },
          type: "datetime",
        },
      },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
      {
        name: props.name_two,
        data: props.data_two,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c", "#2980b9"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy hh",
        },
        y: {
          formatter: function (val) {
            return numberWithCommas(val, 2) + " USD";
          },
        },
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },

          min: props.min_y_left,
          max: props.max_y_left,
          tickAmount: 4,
          title: {
            text: props.title_one,
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val.toFixed(2), 1);
              // return parseInt(val)
            },
          },
        },
        {
          axisTicks: {
            show: true,
          },

          min: props.min_y_right,
          max: props.max_y_right,
          tickAmount: 4,
          floating: false,
          opposite: true,
          title: {
            text: props.title_two,
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val.toFixed(2), 1);
            },
          },
        },
      ],
      legend: {
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}

export function setNumberUserOptions(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: {
        xaxis: {
          title: {
            text: "Date time",
          },
          type: "datetime",
        },
      },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
      {
        name: props.name_two,
        data: props.data_two,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c", "#2980b9"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        shared: true,
        x: {
          format: "dd MMM yyyy hh",
        },
        y: {
          formatter: function (val, index) {
            if (index.seriesIndex === 0)
              return numberWithCommas(val) + " users";
            else {
              return numberWithCommas(val) + " USD";
            }
          },
        },
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },

          min: props.min_y_left,
          max: props.max_y_left,
          tickAmount: 4,
          title: {
            text: props.title_one,
          },
          labels: {
            formatter: function (val, index) {
              // return fixedLargeNumber(val.toFixed(2), 1);
              return parseInt(val);
            },
          },
        },
        {
          axisTicks: {
            show: true,
          },

          min: props.min_y_right,
          max: props.max_y_right,
          tickAmount: 4,
          floating: false,
          opposite: true,
          title: {
            text: props.title_two,
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val.toFixed(2), 1);
            },
          },
        },
      ],
      legend: {
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}

export function setUpOptionChartOneSeries(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: { xaxis: { type: "datetime" } },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy hh",
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        tickAmount: 4,
        title: {
          text: props.title_one,
        },
        labels: {
          formatter: function (val, index) {
            return val.toFixed(5);
          },
        },
      },

      legend: {
        showForSingleSeries: true,
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}
export function setUpOptionChartNormal(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: { xaxis: { type: "datetime" } },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
      {
        name: props.name_two,
        data: props.data_two,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c", "#2980b9"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy hh",
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        tickAmount: 4,
        title: {
          text: props.title_one,
        },
        labels: {
          formatter: function (val, index) {
            return fixedLargeNumber(val.toFixed(2), 1);
          },
        },
      },

      legend: {
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}
export function setUpOptionChartOne(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: { xaxis: { type: "datetime" } },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
      {
        name: props.name_two,
        data: props.data_two,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c", "#2980b9"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy hh",
        },
        y: {
          formatter: function (val) {
            return numberWithCommas(val, 2) + " USD";
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        tickAmount: 4,
        title: {
          text: props.title_one,
        },
        labels: {
          formatter: function (val, index) {
            return fixedLargeNumber(val.toFixed(2), 1);
          },
        },
      },

      legend: {
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}
export function setUpOptionChartThree(props) {
  if (Object.keys(props).length === 0) {
    return {
      series: [],
      options: { xaxis: { type: "datetime" } },
    };
  }
  return {
    series: [
      {
        name: props.name_one,
        data: props.data_one,
        type: props.type,
      },
      {
        name: props.name_two,
        data: props.data_two,
        type: props.type,
      },
    ],
    options: {
      title: {
        text: props.title,
        align: "center",
      },
      color: ["#6ab04c", "#2980b9"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        toolbar: {
          tools: {
            download: false,
            pan: false,
            zoomout: false,
            zoomin: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Date time",
        },
        categories: props.datetime,
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy hh",
        },
        y: {
          formatter: function (val) {
            return numberWithCommas(val, 2) + " %";
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        tickAmount: 4,
        title: {
          text: props.title_one,
        },
        labels: {
          formatter: function (val, index) {
            return fixedLargeNumber(val.toFixed(2), 1);
          },
        },
      },

      legend: {
        position: "top",
      },
      grid: {
        show: true,
      },
    },
  };
}
