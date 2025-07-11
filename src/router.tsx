import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import ResultCheckPage from "@/pages/ResultCheckPage/ResultCheckPage";
import ScoreStatisticsPage from "@/pages/ScoreStatPage/ScoreStatPage";
import ScoreRankingPage from "./pages/ScoreRankingPage/ScoreRankingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ResultCheckPage />,
      },
      {
        path: "/result-check",
        element: <ResultCheckPage />,
      },
      {
        path: "/score-statistics",
        element: <ScoreStatisticsPage />,
      },
      {
        path: "/score-ranking",
        element: <ScoreRankingPage />,
      }
    ],
  },
]);

export default router;
