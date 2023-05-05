const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'data-files', 'images', imageName);
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Unable to read image' });
    }
    const dimensions = sizeOf(data);
    // Settting height and width params to pass down and use in css
    res.set({
      'Content-Type': 'image/png',
      'X-Image-Width': dimensions.width.toString(),
      'X-Image-Height': dimensions.height.toString()
    });
    res.send(data);
  });
});

app.get('/images', (req, res) => {
  const directoryPath = path.join(__dirname, 'data-files', 'images');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({ error: 'Unable to read directory' });
    }
    const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === '.png');
    fs.readFile(path.join(__dirname, 'data-files', 'data', 'articles.json'), (err, data) => {
      if (err) {
        return res.status(500).send({ error: 'Unable to read articles file' });
      }
      const articles = JSON.parse(data);
      const imageDetails = pngFiles.map((fileName, index) => {
        const articleIndex = index < articles.length ? index : null;
        // In case there are more images than articles, provide default text
        const articleTitle = articleIndex !== null ? articles[articleIndex].title : 'Insufficient Articles';
        const articleDescription = articleIndex !== null ? articles[articleIndex].description : 'Insufficient Articles';
        const imageURL = `/images/${fileName}`;
        return { title: articleTitle, description: articleDescription, url: imageURL };
      });
      res.json({ images: imageDetails });
    });
  });
});

app.post('/upload-image', (req, res) => {
  const imageFile = req.files.image;
  const imageFileName = `${imageFile.name}-${Date.now()}.png`;
  const imagePath = path.join(__dirname, 'data-files', 'images', imageFileName);
  imageFile.mv(imagePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Unable to upload image' });
    }
    res.send({ message: 'Image uploaded successfully' });
  });
});

app.listen(5004, () => {
  console.log('Server on port 5004');
});
