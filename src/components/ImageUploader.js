import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUploader() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState("");
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handle Upload
  const handleUpload = () => {
    const UploadTask = storage.ref(`images/${image.name}`).put(image);

    UploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside data base
            db.collection("postss").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            // console.log(username);
            setProgress(0);
            setCaption("");
            setImage(null);
            setUsername("");
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageupload_progress" value={progress} max="100%" />
      <Input
        type="text"
        placeholder="enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />

      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUploader;
