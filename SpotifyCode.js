class SpotifyWebPlayer {
    constructor() {
        this.volume;
        this.player;

        this.webPlayerInitialize();
    }

    webPlayerInitialize() {
        const token = 'BQBooZqGEVaCdjDi0ysZDYvqIYcGm7P9QSDNFNMjywcwTsN1kxt1Gqygnml7TykmJlaqu-nEYtHhCiCYv712iP_L7pgl8HN3OzfJuIYBj_p9DNBWzZJCT1vKrx5r5D2tpiQoI78qA1OE_inKx8FTFZpq3VeilfHELJfjiR1oP75vB8kRvxRRXw39RCbnMun-rvb5t310-A';
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); }
        });

        this.player = player;
        this.getVolume();
        this.setListeners()
    }

    getVolume() {
        this.player.getVolume().then(v => {
            this.volume = v;
            let volume_percentage = this.volume * 100;
            console.log(`The volume of the player is ${volume_percentage}%`);

            document.getElementById('volume').innerHTML = volume_percentage;
        });
    }

    setListeners() {
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        this.player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('account_error', ({ message }) => {
            console.error(message);
        });
    }

    webPlayerConnect() {
        this.player.connect();
    }

    togglePlay() {
        if (document.getElementById('togglePlay').innerHTML == "Play") {
            document.getElementById('togglePlay').innerHTML = "Pause";
        } else {
            document.getElementById('togglePlay').innerHTML = "Play";
        }

        this.player.togglePlay();
    }

    volumeUp() {
        this.volume = Math.round(this.volume * 10 + 1) / 10;
        if (this.volume <= 100) {
            this.player.setVolume(this.volume).then(() => {
                console.log('Volume updated!');
            });
        }

        this.getVolume();
    }

    volumeDown() {
        this.volume = Math.round(this.volume * 10 - 1) / 10;
        if (this.volume >= 0) {
            this.player.setVolume(this.volume).then(() => {
                console.log('Volume updated!');
            });
        }

        this.getVolume();
    }
}