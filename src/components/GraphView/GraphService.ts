// Import necessary dependencies
import axios from "axios";

// Define the interface for the formatted data
interface DataItem {
  year: number;
  value: number;
}

export interface ParsedData {
  title: string;
  description: string;
  data: DataItem[];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

// Create a generic service for fetching and parsing the dataset
export const fetchData = async (url: string): Promise<ParsedData> => {
  try {
    // Make a GET request to fetch the data from the given URL
    const response = await axios.get(url);
    const dataset = response.data;

    // Extract title and description from the dataset
    const title = dataset.label || "Unknown title";
    const description = dataset.source || "Unknown description";

    // Extract years and corresponding values from the dataset
    const years = dataset.dimension.Tid.category.label;
    const values = dataset.value;

    // Parse the data into the required format
    const data: DataItem[] = Object.keys(years).map((yearKey, index) => ({
      year: parseInt(yearKey, 10),
      value: values[index],
    }));

    console.log({ title, description, data });
    // Return the formatted data
    return {
      title,
      description,
      data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch and parse data");
  }
};
