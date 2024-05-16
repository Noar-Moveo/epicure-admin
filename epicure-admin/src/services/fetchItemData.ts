import axios from "axios";

export const fetchItemData = async (
  activeTable: string,
  itemId: string,
  BASE_URL: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${activeTable.toLowerCase()}/${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data for ${activeTable} with ID ${itemId}:`,
      error
    );
    throw error;
  }
};
