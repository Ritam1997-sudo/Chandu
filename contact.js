document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-us form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We’ll get back to you soon.');
    form.reset();
  });
});