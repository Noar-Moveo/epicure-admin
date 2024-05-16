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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(`Error posting data to ${activeTable}: ${error.message}`);
      }
    } else {
      throw new Error(`Error posting data to ${activeTable}: ${String(error)}`);
    }
  }
};
