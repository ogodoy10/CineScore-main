import { useState, useEffect } from "react";
import { getTop10Movies } from "../services/movieService";

const useTop10Movies = () => {
  const [top10Movies, setTop10Movies] = useState([]);
  const [loadingTop10, setLoadingTop10] = useState(true);
  const [errorTop10, setErrorTop10] = useState(null);

  useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        const topMovies = await getTop10Movies();
        setTop10Movies(topMovies);
        console.log("Top 10 Movies:", topMovies); // Adiciona este console.log para verificação
      } catch (error) {
        setErrorTop10(error.message);
      } finally {
        setLoadingTop10(false);
      }
    };

    fetchTop10Movies();
  }, []);

  return { top10Movies, loadingTop10, errorTop10 };
};

export default useTop10Movies;
