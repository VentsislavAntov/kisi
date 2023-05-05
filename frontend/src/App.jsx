import React, { useCallback, useEffect, useState } from 'react';
import Card from './components/card/Card';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  /**
   * Fetching images from the server
   */
  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch('/images');
      const responseData = await response.json();
      const imagesWithDimensions = [];

      for (let i = 0; i < responseData.images.length; i++) {
        const image = responseData.images[i];
        const imageResponse = await fetch(image.url);
        const width = imageResponse.headers.get('X-Image-Width');
        const height = imageResponse.headers.get('X-Image-Height');
        const imageWithDimensions = {
          ...image,
          width,
          height,
        };
        imagesWithDimensions.push(imageWithDimensions);
      }

      setImages(imagesWithDimensions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**
   * Fetching images at the start
   */
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  /**
   * Uploading images on button click
   */
  const uploadImage = useCallback(async () => {
    try {
      const fileInput = document.getElementById('image-upload');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('image', file);

      await fetch('/upload-image', {
        method: 'POST',
        body: formData,
      });
      // Fetching to show the latest upload immediately
      fetchImages();
    } catch (error) {
      console.log(error);
    }
  }, [fetchImages]);

  return (
    <div className="page-container">
      <div className="item-wrapper">
        <div className="item-container">
          <div className="page-title">Connect people & spaces</div>
        </div>
        {images.map((image, index) => (
          // Setting max values in case the image uploaded is too big
          <div
            className="item-container"
            key={index}
            style={{
              height: Math.min(parseInt(image.height), 600),
              width: Math.min(parseInt(image.width), 800),
            }}
          >
            <Card
              imageSrc={image.url}
              imageAlt={image.title}
              title={image.title}
              description={image.description}
            />
          </div>
        ))}
        {/* Hack to get the button at the bottom in case of mobile */}
        <div className="line" />
        <div className="item-container">
          <label htmlFor="image-upload" className="button">
            Button
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/png,image/jpeg"
            onChange={uploadImage}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
