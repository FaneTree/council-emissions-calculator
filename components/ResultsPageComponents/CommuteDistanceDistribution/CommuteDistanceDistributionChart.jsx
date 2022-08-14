import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Flex } from "@chakra-ui/react";

export default function CommuteDistanceDistributionChart({ title, data }) {
  console.log(data);
  const getMax = (a, b) => Math.max(a, b);
  const max = Object.values(data).reduce(getMax);

  const chartData = Object.values(data).map((item) => {
    if (item == max) {
      return {
        y: item,
        color: "#D69E2E",
      };
    } else return item;
  });

  const highChartsOptions = {
    title: {
      text: title,
      style: { color: "#022640" },
    },
    chart: {
      type: "column",
      // width: 635,
      height: 400,
    },
    colors: ["#044B7F"],
    tooltip: {
      pointFormat: "{point.y}%",
    },
    xAxis: {
      categories: Object.keys(data),
      title: {
        text: "Distance",
      },
      labels: {
        formatter: function () {
          return this.value + "KM";
        },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "%",
      },
    },
    series: [{ showInLegend: false, name: "Distance", data: chartData }],
  };

  return (
    // <Box width={["400px", "635px"]}>
    <Box width="100%">
      <HighchartsReact highcharts={Highcharts} options={highChartsOptions} />
    </Box>
  );
}
