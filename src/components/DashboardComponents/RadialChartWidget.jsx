import colors from "../../utils/colors";
import * as styled2 from "styled-components";
import { styled, Paper, Typography } from "@mui/material";
import { RadialBarChart, RadialBar } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const data = [
  {
    name: "Applied Jobs",
    value: 50,
    fill: "#8D60C6",
  },
  {
    name: "Active Proposals",
    value: 40,
    fill: "#F980B0",
  },
  {
    name: "Applied Proposals",
    value: 50,
    fill: "#F9D356",
  },
  {
    name: "Bookmarked Projects",
    value: 30,
    fill: "#43C8E0",
  },
];

const CardHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.8rem",
});

const LegendText = styled(Typography)({
  color: " #55545b",
  fontWeight: "500",
  fontSize: "1.5rem",
  paddingLeft: "5px",
});

const RadialChartWidget = () => {
  return (
    <>
      {" "}
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,

          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <CardHeading>Static Analytics</CardHeading>
        <RadialBarChart
          width={500}
          height={300}
          cx={150}
          cy={150}
          innerRadius={70}
          outerRadius={120}
          barSize={8}
          data={data}
          startAngle={180}
          endAngle={450}
        >
          <RadialBar
            minAngle={15}
            label={false}
            background
            clockWise
            dataKey="value"
          />
        </RadialBarChart>
        <LegendWrapper>
          {data.map((c) => (
            <LegendNameWrapper>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FiberManualRecordIcon
                  sx={{ color: c.fill, fontSize: "1.6rem" }}
                />
                <LegendText>{c.name}</LegendText>
              </div>
              <LegendText>{c.value}</LegendText>
            </LegendNameWrapper>
          ))}
        </LegendWrapper>
      </Paper>
    </>
  );
};

export default RadialChartWidget;

const LegendWrapper = styled2.default.div`
  display: flex;
  flex-direction: column;
`;

const LegendNameWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
`;
