import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  styled,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";
import colors from "../../utils/colors";
import * as styled2 from "styled-components";
import { requestMethod } from "../../requestMethod";

const LineGraphWidget = ({
  data = [
    {
      name: "Jan",
      views: 0,
    },
    {
      name: "Feb",
      views: 0,
    },
    {
      name: "Mar",
      views: 0,
    },
    {
      name: "Apr",
      views: 0,
    },
    {
      name: "May",
      views: 0,
    },
    {
      name: "Jun",
      views: 0,
    },
    {
      name: "Jul",
      views: 0,
    },
    {
      name: "Aug",
      views: 0,
    },
    {
      name: "Sep",
      views: 0,
    },
    {
      name: "Oct",
      views: 0,
    },
    {
      name: "Nov",
      views: 0,
    },
    {
      name: "Dec",
      views: 0,
    },
  ],
}) => {
  const [Months, setMonths] = React.useState("");

  const getViewsYearly = async (id) => {
    const response = await requestMethod.get(`/view/user/` + id);
    return response.data;
  };

  const handleChange = (event) => {
    setMonths(event.target.value);
  };

  return (
    <>
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
        <HeaderWrapper>
          <CardHeading>Your Profile View</CardHeading>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              defaultValue={"Last 2 Months"}
              value={Months}
              onChange={handleChange}
              displayEmpty={true}
            >
              <MenuItem value={"Last 2 Months"}>Last 2 Months</MenuItem>
              <MenuItem value={"Last 6 Months"}>Last 6 Months</MenuItem>
            </Select>
          </FormControl>
        </HeaderWrapper>

        <ResponsiveContainer width="99%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="views" stroke={colors.textGreen} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default LineGraphWidget;

const HeaderWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  padding-bottom:15px;
`;

const CardHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.8rem",
});
