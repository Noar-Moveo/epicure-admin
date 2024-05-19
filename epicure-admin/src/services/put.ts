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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(
          `Error updating data to ${activeTable}: ${error.message}`
        );
      }
    } else {
      throw new Error(
        `Error updating data to ${activeTable}: ${String(error)}`
      );
    }
  }
};
