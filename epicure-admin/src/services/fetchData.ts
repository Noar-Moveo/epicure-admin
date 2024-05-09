import axios from "axios";

export const fetchData = async (
  activeTable: string,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  BASE_URL: string
) => {
  if (activeTable) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${activeTable.toLowerCase()}`
      );
      
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${activeTable}:`, error);
    }
  }
};
