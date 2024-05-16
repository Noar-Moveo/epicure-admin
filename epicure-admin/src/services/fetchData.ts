import axios from "axios";

export const fetchData = async (
  activeTable: string,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  BASE_URL: string
) => {
  if (!activeTable) {
    console.warn("fetchData was called without an activeTable.");
    return;
  }

  let endpoint = activeTable.toLowerCase();
  if (endpoint === "restaurant" || endpoint === "restaurants") {
    endpoint = "restaurants";
  }

  if (endpoint === "chef") {
    endpoint = "chefs";
  }

  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};
