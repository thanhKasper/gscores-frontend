import HeadingText from "@/components/Typography/HeadingText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import useScoreStatQuery from "./ScoreStatPage.Hook";

const ScoreStatisticsPage = () => {
  const { scoreStat } = useScoreStatQuery();
  console.log("Score Statistics Data:", scoreStat);
  const subjectData = scoreStat;

  // Transform data for bar chart
  const chartData = Object.entries(subjectData).map(([subject, scores]) => ({
    subject,
    "Level 1 (<4)": scores[0],
    "Level 2 (4-6)": scores[1],
    "Level 3 (6-8)": scores[2],
    "Level 4 (≥8)": scores[3],
  }));

  console.log("Chart Data:", chartData);
  const chartConfig = {
    Math: {
      label: "Mathematics",
      color: "#10b981",
    },
    Literature: {
      label: "Literature",
      color: "#3b82f6",
    },
    English: {
      label: "English",
      color: "#f59e0b",
    },
    Chemistry: {
      label: "Chemistry",
      color: "#ef4444",
    },
    Physics: {
      label: "Physics",
      color: "#8b5cf6",
    },
    Biology: {
      label: "Biology",
      color: "#f472b6",
    },
    History: {
      label: "History",
      color: "#a855f7",
    },
    Geography: {
      label: "Geography",
      color: "#34d399",
    },
    "Civic Education": {
      label: "Civic Education",
      color: "#f97316",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div>
        <HeadingText>Score Statistics</HeadingText>
        <p className="text-gray-600">
          Student performance analysis across subjects
        </p>
      </div>

      <div className="space-y-6">
        {/* Bar Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Score Distribution by Subject
            </CardTitle>
            <CardDescription className="text-gray-600">
              Number of students in each performance level across subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="subject"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="Level 1 (<4)"
                    fill="#10b981"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="Level 2 (4-6)"
                    fill="#3b82f6"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="Level 3 (6-8)"
                    fill="#f59e0b"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="Level 4 (≥8)"
                    fill="#ef4444"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Detailed Statistics by Subject
            </CardTitle>
            <CardDescription className="text-gray-600">
              Breakdown of student performance across all subjects and levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="py-3 px-4 font-medium text-gray-900">
                      Subject
                    </TableHead>
                    <TableHead className="text-center py-3 px-4 font-medium text-gray-900">
                      &lt;4 points
                    </TableHead>
                    <TableHead className="text-center py-3 px-4 font-medium text-gray-900">
                      4-6 points
                    </TableHead>
                    <TableHead className="text-center py-3 px-4 font-medium text-gray-900">
                      6-8 points
                    </TableHead>
                    <TableHead className="text-center py-3 px-4 font-medium text-gray-900">
                      ≥8 points
                    </TableHead>
                    <TableHead className="text-center py-3 px-4 font-medium text-gray-900">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(subjectData).map(([subject, scores]) => {
                    const total = scores.reduce((sum, score) => sum + score, 0);
                    return (
                      <TableRow
                        key={subject}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="py-3 px-4 font-medium text-gray-900">
                          {subject}
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {scores[0]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {scores[1]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {scores[2]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {scores[3]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4 font-medium text-gray-900">
                          {total}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreStatisticsPage;
