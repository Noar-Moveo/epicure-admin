export interface IEditProps {
  activeTable: string;
  itemId: string;
  BASE_URL: string;
  updateData: () => void;
}

export interface IDataMap {
  [key: string]: any | any[];
}
