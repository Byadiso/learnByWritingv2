// save our id to localStorage

const block = document.getElementById("blog_admin");

block.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.dataset.id;
  console.log(e.target.dataset.id);
  console.log(e.target.dataset.id);

  // if (e.target.className === "readme_button") {
  //   console.log("yes");
  // }

  const id_clicked = JSON.stringify(id);

  // save to localStorage
  let idSave = localStorage.setItem("id", id_clicked);

  if (id_clicked) {
    window.location.href = `../page/single_blog.html?id=${id_clicked}`;
  }
  
});
