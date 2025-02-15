import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Title from "@/components/Title";
import { TaxiTrip } from "@/types/trips";

interface Props {
  trips: TaxiTrip[];
}

export default function Visualization({ trips }: Props) {
  const chartData = trips.map((trip, index) => ({
    name: `Trip ${index + 1}`,
    fare: trip.fare_amount,
    distance: trip.trip_distance,
    passengerCount: trip.passenger_count,
  }));

  const paymentTypeData = trips.reduce(
    (acc: { [key: string]: number }, trip) => {
      const type = trip.payment_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = Object.keys(paymentTypeData).map((key) => ({
    name: key,
    value: paymentTypeData[key],
  }));

  const COLORS = ["#3b82f6", "#f97316", "#10b981", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Title type="h5">Fare Amount Visualization</Title>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="fare" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <Title type="h5">Payment Type Distribution</Title>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
          <Title type="h5">Trip Distance Analysis</Title>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="distance" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
