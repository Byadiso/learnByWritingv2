document.addEventListener("DOMContentLoaded", () => {
  const burger_menu = document.querySelectorAll(".burger_menu");
  const small_nav = document.querySelectorAll(".menu_nav");
  const loading = document.getElementById("loading");
  const load_more_button = document.getElementById("load_more_button");



  const page = 1;
  const storyPerPage = 5;
  const skip = (page -1)* storyPerPage;
  // const NextPage = currentPage + newData.length;

  const bookContainer = document.querySelector("#books_item_content");

  // const myRequest = 'https://openlibrary.org/works/OL45804W.json'

  // const myRequest = "https://www.dbooks.org/api/subject/history"

  // const myRequest = "https://www.dbooks.org/api/recent";

  const myRequest = `https://shortstories-api.onrender.com/stories`; // NO LONGER WORRKING

  burger_menu.forEach((button) => {
    button.addEventListener("click", (e) => {
      for (var i = 0; i < small_nav.length; i++) {
        small_nav[i].classList.remove("small_device");
        button.classList.add("hide_burger");
      }
    });
  });

  const getBooks = (storyPerPage) => {
    fetch(myRequest)
      .then((response) => {
        // response.header("Access-Control-Allow-Origin", "*")
        return response.json();
      })
      .then((data) => {
        if (data) {
          loading.style.display = "none";
          load_more_button.style.display = "block";
          const newData = data.slice(0, storyPerPage);
          newData.forEach((story) => {
            const content_elt = document.createElement("DIV");
            content_elt.innerHTML = `   
          <h5 class="story" data-id=${story._id}>${story.title}</h5>  
          <p class="story" data-id=${story._id}>${story.story}</p>  
          <p class="story" data-id=${story._id}><strong> ${story.moral}</strong></p>        
          <p class="story" data-id=${story._id}><em>${story.author}</em></p>
          <hr>
          `;

            content_elt.setAttribute("class", "book_item");
            content_elt.setAttribute("data-id", story._id);
            bookContainer.append(content_elt);
          });
        }
      })
      .catch((erro) => {
        loading.style.display = "none";
        const content_elt = document.createElement("DIV");
        content_elt.innerHTML = `                     
        <p class="story" data-id="no-data"><em>Ops, No story found! Try again later or switch your network! </em></p>
        `;
        content_elt.setAttribute("class", "story_item error_display");

        // show error block in center
        bookContainer.setAttribute("class", "error_block ");
        bookContainer.removeAttribute("id", "books_item_content");
        bookContainer.append(content_elt);
      });
  };

  getBooks(storyPerPage);


  // get more stories
  load_more_button.addEventListener("click", (e)=>{
    e.preventDefault();
    const LoadMore=storyPerPage+skip;    
    getBooks(LoadMore)
  })
});
