import { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);

      try {
        const responseData = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: fileData,
          headers: {
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const newFileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
        setFileUrl(newFileUrl);
      } catch (err) {
        console.error("Error uploading file: ", err);
      }
    } else {
      alert('Please select a file first!');
    }
  }

  return (
    <div className="container">
      <h1>IPFS Storage - Upload your Files</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
        <label htmlFor="fileInput" className="file-label">Choose File</label>
        <button type="submit" className="upload-button">Upload</button>
      </form>
      {fileUrl && (
        <div className="file-link">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
          <br/>
          
        </div>
        
      )}
      <div>
      <a href={fileUrl} target = "_blank" id="file-url">
            {fileUrl}
            </a>
      </div>
    </div>
  )
}

export default App;
