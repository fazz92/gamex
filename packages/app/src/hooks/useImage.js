import { useEffect, useState } from 'react';

export const useImage = (filename) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(filename);
        setImage(response.default);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };


    fetchImage();
  }, [filename]);

  return { loading, error, image };
};