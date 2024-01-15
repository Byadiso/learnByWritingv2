// importing firebaseConfiguration and other configurations
import { RapidAPI_Key } from "./apikey.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchResult = document.getElementById("search_content");
  const synonym_container = document.getElementById("synonym_container");
  // const search = document.getElementById("search");
  // const submit = document.getElementById("submit");
  const errorDisplay = document.getElementById("error");

  let vocabulary_container = document.getElementById("vocabulary_item_content");
  let word = "";
  let vocabularies = [];
  let synonyms = [];

  vocabulary_container.addEventListener("click", (e) => {
    if (e.target.className.includes("vocabulary_header") == 1) {
      let word = e.target.dataset.word;
      window.location.href = `../page/meaning.html?word=${word}`;
    }
  });

  let word_vocabulary = location.href.split("?word=")[1];
  let word_header = decodeURIComponent(word_vocabulary).replace(/['"]+/g, "");
  let word_meaning = document.getElementById("word_meaning");

  if (word_meaning == undefined) {
    console.log(word_meaning == undefined);
  } else if (word_header) {
    word_meaning.innerHTML = word_header;
    const getWord = async (word) => {
      if (word != "") {
        const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RapidAPI_Key,
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const data = result.results;
          vocabularies.push(data);
          const Add_vocabulary_Btn = document.createElement("button");
          Add_vocabulary_Btn.innerHTML = "See synonym";
          Add_vocabulary_Btn.setAttribute("class", "Add_vocabulary_Btn");
          data.forEach((element) => {
            const definition = document.createElement("p");
            definition.innerHTML =
              `<strong>
              "${word.charAt(0).toUpperCase() + word.slice(1)}"
                           : </strong>` +
              element.definition.charAt(0).toUpperCase() +
              element.definition.slice(1);
            searchResult.append(definition);
          });
          searchResult.append(Add_vocabulary_Btn);
        } catch (error) {
          errorDisplay.style.display = "block";
          errorDisplay.innerHTML = "Word not found try again";
          console.error(error);
        }
      } else {
        errorDisplay.style.display = "block";
        errorDisplay.innerHTML = "Please write Something ...";
        console.log("Please enter a word");
      }
    };

    getWord(word_header);
  }

  const getSynonmy = async (word) => {
    // const word = "eat";
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RapidAPI_Key,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      const data = result.synonyms;

      console.log(data);
      synonyms.push(data);      
      
      data.forEach((element) => {
        const definition = document.createElement("p");
        definition.innerHTML =`${element.charAt(0).toUpperCase() +
          element.slice(1) + " ," + ""}        
          `;
          synonym_container.append(definition);
        
      });     
      
      
    } catch (error) {
      console.error(error);
    }
  };

 

  searchResult.addEventListener("click",()=>{
    getSynonmy(word_header);
    console.log("yes")
  })
});
