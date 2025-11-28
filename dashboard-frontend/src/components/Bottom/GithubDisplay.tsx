import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const GITHUB_API_URL = "http://127.0.0.1:5000/git-my-requested-prs";
export const GithubDisplay = () => {
  const [numberPRsForReview, setNumberPRsForReview] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchGitHubPRs = () => {
      setIsLoading(true);
      fetch(GITHUB_API_URL)
        .then((response) => response.json())
        .then((data) => {
          setNumberPRsForReview(data.total_count || 0);
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setNumberPRsForReview(0);
          console.error("Error fetching GitHub PRs data:", error);
          // Retry after 1 minute if failed
          retryTimeout = setTimeout(fetchGitHubPRs, 60000);
          setIsLoading(false);
        });
    };
    fetchGitHubPRs();

    // Try to fetch GitHub PRs every 10 minutes
    const intervalId = setInterval(fetchGitHubPRs, 600000);
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <Stack
      spacing={2}
      width={"33%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">{numberPRsForReview}</Typography>
          <Typography variant="h6">PRS To Review</Typography>
        </>
      )}
    </Stack>
  );
};
