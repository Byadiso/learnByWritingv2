console.log("welcome to dashboard");
document.addEventListener("DOMContentLoaded", () => {
  const addBlogMenu = document.getElementById("add");
  const blogAdmin = document.getElementById("blog_admin");
  const form_blog = document.getElementById("form_blog");

  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');

  addBlogMenu.addEventListener("click", () => {
    blogAdmin.style.display = "none";
    form_blog.classList.remove("hide");
  });

  const block = document.getElementById("blog_admin");
  block.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    console.log(e.target.dataset.id);
    console.log(e.target.dataset.id);
  
    const id_clicked = JSON.stringify(id);
  
    // save to localStorage
    let idSave = localStorage.setItem("id", id_clicked);
  
    if (id_clicked) {
      window.location.href = `../page/delete.html?id=${id_clicked}`;
    }
    
  });

});
