import React, {Component, useState, useEffect} from "react";
import { Form } from "../components/form/form";
import { Display } from "../components/display/display";
import './main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { unstable_HistoryRouter } from "react-router-dom";
// import { useLocation ,useHistory } from 'react-router-dom;'


function Main() {
  const [formTexts, setFormTexts] = useState(Array(10).fill(''));
  const [showdisplay, setshowdisplay] = useState(false);
  const [apiResponses, setApiResponses] = useState([]);
  // const history = useHistory();

  const handleFormSubmit = async (event) => {

    event.preventDefault();
    if(showdisplay)
    {
      toast.error('Comic is already generating or is already generated', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    console.log(formTexts);

    if (formTexts.some(item => item === "")) {
      // window.alert("fill complete form");
      toast.error('Please fill all the 10 scenes to generate a Comic', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    
    setshowdisplay(!showdisplay);
  };

  const handlereset = (event) => {

    event.preventDefault();
    setshowdisplay(false);
    setFormTexts(Array(10).fill(''));
    setApiResponses([]);
    // history.push('/');
  }

  return (
    <div className="app-container">
    <ToastContainer/>
      <div className="formcontainer">
      <h1 className="comic-heading">Comic<span id="special">Muse</span></h1>
        <Form formTexts={formTexts} setFormTexts={setFormTexts} onSubmit={handleFormSubmit} handlereset={handlereset} />
      </div>
      <div className="divcontainer">
        <Display apiResponses={apiResponses} setApiResponses={setApiResponses} showdisplay={showdisplay} formTexts={formTexts} />
      </div>
    </div>
  );
}

export default Main;
