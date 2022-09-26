import { useEffect, useState } from 'react';
import './App.css';

var recognition;

function App() {
  const [resultList, setResultList] = useState([]);
  const [listeningStatus, setListeningStatus] = useState(false);
  const [language, setLanguage] = useState();


  const languageChangeHandler = (lang) => {
    recognition.lang = lang;
    setLanguage(lang);
  }

  useEffect(() => {
    var SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function () {
      setListeningStatus(true);
    };

    recognition.onspeechend = function (event) {
      setListeningStatus(false);
      recognition.stop();
    };

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      var confidence = event.results[0][0].confidence;

      setResultList((results) => [...results, { transcript, confidence }]);
    };
  }, []);


  return (
    <div className="App">
      <div>
        <button
          disabled={!language}
          className="startSpeech"
          onClick={() => recognition.start()}
        >
          Start Speech
        </button>
        <br />
        {language || "you need to select a language first"}
      </div>
      <div className="language-buttons">
        <button
          className="startSpeech"
          onClick={() => languageChangeHandler("ar")}
        >
          Arabic
        </button>
        <button className="startSpeech" onClick={() => languageChangeHandler('en-US')}>
          English
        </button>
      </div>
      {listeningStatus && <h1>we're listening...</h1>}
      {resultList.map((result) => (
        <div id="output">{result.transcript}</div>
      ))}
    </div>
  );
}

export default App;
