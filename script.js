function shortenLink() {
    var longUrl = document.getElementById('longUrl').value;
    if (longUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://dhosting.yzz.me/shorten.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('shortenedUrl').innerHTML = 'Kısaltılmış Bağlantı: ' + xhr.responseText;
            }
        };
        xhr.send('url=' + encodeURIComponent(longUrl));
    }
}
