window.onSpotifyWebPlaybackSDKReady = () => {
    let swb = new SpotifyWebPlayer();

    document.getElementById('volumeUp').onclick = function() {swb.volumeUp()};
    document.getElementById('volumeDown').onclick = function() {swb.volumeDown()};
    document.getElementById('togglePlay').onclick = function() { swb.togglePlay() };

    swb.webPlayerConnect();
}