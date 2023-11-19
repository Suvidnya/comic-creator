import React, { useEffect, useState } from 'react';
import './display.css';
import html2canvas from 'html2canvas';
import DomToImage from 'dom-to-image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Display = ({ showdisplay, formTexts }) => {
  const [apiResponses, setApiResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [imagesLoaded, setImagesLoaded] = useState(0); // Track the number of loaded images
  const [showsample, setshowsample] = useState(false);


//   const sample = [
//     "The sun dipped below the horizon, casting a warm glow across the tranquil lake. As the stars emerged, a gentle breeze rustled through the trees, creating a melody of nature's lullaby.",
//     "In the bustling city, neon lights painted the streets with a vibrant glow. Among the sea of people, a lone musician played a soulful tune, echoing through the urban canyon.",
//     "Lost in the pages of a well-worn book, time seemed to stand still. Characters and worlds came to life, transporting the reader to realms unknown, where imagination held the key.",
//     "On the kitchen counter, ingredients awaited transformation. The scent of spices filled the air as a culinary symphony unfolded, turning simple elements into a masterpiece.",
//     "In a quaint cafe, the aroma of freshly brewed coffee mingled with the sound of soft conversations. Each sip held the promise of a new beginning, a moment of respite in the daily hustle.",
//     "Beneath the city lights, footsteps echoed on the rain-soaked pavement. Umbrellas created a sea of color, reflecting the resilience of those navigating the storm.",
//     "Across the meadow, wildflowers swayed in the gentle breeze. The sun painted the sky in hues of pink and orange, as if bidding a fond farewell to another day.",
//     "In a quiet room, the soft hum of a computer signaled the creation of a digital masterpiece. Lines of code intertwined, giving life to a virtual world on the glowing screen.",
//     "A group of friends gathered around a bonfire, sharing stories and laughter. The crackling flames danced in the night, casting a warm glow on the faces of those forging memories.",
//     "High above, a lone bird soared in the vast expanse of the sky. With each graceful glide, it embraced the freedom that the open air provided, a symbol of untamed spirit."
// ];

// const sample = [
//   "https://source.unsplash.com/random/512x512",
//   "https://source.unsplash.com/random/512x513",
//   "https://source.unsplash.com/random/512x514", 
//   "https://source.unsplash.com/random/512x515",
//   "https://source.unsplash.com/random/512x516",
//   "https://source.unsplash.com/random/512x517",
//   "https://source.unsplash.com/random/512x518",
//   "https://source.unsplash.com/random/512x519",
//   "https://source.unsplash.com/random/512x520",
//   "https://source.unsplash.com/random/512x521"
// ];
const sample = [
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfy-Jy51KbH6sUQiJYEIMeAYyYQMIbx5P2g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfy-Jy51KbH6sUQiJYEIMeAYyYQMIbx5P2g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfy-Jy51KbH6sUQiJYEIMeAYyYQMIbx5P2g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyupa-Krb9iqFEuEZr_G8g6S0zwrHUkq0Wg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyupa-Krb9iqFEuEZr_G8g6S0zwrHUkq0Wg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyupa-Krb9iqFEuEZr_G8g6S0zwrHUkq0Wg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwJzB8u_g4Hal7o012IFSTMdzH54JR9ePqA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyupa-Krb9iqFEuEZr_G8g6S0zwrHUkq0Wg&usqp=CAU",
];


  const callApi = async (text) => {
    try {
      console.log("will start fetch");
      const response = await fetch(
        'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
        {
          method: 'POST',
          headers: {
            Accept: 'image/png',
            Authorization:
              'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        }
      );
      console.log("got the response");
      const result = await response.blob();
      return result;
    } catch (error) {
      console.log("some eror occured")
      // Handle error if needed
      toast.error(`Error fetching image: ${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // console.error('Error fetching image:', error);
    }
  };

 useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setImagesLoaded(0); // Reset the count when fetching new images

      const responses = [];
      for (const text of formTexts) {
        const image = await callApi(text);
        if (image) {
          responses.push(image);
          console.log("is working and fetching");
          setApiResponses([...responses]);

          // Increment the count of loaded images
          setImagesLoaded(prevCount => prevCount + 1);

          setIsLoading(false);
        }
      }
    };

    if (showdisplay && formTexts.every((text) => text.trim() !== '')) {
      fetchImages();
    }
  }, [showdisplay, formTexts]);

  const checklength = () => {
    return apiResponses.length === 10 || sample.length === 10;
  };

  const downloadComic = () => {

// -----------------------------------------------------
// TESTING
// return;
    if (imagesLoaded === apiResponses.length) {
      const container = document.querySelector('.flex-container');

      if (container) {
        DomToImage.toBlob(container)
          .then(function (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'comic.png';
            link.click();
          });
      }
    } else {
      toast.error('Wait for all panels to load before downloading the comic.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handlesample = () =>{
    setshowsample(!showsample);
    }

  return (

    <>
    
     {showdisplay && (
       <div className="image-containermain testcontainermain">
         {isLoading ? (
          <p id="wait">Wait until your comic is getting generated ...</p>
        ) : (<p></p>)}

    <div  className='flex-containermain'>
         { 
    apiResponses.map((response, index) => (
            <img key={index} className="flex-itemmain" src={URL.createObjectURL(response)} alt={`Scene ${index + 1}`} />
          ))
        }
    </div>

    {checklength() && (
          <div className='buttons'>
            <button className = "btn sharemain" type = "button" onClick={downloadComic} disabled={imagesLoaded !== 10}>Share Comic</button>
          </div>
        )}  
      </div>
    )}


      
    <div className="center-button">
      <button className='comic-button sample' onClick={handlesample}>{ !showsample ? "See sample Comic" : "Hide Sample Comic"}</button>
    </div>

     { showsample && (
        <div>
     <div className='testcontainer'>
     <div className="flex-container">
       {sample.map((imageUrl, index) => (
         <div key={index} className="image-container">
          <img className="flex-item" src={imageUrl} alt={`Image ${index + 1}`} />
          {/* <div className="annotation-container">
          <p className="annotation-text">{formTexts[index]}</p>
         </div> */}
       </div>
     ))}
   </div>
   {checklength() && (
      <div className='buttons'>
        <button className = "btn" type = "button" onClick={downloadComic} disabled={imagesLoaded !== apiResponses.length}>Share Sample Comic</button>
        {/* <button className='btn share' type="button" disabled={imagesLoaded !== apiResponses.length} >Share Comic</button> */}
      </div>
    )}  
 </div>   

        </div>
  )}

  </>
  

  );
};
