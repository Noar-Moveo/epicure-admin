import { TableData } from "../Dashboard/Dashboard.type";

export interface DynamicTableProps {
  fields: string[];
  data: TableData[];
}
