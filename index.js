const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav');

burgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
