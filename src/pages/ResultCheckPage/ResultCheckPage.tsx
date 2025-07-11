import HeadingText from "@/components/Typography/HeadingText";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle,
  MinusCircle,
  Search,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import useGetStudentScore from "./ResultCheckPage.Hook";
import { Card, CardContent } from "@/components/ui/card";

const ResultCheckPage = () => {
  const [studentId, setStudentId] = useState("");

  const { isLoading, error, data, setError, fetchStudentScore } =
    useGetStudentScore();

  const handleSearch = async () => {
    if (!studentId.trim()) {
      setError("Please enter a student ID");
      return;
    }

    fetchStudentScore(studentId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getScoreBadgeColor = (score: number | null) => {
    if (score === null) return "bg-gray-100 text-gray-800";
    if (score >= 8.5) return "bg-green-100 text-green-800";
    if (score >= 7.0) return "bg-blue-100 text-blue-800";
    if (score >= 5.0) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getScoreGrade = (score: number | null) => {
    if (score === null) return "N/A";
    if (score >= 9.0) return "Excellent";
    if (score >= 8.0) return "Good";
    if (score >= 7.0) return "Fair";
    if (score >= 5.0) return "Pass";
    return "Fail";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <HeadingText>Student Score Checking</HeadingText>
        <p className="text-gray-600">Enter student ID to view subject scores</p>
      </div>

      {/* Search Section */}
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter student ID (e.g., SV001, SV002, SV003)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <Search className="h-4 w-4" />
              {isLoading ? "Searching..." : "Search"}
            </button>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {data && !error && (
          <Card>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Student ID: {data.studentId.toUpperCase()}
                  </h2>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Subject Scores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.scores.map((subjectScore, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {subjectScore.subject}
                      </h4>
                      {subjectScore.passed === null ? (
                        <MinusCircle className="h-5 w-5 text-gray-600" />
                      ) : subjectScore.passed == true ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold`}>
                        {subjectScore.score}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBadgeColor(
                          subjectScore.score
                        )}`}
                      >
                        {getScoreGrade(subjectScore.score)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!data && !error && (
          <Card>
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to Check Scores
              </h3>
              <p className="text-gray-600 mb-4">
                Enter a student ID above to view the result.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultCheckPage;
