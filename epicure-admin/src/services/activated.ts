import axios from "axios";

export const activatedData = async (
  activeTable: string,
  id: string,
  BASE_URL: string
) => {
  try {
    const url = `${BASE_URL}/${activeTable.toLowerCase()}/${id}/activate`;
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    console.error(`Error activating data from ${activeTable}:`, error);
    throw error;
  }
};
