import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const UploadImage = props => {
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  console.log(pictures)
  return (
    <ImageUploader
      style={{boxShadow: "2px 5px 15px 4px rgba(0, 0, 0, 0.05)"}}
      {...props}
      singleImage={true}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
};

export default UploadImage;