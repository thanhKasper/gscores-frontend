import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";

const useScoreStatQuery = () => {
  const [scoreStat, setScoreStat] = React.useState<Record<string, number[]>>(
    {}
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchScoreStat = async () => {
      setIsLoading(true);
      try {
        const [
          mathData,
          literatureData,
          englishData,
          chemistryData,
          physicsData,
          biologyData,
          historyData,
          geographyData,
          civicEducationData,
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/math`),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/statistics/literature`
          ),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/english`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/chemistry`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/physics`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/biology`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/history`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/statistics/geography`),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/statistics/civicEducation`
          ),
        ]);

        // Assuming each response data is an array of scores
        setScoreStat({
          Math: mathData.data,
          Literature: literatureData.data,
          English: englishData.data,
          Chemistry: chemistryData.data,
          Physics: physicsData.data,
          Biology: biologyData.data,
          History: historyData.data,
          Geography: geographyData.data,
          "Civic Education": civicEducationData.data,
        });
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as string) ||
            "An error occurred while fetching score statistics"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchScoreStat();
  }, []);

  return {
    scoreStat,
    isLoading,
    error,
  };
};

export default useScoreStatQuery;
