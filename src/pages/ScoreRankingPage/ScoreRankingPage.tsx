import HeadingText from "@/components/Typography/HeadingText";
import SubHeadingText from "@/components/Typography/SubHeadingText";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Medal, Trophy } from "lucide-react";
import useGetAGroupScoreRanking from "./ScoreRanking.Hook";
import { Skeleton } from "@/components/ui/skeleton";

const ScoreRankingPage = () => {
  document.title = "G-Scores | Score Ranking";
  const { topScores, isLoading } = useGetAGroupScoreRanking();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-gray-600" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-600" />;
      case 3:
        return <Award className="w-5 h-5 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <HeadingText>Score Group Ranking</HeadingText>
        <SubHeadingText>
          Top 10 students with highest Group A scores
        </SubHeadingText>
      </div>

      <div className="rounded-lg shadow-sm border overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Performers - Group A Subjects (Math, Physics, Chemistry)
          </h2>
        </div>

        {/* Rankings Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Rank
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Student ID
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Math
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Physics
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Chemistry
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Total Score
                </TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow>
                  <TableCell key={index} colSpan={6} className="text-center">
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {topScores.map((student, index) => {
                  const rank = index + 1;
                  return (
                    <TableRow
                      key={student.studentId}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                            {rank}
                          </div>
                          {getRankIcon(rank)}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {student.studentId}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-700">
                          {student.mathScore?.toFixed(1) || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-700">
                          {student.physicsScore?.toFixed(1) || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-700">
                          {student.chemistryScore?.toFixed(1) || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {student.sumAGroupScore?.toFixed(1) || "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-600"
                >
                  Showing top 10 students based on Group A subjects performance
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ScoreRankingPage;
