document.addEventListener("DOMContentLoaded", () => {
  const burger_menu = document.querySelectorAll(".burger_menu");
  const small_nav = document.querySelectorAll(".menu_nav");

  const bookContainer = document.querySelector("#books_item_content");  

  // const myRequest = 'https://openlibrary.org/works/OL45804W.json'

  // const myRequest = "https://www.dbooks.org/api/subject/history"

  // const myRequest = "https://www.dbooks.org/api/recent";

  const myRequest = "https://shortstories-api.onrender.com/stories"; // NO LONGER WORRKING

  

  burger_menu.forEach((button) => {
    button.addEventListener("click", (e) => {
      for (var i = 0; i < small_nav.length; i++) {
        small_nav[i].classList.remove("small_device");
        button.classList.add("hide_burger");
      }
    });
  });

  const getBooks = () => {    
    fetch(myRequest)
   
      .then((response) => {
        // response.header("Access-Control-Allow-Origin", "*")
        return response.json();       
      })
      .then((data) => {
        console.log(data)
        if (data) {
          data.forEach((story) => {
            const content_elt = document.createElement("DIV");
            content_elt.innerHTML = `          
          
          <h5 class="story" data-id=${story._id}>${story.title}</h5>  
          <p class="story" data-id=${story._id}>${story.story}</p>  
          <p class="story" data-id=${story._id}><strong> ${story.moral}</strong></p>        
          <p class="story" data-id=${story._id}><em>${story.author}</em></p>
          `;

            content_elt.setAttribute("class", "book_item");
            content_elt.setAttribute("data-id", story._id);
            bookContainer.append(content_elt);
          });

         
        } 
        
       

        console.log(data);
      }).catch(erro=>{
        console.log(erro)
        const content_elt = document.createElement("DIV");
          content_elt.innerHTML = `                     
        <p class="story" data-id="no-data"><em>Ops, No story found! Try again later or switch your network! </em></p>
        `;
          content_elt.setAttribute("class", "book_item error_display");      
          
          // show error block in center

          bookContainer.setAttribute("class", "error_block ");
          bookContainer.removeAttribute("id", "books_item_content");
          bookContainer.append(content_elt);
      });
  };

  getBooks();
});
