import { Box, CircularProgress } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import React from "react";

type JiraIssue = {
  key: string;
  priority: string;
  priorityIconUrl: string;
  summary: string;
  created: string;
  status: string;
  statusIconUrl: string;
};

const JIRA_API_URL = "http://127.0.0.1:5000/jira/issues";
const DEFAULT_PRIORITY_ICON = "temp.png";
const DEFAULT_STATUS_ICON = "temp.png";

export const JiraDisplay = () => {
  const [jiraIssues, setJiraIssues] = React.useState<JiraIssue[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchJiraIssues = () => {
      setIsLoading(true);
      fetch(JIRA_API_URL)
        .then((response) => response.json())
        .then((data) => {
          const issues = Array.isArray(data.issues)
            ? data.issues.map((issue: any) => ({
                key: issue.key,
                summary: issue.fields.summary,
                created: issue.fields.created,
                priority: issue.fields.priority.name,
                priorityIconUrl: issue.fields.priority.iconUrl,
                status: issue.fields.status.name,
                statusIconUrl: issue.fields.status.iconUrl,
              }))
            : [];
          setJiraIssues(issues);
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setJiraIssues([]);
          console.error("Error fetching Jira issues:", error);
          // Retry after 1 minute if failed
          retryTimeout = setTimeout(fetchJiraIssues, 60000);
          setIsLoading(false);
        });
    };
    fetchJiraIssues();
    // Try to fetch Jira issues every 5 minutes
    const intervalId = setInterval(fetchJiraIssues, 300000);
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  const columns: GridColDef[] = [
    {
      field: "priorityIconUrl",
      headerName: "Priority",
      flex: 1,
      renderCell: (params: any) => (
        <img
          src={params.value || DEFAULT_PRIORITY_ICON}
          alt="Priority Icon"
          style={{ height: 24 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_PRIORITY_ICON;
          }}
        />
      ),
    },
    { field: "key", headerName: "Key", flex: 1 },
    { field: "summary", headerName: "Summary", flex: 2 },
    {
      field: "statusIconUrl",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <img
          src={params.value || DEFAULT_STATUS_ICON}
          alt="Status Icon"
          style={{ height: 24 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_STATUS_ICON;
          }}
        />
      ),
    },
    { field: "status", headerName: "Status Name", flex: 1 },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"100%"}
      height={"200px"}
      width={"100%"}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "black", marginLeft: 0.5 }} />
      ) : (
        <DataGrid
          rows={jiraIssues.map((issue, idx) => ({ id: idx, ...issue }))}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          autoHeight={false}
          disableRowSelectionOnClick
          pagination
        />
      )}
    </Box>
  );
};
