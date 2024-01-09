
document.addEventListener("DOMContentLoaded", ()=>{

  const block = document.getElementById("blog_admin");
  const page_button = document.querySelectorAll(".page_button");
  
  const footer_date = document.getElementById("footer_date");
  
  block.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    console.log(e.target.dataset.id);
    console.log(e.target.dataset.id);
  
    const id_clicked = JSON.stringify(id);
  
    // save to localStorage
    let idSave = localStorage.setItem("id", id_clicked);
  
    if (id_clicked) {
      window.location.href = `../page/single_blog.html?id=${id_clicked}`;
    }
    
  });
  
  

  //  for page logics
  
  //accessing button
   // add clicking on the page button
   // fetch the page number adn page content.
  
   page_button.forEach(element => {
    
    element.addEventListener("click", (e)=>{
      // console.log(e.target.dataset.page)
      window.location.href = `../page/blog.html?id=${e.target.dataset.page}`;

     
      
       })

       
   });

   var myData = localStorage.getItem('data')
   console.log(myData);
  
      // updated date footer
      footer_date.innerHTML= new Date().getFullYear();
  

})


