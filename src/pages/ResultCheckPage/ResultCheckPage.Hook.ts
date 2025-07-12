import axios, { AxiosError } from "axios";
import React from "react";

const useGetStudentScore = () => {
  const [state, setState] = React.useState<{
    isLoading: boolean;
    error: string | null;
    data:
      | {
          studentId: string;
          scores: {
            subject: string;
            score: number | null;
            passed: boolean | null;
          }[];
        }
      | undefined;
  }>({
    isLoading: false,
    error: null,
    data: undefined,
  });

  const isPassed = (score: number | null) => {
    if (score === null) return null;
    return score > 1.0; // Base on Vietnamese education system, passing score per subject is 1.0
  };

  const fetchStudentScore = async (studentId: string) => {
    // Validation phase for studentId
    if (!studentId.trim()) {
      setState((prevState) => ({
        ...prevState,
        error: "Please enter a student ID",
      }));
      return;
    } else if (studentId.startsWith(" ") || studentId.endsWith(" ")) {
      setState((prevState) => ({
        ...prevState,
        error: "Student ID cannot start or end with a space",
      }));
      return;
    }

    // Frontend validation passed, proceed to fetch data
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const studentScore = (
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/scores/${studentId.trim()}`
        )
      ).data as {
        studentId: string;
        mathScore: number;
        literatureScore: number;
        foreignLanguageScore: number;
        physicsScore: number | null;
        chemistryScore: number | null;
        biologyScore: number | null;
        historyScore: number | null;
        geographyScore: number | null;
        civicEducationScore: number | null;
        langCode: string;
      };
      const result = {
        studentId: studentScore.studentId,
        langeCode: studentScore.langCode,
        scores: [
          {
            subject: "Math",
            score: studentScore.mathScore,
            passed: isPassed(studentScore.mathScore),
          },
          {
            subject: "Literature",
            score: studentScore.literatureScore,
            passed: isPassed(studentScore.literatureScore),
          },
          {
            subject: "Foreign Language",
            score: studentScore.foreignLanguageScore,
            passed: isPassed(studentScore.foreignLanguageScore),
          },
          {
            subject: "Physics",
            score: studentScore.physicsScore,
            passed: isPassed(studentScore.physicsScore),
          },
          {
            subject: "Chemistry",
            score: studentScore.chemistryScore,
            passed: isPassed(studentScore.chemistryScore),
          },
          {
            subject: "Biology",
            score: studentScore.biologyScore,
            passed: isPassed(studentScore.biologyScore),
          },
          {
            subject: "History",
            score: studentScore.historyScore,
            passed: isPassed(studentScore.historyScore),
          },
          {
            subject: "Geography",
            score: studentScore.geographyScore,
            passed: isPassed(studentScore.geographyScore),
          },
          {
            subject: "Civic Education",
            score: studentScore.civicEducationScore,
            passed: isPassed(studentScore.civicEducationScore),
          },
        ],
      };
      setState({
        isLoading: false,
        error: null,
        data: result,
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      setState({
        isLoading: false,
        error: axiosError.response?.data as string,
        data: undefined,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const setError = (error: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      error,
    }));
  };

  return {
    ...state,
    setError,
    fetchStudentScore,
  };
};

export default useGetStudentScore;
