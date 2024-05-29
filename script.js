var dragDiv = document.getElementById('drag-div');
var offsetX, offsetY;

dragDiv.addEventListener('touchstart', function(event) {
    offsetX = event.touches[0].clientX - dragDiv.getBoundingClientRect().left;
    offsetY = event.touches[0].clientY - dragDiv.getBoundingClientRect().top;
});

dragDiv.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Dokunmatik olayların varsayılan davranışını engelle
    dragDiv.style.left = (event.touches[0].clientX - offsetX) + 'px';
    dragDiv.style.top = (event.touches[0].clientY - offsetY) + 'px';
});
