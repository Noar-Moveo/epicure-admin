import { ITableData } from "../Dashboard/Dashboard.type";

export interface IDynamicTableProps {
  fields: string[];
  data: ITableData[];
}
