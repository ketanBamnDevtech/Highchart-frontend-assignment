import Highcharts from 'highcharts';

const chartOptions = {
  type: 'spline',
  backgroundColor: '#22222C'
}

const titleOptions = {
  text: 'Engagement Chart',
  style: {
    color: '#ffffff'
  }
}

const xAxisOptions = (messageCountList) => {
  const unique = [...new Set(messageCountList.map(item => item.timeBucket))];
  const categories =  unique.map(date => Highcharts.dateFormat('%e %b', new Date(date)));
  return {
    crosshair: {
      width: 1,
      color: '#ffffff',
    },
    tickWidth: 1,
    tickColor: '#666666',
    tickmarkPlacement: "on",
    lineColor: '#66676A',
    categories: categories
  }
}

const yAxisOptions = {
  title: {
    text: undefined,
  },
  gridLineColor: 'transparent',
  tickWidth: 1,
  tickColor: '#666666'
}

const groupChannelByDate = (messageCountList) => {
  let groupedChannels = {};
  messageCountList.forEach(mc => {
    if (!((groupedChannels[mc.channelId] || []).map(v => v.timeBucket).includes(mc.timeBucket)))
    groupedChannels[mc.channelId] ? groupedChannels[mc.channelId].push(parseInt(mc.count)) : groupedChannels[mc.channelId] = [parseInt(mc.count)]; 
  });
  return groupedChannels;
} 

const seriesOptions = (messageCountList, channels) => {
  const groupedChannels = groupChannelByDate(messageCountList);
  let series = [];
  channels.forEach(channel =>  {
    if (groupedChannels[channel.id]?.length > 1)
      series.push({ 
        name: channel.name, 
        data: groupedChannels[channel.id],
        color: '#008F8D'
      });
  });
  console.log(series);
  return series;
}

const tooltipOptions = {
  backgroundColor: '#000000',
  borderColor: '#038B89',
  borderWidth: 3,
  borderRadius: 8,
  style: {
    color: '#ffffff',
  },
  headerFormat: '<b>{series.name}</b><br/>',
  pointFormat: '{point.y} messages on {point.category}'
}

const legendOptions = {
  backgroundColor: "#000000",
  itemStyle: {
    color: "#ffffff"
  }
}

export { chartOptions, titleOptions, xAxisOptions, seriesOptions, tooltipOptions, yAxisOptions, legendOptions }