import axios from "axios";

interface Image {
  url: string;
  name: string;
}

export const fetchImages = async (): Promise<Image[]> => {
  try {
    const response = await axios.get<Image[]>("/api/images");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
};
