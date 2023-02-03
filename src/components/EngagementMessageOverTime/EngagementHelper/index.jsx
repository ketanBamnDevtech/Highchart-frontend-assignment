import { chartOptions, titleOptions, xAxisOptions, seriesOptions, tooltipOptions, yAxisOptions, legendOptions } from "./utils";

  const engagementMessageOverTimeChartOptions = (messageCountList, channels) => {

    const options = {
      chart: chartOptions,
      title: titleOptions,
      legend: legendOptions,
      yAxis: yAxisOptions,
      xAxis: xAxisOptions(messageCountList),
      series: seriesOptions(messageCountList, channels),
      tooltip: tooltipOptions
    }
    return options;
  }

  const engagementHelper = {
    engagementMessageOverTimeChartOptions
  }

export default engagementHelper;

