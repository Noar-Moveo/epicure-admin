import axios from "axios";
import { BASE_URL } from "../shared/constants/constants";

type SetFieldsFunction = (fields: string[]) => void;

export const fetchFields = async (
  activeTable: string,
  setFields: SetFieldsFunction
) => {
  if (activeTable) {
    try {
      const response = await axios.get(
        `${BASE_URL}/fields/${activeTable.toLowerCase()}`
      );

      const fieldsData = response.data;

      setFields(fieldsData);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  }
};
