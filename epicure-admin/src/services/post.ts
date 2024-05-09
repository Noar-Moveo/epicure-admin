import axios from "axios";

export const postData = async (
  activeTable: string,
  formData: any,
  BASE_URL: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${activeTable.toLowerCase()}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${activeTable}: ${error}`);
  }
};
