import axios from "axios";

export const deleteData = async (
  activeTable: string,
  id: string,
  BASE_URL: string
) => {
  try {
    const url = `${BASE_URL}/${activeTable.toLowerCase()}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data from ${activeTable}:`, error);
    throw error;
  }
};
