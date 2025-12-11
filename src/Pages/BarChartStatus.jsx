import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Title from "../Component/Shared/Title";

function BarChartStatus()  {

  Title("Dsahboard")

  const axiosSecure = useAxiosSecure()

  const {data, isLoading} = useQuery({
    queryKey: ["loanStatusCount"],
    queryFn: async ()=> {
      const res = await axiosSecure.get("http://localhost:3000/loan/status-count");
      return res.data;
    }
  })

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  const chartData = [
    {status: "Pending", count:data.pending},
    {status: "Approved", count:data.approved},
    {status: "Rejected", count:data.rejected},

  ];

  return (
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData} margin={{top: 20, right:30, left:20, bottom:5}}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="status"/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey="count" fill="#87CEEB" />
  </BarChart>
</ResponsiveContainer>

  );
}

export default BarChartStatus