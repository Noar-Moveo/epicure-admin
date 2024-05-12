import axios from "axios";

export const updateData = async (
  activeTable: string,
  itemId: string,
  data: any,
  BASE_URL: string
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${activeTable.toLowerCase()}/${itemId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating data for ${activeTable} with ID ${itemId}:`,
      error
    );
    throw error;
  }
};
