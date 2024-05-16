import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { IDynamicTableProps } from "./DynamicTable.type";
import { capitalizeFirstLetter } from "../../../data/utils/CapitalizeFirstLetter";
import {
  tableCellStyle,
  statusIndicatorStyle,
  imageStyle,
  starsStyle,
  tableStyle,
  flexContainerStyle,
  buttonContainerStyle,
} from "./DynamicTable.style";
import { IDish, IRestaurant } from "../../../data/types";
import colors from "../../../data/colors";
import Delete from "../Delete/Delete";
import resources from "../../../resources/resources.json";
import { ITableData } from "../Dashboard/Dashboard.type";
import { activatedData } from "../../../services/activated";
import { fetchData } from "../../../services/fetchData";
import { deleteData } from "../../../services/delete";
import Restore from "../Restore/Restore";
import Edit from "../Edit/Edit";
import { TablePagination } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

const DynamicTable: React.FC<IDynamicTableProps> = ({
  fields,
  data,
  activeTable,
  BASE_URL,
  setData,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"delete" | "activate">();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (searchTerm: string) => {
    let filtered = data;
    if (searchTerm !== "") {
      filtered = data.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        for (const field in item) {
          if (field !== "_id") {
            const fieldValue = item[field];
            if (Array.isArray(fieldValue)) {
              for (const element of fieldValue) {
                if (typeof element === "object") {
                  if (element.name && typeof element.name === "string") {
                    const objectNameLower = element.name.toLowerCase();
                    if (objectNameLower.includes(searchTermLower)) {
                      return true;
                    }
                  }
                } else if (typeof element === "string") {
                  const elementLower = element.toLowerCase();
                  if (elementLower.includes(searchTermLower)) {
                    return true;
                  }
                }
              }
            } else if (typeof fieldValue === "object") {
              if (fieldValue.name && typeof fieldValue.name === "string") {
                const objectNameLower = fieldValue.name.toLowerCase();
                if (objectNameLower.includes(searchTermLower)) {
                  return true;
                }
              }
            } else if (typeof fieldValue === "string") {
              const fieldValueLower = fieldValue.toLowerCase();
              if (fieldValueLower.includes(searchTermLower)) {
                return true;
              }
            }
          }
        }
        return false;
      });
    }
    setFilteredData(filtered);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const getStatusColor = (status: string) => {
    return status === "Active" ? colors.green : colors.red;
  };

  const renderEditComponent = (item: ITableData) => {
    return (
      <Edit
        activeTable={activeTable}
        itemId={item._id}
        BASE_URL={BASE_URL}
        updateData={() => fetchData(activeTable, setData, BASE_URL)}
      />
    );
  };

  const renderTableCellContent = (field: string, rowData: ITableData) => {
    switch (field) {
      case "status":
        return (
          <div style={flexContainerStyle}>
            <div
              style={statusIndicatorStyle(getStatusColor(rowData[field]))}
            ></div>
            {rowData[field]}
          </div>
        );
      case "restaurants":
        return (
          Array.isArray(rowData[field]) && (
            <ul>
              {rowData[field].map(
                (restaurant: IRestaurant, restaurantIndex: number) => (
                  <li key={restaurantIndex}>{restaurant.name}</li>
                )
              )}
            </ul>
          )
        );
      case "ingredients":
        return (
          Array.isArray(rowData[field]) && (
            <ul>
              {rowData[field].map(
                (ingredient: string, ingredientIndex: number) => (
                  <li key={ingredientIndex}>{ingredient}</li>
                )
              )}
            </ul>
          )
        );
      case "dishes":
        return (
          Array.isArray(rowData[field]) && (
            <ul>
              {rowData[field].map((dish: IDish, dishIndex: number) => (
                <li key={dishIndex}>{dish.name}</li>
              ))}
            </ul>
          )
        );
      case "image":
        return <img src={rowData[field]} alt={`Image`} style={imageStyle} />;
      case "stars":
        return <img src={rowData[field]} alt={`Stars`} style={starsStyle} />;
      default:
        return typeof rowData[field] === "object"
          ? rowData[field].name
          : rowData[field];
    }
  };

  const actionComponent = (item: ITableData) => {
    if (item.status === "Active") {
      return <Delete item={item} deleteDataCallback={handleDelete} />;
    } else if (item.status === "Deprecated") {
      return <Restore item={item} restoreDataCallback={handleRestore} />;
    }
  };

  const handleDelete = async (ids: string | string[]) => {
    try {
      if (Array.isArray(ids)) {
        for (const id of ids) {
          await deleteData(activeTable, id, BASE_URL);
        }
      } else {
        await deleteData(activeTable, ids, BASE_URL);
      }
      await fetchData(activeTable, setData, BASE_URL);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleRestore = async (ids: string | string[]) => {
    try {
      if (Array.isArray(ids)) {
        for (const id of ids) {
          await activatedData(activeTable, id, BASE_URL);
        }
      } else {
        await activatedData(activeTable, ids, BASE_URL);
      }
      await fetchData(activeTable, setData, BASE_URL);
    } catch (error) {
      console.error("Error restoring data:", error);
    }
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleDialogOpen = (action: "delete" | "activate") => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (dialogAction === "delete") {
      handleDelete(selected);
    } else if (dialogAction === "activate") {
      handleRestore(selected);
    }
    setDialogOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDialogOpen("delete")}
          disabled={selected.length === 0}
        >
          {resources.DeleteSelected}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen("activate")}
          disabled={selected.length === 0}
        >
          {resources.ActivateSelected}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={() => {
                    if (selected.length === data.length) {
                      setSelected([]);
                    } else {
                      setSelected(data.map((item) => item._id));
                    }
                  }}
                />
              </TableCell>
              {fields.map((field, index) => (
                <TableCell key={index} style={tableCellStyle}>
                  {capitalizeFirstLetter(field)}
                </TableCell>
              ))}
              <TableCell>{resources.Action}</TableCell>
              <TableCell>{resources.Edit}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data
            ).map((row, rowIndex) => {
              const isItemSelected = isSelected(row._id);
              return (
                <TableRow
                  key={rowIndex}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleSelect(row._id)}
                      inputProps={{ "aria-labelledby": row._id }}
                    />
                  </TableCell>
                  {fields.map((field, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {renderTableCellContent(field, row)}
                    </TableCell>
                  ))}
                  <TableCell>{actionComponent(row)}</TableCell>
                  <TableCell>{renderEditComponent(row)}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogAction === resources.Delete
            ? resources.ConfirmDelete
            : resources.ConfirmRestore}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === resources.Delete
              ? resources.BatchDeleteQuestion.replace(
                  "{count}",
                  selected.length.toString()
                )
              : resources.BatchRestoreQuestion.replace(
                  "{count}",
                  selected.length.toString()
                )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            {resources.No}
          </Button>
          <Button onClick={handleDialogConfirm} color="error" autoFocus>
            {resources.Yes}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DynamicTable;
