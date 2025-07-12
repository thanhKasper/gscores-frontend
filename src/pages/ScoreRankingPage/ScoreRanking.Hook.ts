import axios from "axios";
import React, { useEffect } from "react";

const useGetAGroupScoreRanking = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [topScores, setTopScores] = React.useState<
    {
      studentId: string;
      mathScore: number;
      physicsScore: number;
      chemistryScore: number;
      sumAGroupScore: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/ranking/group-A`
        );
        setTopScores(response.data);
      } catch (error) {
        console.error("Failed to fetch top scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScores();
  }, []);

  return {
    isLoading,
    topScores,
  };
};

export default useGetAGroupScoreRanking;
