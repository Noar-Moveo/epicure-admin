import { ITableData } from "../Dashboard/Dashboard.type";
import { Dispatch, SetStateAction } from "react";

export interface IDynamicTableProps {
  fields: string[];
  data: ITableData[];
  activeTable: string;
  BASE_URL: string;
  setData: Dispatch<SetStateAction<ITableData[]>>;
}
