document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tools-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const href = button.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });
});