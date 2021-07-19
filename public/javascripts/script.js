// constiables that will be used in this project. //////////////////////////////////////////////////////////
const songs = document.getElementsByTagName("li");
const audio = document.querySelectorAll("audio");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("button");
const buttons = document.getElementsByTagName("button");
const errDiv = document.getElementById('errDiv');
const form = document.getElementById('payment-form');
const stripe = Stripe('pk_live_uk9FDpwP30p8g4jLxzWGuHx200MZtAROIy');
const elements = stripe.elements();
const downloadSong = document.getElementById('downloadLink');
const downloadButton = document.getElementById('downloadButton');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const albumButton = document.getElementById('albumButton');
const albumLink = document.getElementsByTagName('a')[2];
const downloadList = document.getElementById('downloadList');
const select = document.getElementById('only');
const select1 = document.getElementsByTagName('select')[1];
const card = document.getElementById('cardElement');
const checkboxes = document.getElementsByName('cartItems');
const cartButton = document.getElementById('toCartButton');
const paragraph = document.getElementsByTagName('p')[0];
let loadSongs = [];

// The object that will house all of the functionality of the player. //////////////////////////////////////////////////////////
if (cartButton) {
    cartButton.addEventListener('click', () => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                // paragraph.style.color = red;
                paragraph.innerHTML = "The checkbox for the song you want must be checked.";
                break;
            };
        };
    });
};

if (downloadSong) {
    let clicked = 0;

    function getSong() {
        const loof = downloadSong.getAttributeNode('href');
        loof.value = `songs/${select.value}.mp3`;
        downloadSong.innerHTML = `<i class="fa fa-download"></i> Download ${select.value}`;
    };
    
//    function downloadSome() {
//         function download() {
//             for (let i = 0; i < loadSongs.length; i++) {
//                 const direction = document.createAttribute('href');
//                 direction.value = `songs/${loadSongs.pop()}.mp3`;
//                 downloadSong.setAttributeNode(direction);
//                 downloadSong.click();
//                 downloadSong.removeAttributeNode(direction);
//                 downloadList.innerHTML = loadSongs;
//             };
//         };
//         setInterval(download, 700, loadSongs);
//     };

//     addButton.addEventListener('click', () => {
//         loadSongs.push(`${select.value}`);
//         downloadList.innerHTML = loadSongs;

//         if (loadSongs.length === 0) {
//             downloadSong.innerHTML = 'Download';
//         } else if (loadSongs.length === 1) {
//             downloadSong.innerHTML = `Download ${select.value}`;
//         } else {
//             downloadSong.innerHTML = `Download Songs`;
//         };
//     });

//     removeButton.addEventListener('click', () => {
//         loadSongs.pop();
//         downloadList.innerHTML = loadSongs;

//         if (loadSongs.length === 0) {
//             downloadSong.innerHTML = 'Download';
//         } else if (loadSongs.length === 1) {
//             downloadSong.innerHTML = `Download ${loadSongs[0]}`;
//         } else {
//             downloadSong.innerHTML = `Download Songs`;
//         };
//     });

        select.addEventListener('click', () => {
            getSong();
        });

        downloadSong.addEventListener('click', () => {
            clicked++;

            if (clicked === 1) {
                setTimeout(() => {
                    window.location.assign('/musicPlayer');
                }, 1500);
            };
        });

//     // albumButton.addEventListener('click', () => {
//     //     clicked++;

//     //     if (clicked === 1) {
//     //         setTimeout(() => {
//     //             window.location.assign('/musicPlayer');
//     //         }, 1000);
//     //     };
//     // });
}

