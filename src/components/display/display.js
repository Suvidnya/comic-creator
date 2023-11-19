import React, { useEffect, useState } from 'react';
import './display.css';
import html2canvas from 'html2canvas';
import DomToImage from 'dom-to-image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Display = ({ apiResponses, setApiResponses, showdisplay, formTexts }) => {
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
  "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666900553731-2525ccd6941a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1635805739892-ab7b431400f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515734392280-e60c25eb9f01?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505925456693-124134d66749?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1524481905007-ea072534b820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

   const downloadComicmain = () => {

// -----------------------------------------------------
// TESTING
// return;
    if (imagesLoaded === apiResponses.length) {
      const container = document.querySelector('.flex-containermain');

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
         {(apiResponses.length != 10) ? (
          <p id="wait">The comic is getting generated ...</p>
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
            <button className = "btn sharemain" type = "button" onClick={downloadComicmain} disabled={imagesLoaded !== 10}>Share Comic</button>
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
