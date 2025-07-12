import HeadingText from "@/components/Typography/HeadingText";
import SubHeadingText from "@/components/Typography/SubHeadingText";
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
import { Skeleton } from "@/components/ui/skeleton";

const ScoreStatisticsPage = () => {
  document.title = "G-Scores | Score Statistics";

  const { scoreStat, isLoading } = useScoreStatQuery();
  const subjectData = scoreStat;

  const levelColors = {
    level1: "#10b981", // Level 1 (<4)
    level2: "#3b82f6", // Level 2 (4-6)
    level3: "#f59e0b", // Level 3 (6-8)
    level4: "#ef4444", // Level 4 (≥8)
  };

  const dataLabelClassname =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const tableHeadClassname = "text-center py-3 px-4 font-medium text-gray-900";

  // Transform data for bar chart
  const chartData = Object.entries(subjectData).map(([subject, scores]) => ({
    subject,
    "Level 1 (<4)": scores[0],
    "Level 2 (4-6)": scores[1],
    "Level 3 (6-8)": scores[2],
    "Level 4 (≥8)": scores[3],
  }));

  const chartConfig = {
    Math: {
      label: "Mathematics",
    },
    Literature: {
      label: "Literature",
    },
    English: {
      label: "English",
    },
    Chemistry: {
      label: "Chemistry",
    },
    Physics: {
      label: "Physics",
    },
    Biology: {
      label: "Biology",
    },
    History: {
      label: "History",
    },
    Geography: {
      label: "Geography",
    },
    "Civic Education": {
      label: "Civic Educational",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div>
        <HeadingText>Score Statistics</HeadingText>
        <SubHeadingText>
          Student performance analysis across subjects
        </SubHeadingText>
      </div>

      <div className="space-y-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Score Distribution by Subject
            </CardTitle>
            <CardDescription className="text-gray-600">
              Number of students in each performance level across subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <div className="h-96">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="7 3" stroke="#f3f4f6" />
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
                    <Bar dataKey="Level 1 (<4)" fill={levelColors.level1} />
                    <Bar dataKey="Level 2 (4-6)" fill={levelColors.level2} />
                    <Bar dataKey="Level 3 (6-8)" fill={levelColors.level3} />
                    <Bar dataKey="Level 4 (≥8)" fill={levelColors.level4} />
                  </BarChart>
                </ChartContainer>
              </div>
            )}
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
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className={`${tableHeadClassname} text-left`}>
                    Subject
                  </TableHead>
                  <TableHead className={tableHeadClassname}>
                    &lt; 4 points
                  </TableHead>
                  <TableHead className={tableHeadClassname}>
                    4-6 points
                  </TableHead>
                  <TableHead className={tableHeadClassname}>
                    6-8 points
                  </TableHead>
                  <TableHead className={tableHeadClassname}>
                    &ge; 8 points
                  </TableHead>
                  <TableHead className={tableHeadClassname}>Total</TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <TableBody>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell key={index} colSpan={6} className="text-center">
                        <Skeleton className="h-12 w-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {Object.entries(subjectData).map(([subject, scores]) => {
                    const total = scores.reduce((sum, score) => sum + score, 0);
                    return (
                      <TableRow
                        key={subject}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell
                          className={`${tableHeadClassname} text-left`}
                        >
                          {subject}
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span
                            className={`${dataLabelClassname} bg-green-100 text-green-800`}
                          >
                            {scores[0]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span
                            className={`${dataLabelClassname} bg-blue-100 text-blue-800`}
                          >
                            {scores[1]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span
                            className={`${dataLabelClassname} bg-yellow-100 text-yellow-800`}
                          >
                            {scores[2]}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 px-4">
                          <span
                            className={`${dataLabelClassname} bg-red-100 text-red-800`}
                          >
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
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreStatisticsPage;
