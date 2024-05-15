import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Toolbar,
  Typography,
  Modal,
  Button,
  Box,
} from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import DynamicTable from "../DynamicTable/DynamicTable";
import { fetchCollectionNames } from "../../../services/fetchCollection";
import { BASE_URL } from "../../constants/constants";
import { fetchFields } from "../../../services/fetchFields";
import { fetchData } from "../../../services/fetchData";
import resources from "../../../resources/resources.json";
import {
  MainContainer,
  StyledAppBar,
  MainContent,
  UpperCaseTypography,
  ToolbarContainer,
} from "./Dashboard.style";
import { ITableData } from "./Dashboard.type";
import colors from "../../../data/colors";
import { useNavigate, useParams } from "react-router-dom";
import AddEntryForm from "../Add/Add";
import { ROUTES } from "../../../shared/constants/ROUTES.dashboard";
import useModal from "../../hooks/useModal";

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState<string>("");
  const [collections, setCollections] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<ITableData[]>([]);
  const { showModal, openModal, closeModal } = useModal();
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
    navigate(`${ROUTES.dashboard}/${collection}`);
  };

  const handleBackButtonClick = () => {
    navigate(ROUTES.dashboard);
  };

  const updateData = async () => {
    try {
      await fetchData(activeTable, setData, BASE_URL);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredFields = fields.filter(
    (field) => field !== "_id" && field !== "__v"
  );

  return (
    <MainContainer>
      <CssBaseline />
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {resources.dashboardTitle}
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
            <ToolbarContainer>
              <Button onClick={handleBackButtonClick}>
                &lt;{resources.Back}
              </Button>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Button onClick={openModal}>{resources.AddEntry}</Button>
                <Button onClick={() => console.log("Upload Images clicked")}>
                  {resources.UploadImages}
                </Button>
              </Box>
            </ToolbarContainer>
            <UpperCaseTypography variant="h4" paragraph>
              {activeTable.toUpperCase()}
            </UpperCaseTypography>
            <Typography paragraph style={{ color: colors.textSecondary }}>
              {data.length} {resources.entries}
            </Typography>
            <DynamicTable
              fields={filteredFields}
              data={data}
              activeTable={activeTable}
              BASE_URL={BASE_URL}
              setData={setData}
            />
          </>
        )}
        {!activeTable && (
          <Typography paragraph>{resources.selectCollection}</Typography>
        )}

        <Modal
          open={showModal}
          onClose={closeModal}
          aria-labelledby="add-entry-modal-title"
          aria-describedby="add-entry-modal-description"
        >
          <AddEntryForm
            fields={filteredFields}
            closeModal={closeModal}
            activeTable={activeTable}
            updateData={updateData}
          />
        </Modal>
      </MainContent>
    </MainContainer>
  );
}
