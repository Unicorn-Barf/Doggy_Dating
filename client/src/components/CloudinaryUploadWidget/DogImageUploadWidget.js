import React, { Component } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_DOG_IMAGES } from "../../utils/mutations";
import { getCurrentDogIndex, getSavedDogArr } from "../../utils/localStorage";
import { Button } from "@mui/material";

const CloudinaryUploadWidget = () => {

   let dogId = getSavedDogArr()[getCurrentDogIndex()]._id;

   const [uploadDogImage, { error }] = useMutation(UPLOAD_DOG_IMAGES);

   const uploadImage = async (imageURL) => {
      console.log(`DogId: ${dogId}, URL: ${imageURL}`);
      const imageArr = [];
      imageArr.push(imageURL);
      const uploadDogRes = await uploadDogImage({
         variables: { dogId: dogId, imageUrl: imageArr }
      });
   }

   const cloudName = "dnlfrsnzw"; // replace with your own cloud name
   const uploadPreset = "doggy_dating"; // replace with your own upload preset

   const myWidget = window.cloudinary.createUploadWidget(
      {
         cloudName: cloudName,
         uploadPreset: uploadPreset
      },
      (error, result) => {
         if (!error && result && result.event === "success") {
            console.log("Done! Here is the Dog image info: ", result.info);
            //send images to backend here
            uploadImage(result.info.url);
         }
      }
   );

   const openWidget = () => {
      myWidget.open();
   }

   return (
      <Button id="dog_upload_widget" className="cloudinary-button" variant="contained" sx={{ my: 1 }} onClick={ openWidget }>
         Upload Dog Images
      </Button>
   );
}

export default CloudinaryUploadWidget;
