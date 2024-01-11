document.addEventListener("DOMContentLoaded", () => {
  const block = document.getElementById("blog_admin");
  const button_container = document.getElementById("button_control");
  const footer_date = document.getElementById("footer_date");

  block.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;

    const id_clicked = JSON.stringify(id);

    // save to localStorage
    let idSave = localStorage.setItem("id", id_clicked);

    if (id_clicked) {
      window.location.href = `../page/single_blog.html?id=${id_clicked}`;
    }
  });

  //  for page logics
  button_container.addEventListener("click", (e) => {
    if (e.target.className.includes("page_button")) {
      window.location.href = `../page/blog.html?page=${e.target.dataset.page}`;
    }
  });

  // updated date footer
  footer_date.innerHTML = new Date().getFullYear();
});
