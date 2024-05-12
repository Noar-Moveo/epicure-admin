import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

const DynamicTable: React.FC<IDynamicTableProps> = ({
  fields,
  data,
  activeTable,
  BASE_URL,
  setData,
}) => {
  const getStatusColor = (status: string) => {
    return status === "active" ? colors.green : colors.red;
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
    if (item.status === "active") {
      return <Delete item={item} deleteDataCallback={handleDelete} />;
    } else if (item.status === "deprecated") {
      return <Restore item={item} restoreDataCallback={handleRestore} />;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteData(activeTable, id, BASE_URL);
      await fetchData(activeTable, setData, BASE_URL);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await activatedData(activeTable, id, BASE_URL);
      await fetchData(activeTable, setData, BASE_URL);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
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
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {fields.map((field, cellIndex) => (
                <TableCell key={cellIndex}>
                  {renderTableCellContent(field, row)}
                </TableCell>
              ))}
              <TableCell>{actionComponent(row)}</TableCell>
              {renderEditComponent(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
