document.addEventListener("DOMContentLoaded", () => {

  const bookContainer = document.querySelector("#books_item_content");

  // const speek_icon = document.querySelectorAll(".fa-volume-high");

  bookContainer.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-solid fa-volume-high")) {
      let text = e.target.dataset.story
      textToSpeech(text)
    }


  })


  let textToSpeech = (word) => {    

    var synthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance();
    let voices = synthesis.getVoices()

    utterance.text = word
    utterance.voice = voices[1];  
    
    synthesis.speak(utterance);
    // console.log(word)
  }

  let stopSpeech = (word) => {
    console.log("we are speeking")

    var synthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices()
    utterance.text = word
    utterance.voice = voices[1];

    // This overrides the text "Hello World" and is uttered instead
    // utterance.text = "My name is Glad.";   
    
    synthesis.speak(utterance);
    console.log(word)
  }

 


});
