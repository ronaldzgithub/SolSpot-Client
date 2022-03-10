import React, { useState, useEffect } from "react";
import styles from "./youtubeWidget.module.css"


const CreateYoutubeWidget = (props) => {

   const formatYoutubeEmbed = (url) => {
      let embedURL = "https://www.youtube.com/embed/" + url;
      return embedURL;
   }

   const changeYoutubeURL = (event) => {
      if (event.target.value.length > 11) return;

      console.log(event.target.value)
      props.update_youtube(event);
   };


   const renderIFrame = () => {
      if (props.profile_data.youtubeVid !== "" && props.profile_data.youtubeVid.length == 11) {
         return (
            <iframe
               className={styles.createWidgetFrame}
               allow="fullscreen"
               mozallowfullscreen="mozallowfullscreen"
               msallowfullscreen="msallowfullscreen"
               oallowfullscreen="oallowfullscreen"
               webkitallowfullscreen="webkitallowfullscreen"
               src={formatYoutubeEmbed(props.profile_data.youtubeVid)}
            />
         )
      }
      else {
         return (
            <div
               className={styles.createWidgetFrame}
            />
         )
      }

   }


   return (
      <div className={styles.root}>
         <h2 className={styles.widgetTitle}>YouTube Video</h2>
         <div className={styles.widgetCard}>
            {renderIFrame()}
            <p className={styles.inputTitle}>Enter YouTube Video ID</p>
            <p className={styles.inputHint}>Hint: The ID is found in the URL right after "v="</p>
            <input
               value={props.profile_data.youtubeVid}
               onChange={changeYoutubeURL}
               className={styles.widgetInput}
               placeholder="YouTube Video ID"
            />
         </div>
      </div>
   );

}

export default CreateYoutubeWidget;
