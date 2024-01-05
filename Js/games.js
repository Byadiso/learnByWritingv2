document.addEventListener("DOMContentLoaded", () => {
  const footer_date = document.getElementById("footer_date");

  // updated date footer
  footer_date.innerHTML = new Date().getFullYear();
});
