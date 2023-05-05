# Kisi

This project contains two apps, one for the server and another for the client. The server app is built using Express and provides endpoints for retrieving and uploading images. Each image is assigned to an article through index logic. If no more articles are present, a default text is displayed.

The client app is built using React and plain CSS, and it populates cards with image information from the server. A button is provided to upload new images. The style follows a UX provided Figma template and is responsive especially taking into account mobile devices.

The two apps are running concurrently.

## Requirements
Installation
Clone the repository to your local machine.
Install the necessary dependencies for both the server and client apps by running npm install in their respective directories.
Start the server app by running npm start in the server directory.
Start the client app by running npm start in the client directory.
Usage
Once the server and client apps are running, you can access the client app by navigating to http://localhost:3000 in your web browser. From there, you can view the populated cards and upload new images using the provided button. The server is running at http://localhost:5004. You can also run both from the root with 'npm start'


License
This project is licensed under the MIT License. See the LICENSE file for more information.