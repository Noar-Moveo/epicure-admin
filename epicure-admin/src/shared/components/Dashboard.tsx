import React, { useState, useEffect } from "react";
import { CssBaseline, Box, AppBar, Toolbar, Typography } from "@mui/material";
import NavigationBar from "./NavigationBar";
import DynamicTable from "./DynamicTable";
import { fetchCollectionNames } from "../../services/fetchCollection";
import { BASE_URL } from "../../shared/constants/constants";
import { fetchFields } from "../../services/fetchFields";
import { fetchData } from "../../services/fetchData";

export interface TableData {
  [key: string]: any;
}

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState<string>("");
  const [collections, setCollections] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      const names = await fetchCollectionNames();
      setCollections(names);
    };

    loadCollections();
  }, []);

  useEffect(() => {
    fetchFields(activeTable, setFields);
  }, [activeTable]);

  useEffect(() => {
    fetchData(activeTable, setData, BASE_URL);
  }, [activeTable]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: string
  ) => {
    setActiveTable(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <NavigationBar
        collections={collections}
        handleListItemClick={handleListItemClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {activeTable && (
          <>
            <Typography
              variant="h4"
              paragraph
              style={{ textTransform: "uppercase" }}
            >
              {activeTable.toUpperCase()}
            </Typography>
            <Typography paragraph color="textSecondary">
              {data.length} entries found
            </Typography>
            <DynamicTable fields={fields} data={data} />
          </>
        )}
        {!activeTable && (
          <Typography paragraph>
            Select a category from the left sidebar
          </Typography>
        )}
      </Box>
    </Box>
  );
}
