// save our id to localStorage

const block = document.getElementById("blog_admin");

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


 // updated date footer
 footer_date.innerHTML= new Date().getFullYear();