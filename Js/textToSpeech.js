document.addEventListener("DOMContentLoaded", () => {

  const bookContainer = document.querySelector("#books_item_content");

  // const speek_icon = document.querySelectorAll(".fa-volume-high");

  bookContainer.addEventListener("click", (e)=>{
    if(e.target.className.includes("fa-solid fa-volume-high")){
      let text= e.target.dataset.story
      
      textToSpeech(text)
    }
    

  })


  let textToSpeech= (word)=>{
    console.log("we are speeking")
    console.log(word)
  }
  
 
});
