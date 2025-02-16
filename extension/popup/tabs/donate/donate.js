document.addEventListener('DOMContentLoaded', function() {
  const donateButton = document.getElementById('donateButton');
  donateButton.addEventListener('click', function() {
    window.open('https://www.example.com/donate', '_blank');
  });
});
