import React, { Component } from "react";

//DO NOT USE, WILL FIX LATER


class CloudinaryUploadWidget extends Component {
   componentDidMount() {
      const cloudName = "dnlfrsnzw"; // replace with your own cloud name
      const uploadPreset = "doggy_dating"; // replace with your own upload preset

      var myWidget = window.cloudinary.createUploadWidget(
         {
            cloudName: cloudName,
            uploadPreset: uploadPreset
         },
         (error, result) => {
            if (!error && result && result.event === "success") {
               console.log("Done! Here is the Owner image info: ", result.info);
               //send images to backend here
            }
         }
      );
      document.getElementById("owner_upload_widget").addEventListener(
         "click",
         function () {
            myWidget.open();
         },
         false
      );
   }

   render() {
      return (
         <button id="owner_upload_widget" className="cloudinary-button">
            Upload
         </button>
      );
   }
}

export default CloudinaryUploadWidget;