const musicPlayer = {
    activate(event) {
        if (event.target.getAttribute("class") !== "active") {
            const id = document.createAttribute("id");
            id.value = "selected";

            event.target.setAttributeNode(id);
            event.target.setAttribute("class", "buffer makeTaller active");
            showSongInfo(event);
        };

        function showSongInfo(event) {
            let artist = document.getElementById("artist");
            let artistSong = document.getElementById("artistSong");

            artist.innerHTML = event.target.parentElement.getAttribute("artist");
            artistSong.innerHTML = (event.target.parentElement.firstElementChild.innerHTML);
        };
    },

    dynamicWidth(event) {
        const musicDuration = event.target.nextElementSibling.duration;
        const musicCurrentTime = event.target.nextElementSibling.currentTime;
        const elementWidth = document.getElementById("progress").offsetWidth;
        constantDuration = 50 / musicDuration;
        newDuration = (elementWidth / musicDuration * musicCurrentTime) / constantDuration;
        return newDuration;
    },

    deactivate() {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].firstElementChild.getAttribute("class") === "buffer makeTaller active") {
                songs[i].firstElementChild.setAttribute("class", "buffer makeTaller");
                songs[i].firstElementChild.removeAttribute("id");
            };
        };
    },
    
    playSong(event) {
        for (let i = 0; i < songs.length; i++) {
            if (event.target.parentElement.contains(audio[i])) {
                event.target.parentElement.lastElementChild.play();
                purchaseSong();
            };
        }

        function purchaseSong() {
            const button = document.getElementsByTagName("button")[1];
            const song1 = document.getElementById("selected");

            if (song1) {
                button.setAttribute("class", "btn btn-block purchaseColor");
            };
        };
    },

    stopMusic() {
        audio.forEach(song => {
            song.pause();
            song.currentTime = 0;
        });
    },
    
    songVitals(event) {
        event.target.nextElementSibling.ontimeupdate = function() {songDuration(event)};

        function songDuration(event) {
            const duration = document.getElementById("progressBar");
            const songCounter = document.getElementById("duration");
            let s = parseInt(event.target.nextElementSibling.currentTime % 60);
            let m = parseInt(event.target.nextElementSibling.currentTime / 60) % 60;
    
            if (s < 10) {
                s = "0" + s;
            };

            if (s === 50) {
                event.target.nextElementSibling.pause();
                event.target.nextElementSibling.currentTime = 0;
            };
            songCounter.innerHTML = `${m}:${s}`;
            duration.style.width = parseInt(Math.floor(musicPlayer.dynamicWidth(event))) + "px";
        };
    },
};

// The addEventListener with a for loop that will control the functioanlity of the player. //////////////////////////////////////////////////////////addEventListener("click", () => {
for (let i = 0; i < songs.length; i++) {
    songs[i].addEventListener("click", (event) => {
        musicPlayer.stopMusic();
        musicPlayer.deactivate();
        musicPlayer.activate(event);
        musicPlayer.playSong(event);
        musicPlayer.songVitals(event);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Code below this line pertains to the login page ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function used to validate the login form. //////////////////////////////////////////////////////////

const toAccountPage = () => {
    window.location.assign('/account');
};

const toCredentialsPage = () => {
    window.location.assign('/credentials');
};

const backToLoginPage = () => {
    window.location.assign('/');
};

const backToMusicPage = () => {
    window.location.assign('/musicPlayer');
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Code below this line pertains to the login page ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const style = {
    base: {
        fontSize: '20px',
        color: 'rgb(90, 67, 210)'
    }
};
const cardElement = elements.create('card', {style: style});

if (card) {
    cardElement.mount('#cardElement');
};


if (form) {
    const calculateTotal = () => {
        const itemList = document.getElementById('items').children;
        const price = document.getElementById('price');
        const priceArray = [];

        for (let i = 0; i < itemList.length; i++) {
            const priceString = itemList[i].lastElementChild.innerHTML.slice(1, 6);
            priceArray.push(parseFloat(priceString));
            price.innerHTML =`$ ${priceArray.reduce((a, b) => a + b)}`;
        };
    };

    calculateTotal();


    form.addEventListener('click', async () => {
        
        // If the client secret was rendered server-side as a data-secret attribute
        // on the <form> element, you can retrieve it here by calling `form.dataset.secret`
        stripe.confirmCardPayment(form.dataset.secret, {
            payment_method: {
                card: cardElement
            }
        }).then(result => {
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            errDiv.innerHTML = result.error.message;
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                window.location.assign('/download');
            };
        };
        });
    });
};

    

