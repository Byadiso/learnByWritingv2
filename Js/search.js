// importing firebaseConfiguration and other configurations
import { RapidAPI_Key } from "./apikey.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchResult = document.getElementById("search_content");
  const search = document.getElementById("search");
  const submit = document.getElementById("submit");
  const errorDisplay = document.getElementById("error");

  const footer_date = document.getElementById("footer_date");

  let word = "";
  let vocabularies =[]

  //   get search word
  search.addEventListener("keyup", (e) => {
    e.preventDefault();
    word = e.target.value;

    clearCheck(word);
  });

  //   cleat if search is empty
  const clearCheck = (word) => {
    if (word == "") {
      searchResult.style.display = "none";
      errorDisplay.style.display = "none";
      searchResult.innerHTML = "";
    } else {
      searchResult.style.display = "block";
      errorDisplay.style.display = "none";
    }
  };

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    clearCheck(word);
    if (word != undefined) {
      getWord(word);
    } else {
      console.log("type at lest a word");
    }
  });

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
        vocabularies.push(data)
        const Add_vocabulary_Btn = document.createElement("button");
        Add_vocabulary_Btn.innerHTML="Save to vocabulary list";
        Add_vocabulary_Btn.setAttribute("class", "Add_vocabulary_Btn");
        data.forEach((element) => {
          const definition = document.createElement("p");
          definition.innerHTML =
            `<strong>
            "${word.charAt(0).toUpperCase() + word.slice(1) }"
                         : </strong>` + element.definition.charAt(0).toUpperCase()+element.definition.slice(1) ;
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

  const getSynonmy = async () => {
    const word = "eat";
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
    } catch (error) {
      console.error(error);
    }
  };

  getSynonmy();


  // adding vocabulary to the page
  searchResult.addEventListener("click", (e)=>{
    if(e.target.classList.contains("Add_vocabulary_Btn")){
      e.preventDefault()      
      
      let definition = vocabularies[0][0].definition
      console.log(definition)
      addVocabulary(word,definition)
    }

  }
  )

  // adding vocabulary
  const addVocabulary = (word, definition)=>{ 
    console.log("yes let add a vocabulary")
     firebase
    .database()
    .ref("vocabularies/")
    .push()
    .set(
      {
        header: word,  
        content: definition, 
        createdAt: Date.now(),        
      },
      function (error) {
        if (error) {
          console.log("error while adding vocabulary");
        } else {
          console.log("successfully added");

        }
      }
    )

  }

  // updated date footer
 footer_date.innerHTML= new Date().getFullYear();

});
