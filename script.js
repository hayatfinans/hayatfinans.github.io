var dragDiv = document.getElementById('drag-div');

var offsetX, offsetY;

dragDiv.addEventListener('dragstart', function(event) {
    offsetX = event.clientX - dragDiv.getBoundingClientRect().left;
    offsetY = event.clientY - dragDiv.getBoundingClientRect().top;
});

dragDiv.addEventListener('drag', function(event) {
    event.preventDefault(); // Fare olaylarının varsayılan davranışını engelle
    dragDiv.style.left = (event.clientX - offsetX) + 'px';
    dragDiv.style.top = (event.clientY - offsetY) + 'px';
});
