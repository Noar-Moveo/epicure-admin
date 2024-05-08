import axios from "axios";
import { BASE_URL } from "../shared/constants/constants";

export const fetchCollectionNames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/collection`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collection names:", error);
    return [];
  }
};
