import React, { useState, useEffect } from "react";
import { CssBaseline, Toolbar, Typography, Button } from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import DynamicTable from "../DynamicTable/DynamicTable";
import { fetchCollectionNames } from "../../../services/fetchCollection";
import { BASE_URL } from "../../constants/constants";
import { fetchFields } from "../../../services/fetchFields";
import { fetchData } from "../../../services/fetchData";
import {
  dashboardTitle,
  entries,
  selectCollection,
} from "../../../resources/resources";
import {
  MainContainer,
  StyledAppBar,
  MainContent,
  UpperCaseTypography,
} from "./Dashboard.style";
import { TableData } from "./Dashboard.type";
import colors from "../../../data/colors";
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState<string>("");
  const [collections, setCollections] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<TableData[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadCollections = async () => {
      const names = await fetchCollectionNames();
      setCollections(names);
    };

    loadCollections();
  }, []);

  useEffect(() => {
    if (params.collection) {
      setActiveTable(params.collection);
      fetchFields(params.collection, setFields);
      fetchData(params.collection, setData, BASE_URL);
    } else {
      setActiveTable("");
      setFields([]);
      setData([]);
    }
  }, [params.collection]);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement>,
    collection: string
  ) => {
    setActiveTable(collection);
    navigate(`/dashboard/${collection}`);
    console.log("Navigate to Collection");
  };

  const handleBackButtonClick = () => {
    navigate("/dashboard/");
    console.log("Navigate to Dashboard");
  };

  return (
    <MainContainer>
      <CssBaseline />
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {dashboardTitle}{" "}
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <NavigationBar
        collections={collections}
        handleListItemClick={handleListItemClick}
      />
      <MainContent>
        <Toolbar />
        {activeTable && (
          <>
            <Button onClick={handleBackButtonClick}>&lt;- Back</Button>
            <UpperCaseTypography variant="h4" paragraph>
              {activeTable.toUpperCase()}
            </UpperCaseTypography>
            <Typography paragraph style={{ color: colors.textSecondary }}>
              {data.length} {entries}
            </Typography>
            <DynamicTable fields={fields} data={data} />
          </>
        )}
        {!activeTable && <Typography paragraph>{selectCollection} </Typography>}
      </MainContent>
    </MainContainer>
  );
}
