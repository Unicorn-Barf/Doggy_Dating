import React, { Component } from "react";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_DOG_IMAGES } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogId, storeDog } from "../../slices/dogSlice";

const CloudinaryUploadWidget = () => {
   const dispatch = useDispatch();
   let dogId = useSelector(getDogId);
   if(!dogId) {
      //query for dog
      dogId = "63369b239e506cf12f5b5fcf";
   }

   const [uploadDogImage, { error }] = useMutation(UPLOAD_DOG_IMAGES);

   const uploadImage = async (imageURL) => {
      console.log(`DogId: ${dogId}, URL: ${imageURL}`);
      const uploadDogRes = await uploadDogImage({
         variables: { dogId: dogId, imageURL: imageURL }
      });
      console.log(uploadDogRes);
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
      <button id="dog_upload_widget" className="cloudinary-button" onClick={ openWidget }>
         Upload
      </button>
   );
}

export default CloudinaryUploadWidget;
