import { Box, CircularProgress } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import React from "react";

const RESTAURANTS_API_URL = "http://127.0.0.1:5000/restaurants/nearby";

type RestaurantRow = {
  id: number;
  name: string;
  rating: number;
  waitTime: number;
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "rating", headerName: "Rate", flex: 1 },
  { field: "waitTime", headerName: "WT", flex: 1 },
];

export const RestaurantsDisplay = () => {
  const [rows, setRows] = React.useState<RestaurantRow[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchRestaurants = () => {
      setIsLoading(true);
      fetch(RESTAURANTS_API_URL)
        .then((response) => response.json())
        .then((data) => {
          const places = Array.isArray(data.places) ? data.places : [];
          const mapped = places.map((place: any, idx: number) => ({
            id: idx,
            name: place.displayName?.text || "N/A",
            rating: place.rating || 0,
            waitTime: place.estimated_wait_time_minutes
              ? Math.round(place.estimated_wait_time_minutes)
              : 0,
          }));
          setRows(mapped);
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setRows([]);
          console.error("Error fetching restaurants:", error);
          retryTimeout = setTimeout(fetchRestaurants, 60000);
          setIsLoading(false);
        });
    };
    fetchRestaurants();
    const intervalId = setInterval(fetchRestaurants, 300000);
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      minHeight={0}
      maxWidth="35%"
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "var(--color-text-main)", marginLeft: 0.5 }} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 2 } } }}
          disableRowSelectionOnClick
          pagination
          sx={{ 
            flex: 1,
            backgroundColor: "var(--color-surface)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--color-accent)",
              color: "var(--color-text-accent)",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "var(--color-surface)",
              "&:nth-of-type(even)": {
                backgroundColor: "var(--color-surface-alt)",
              },
            },
            "& .MuiDataGrid-cell": {
              color: "var(--color-text-main)",
            },
          }}
        />
      )}
    </Box>
  );
};
