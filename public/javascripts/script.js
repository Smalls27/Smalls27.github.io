// constiables that will be used in this project. //////////////////////////////////////////////////////////
const songs = document.getElementsByTagName("li");
const audio = document.querySelectorAll("audio");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("button");
const buttons = document.getElementsByTagName("button");
const errDiv = document.getElementById('errDiv');
const form = document.getElementById('payment-form');
const stripe = Stripe('pk_test_SXL7dH0yB67P2J9wXvpvdQtp002KgjGBp6');
const elements = stripe.elements();
const downloadSong = document.getElementById('downloadLink');
const downloadButton = document.getElementById('downloadButton');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const albumButton = document.getElementById('albumButton');
const albumLink = document.getElementsByTagName('a')[2];
const downloadList = document.getElementById('downloadList');
const select = document.getElementsByTagName('select')[0];
const select1 = document.getElementsByTagName('select')[1];
const card = document.getElementById('cardElement');
const checkboxes = document.getElementsByTagName('input');
let loadSongs = [];

// The object that will house all of the functionality of the player. //////////////////////////////////////////////////////////

// if (downloadSong) {
//     let clicked = 0;

//     // function downloadAlbum() {
//     //     const loof = document.createAttribute('href');
//     //     loof.value = `songs/${select1.value}.zip`;
//     //     albumLink.setAttributeNode(loof);
//     //     albumLink.innerHTML = `Download ${select1.value}`;
//     // }
    
//    function downloadSome() {
//         function download() {
//             for (let i = 0; i < loadSongs.length; i++) {
//                 const direction = document.createAttribute('href');
//                 direction.value = `songs/${loadSongs.pop()}.mp3`;
//                 downloadSong.setAttributeNode(direction);
//                 downloadSong.click();
//                 downloadSong.removeAttributeNode(direction);
//                 downloadList.innerHTML = loadSongs;
//             }
//         }

//         setInterval(download, 700, loadSongs);
//     }

//     addButton.addEventListener('click', () => {
//         loadSongs.push(`${select.value}`);
//         downloadList.innerHTML = loadSongs;

//         if (loadSongs.length === 0) {
//             downloadSong.innerHTML = 'Download';
//         } else if (loadSongs.length === 1) {
//             downloadSong.innerHTML = `Download ${select.value}`;
//         } else {
//             downloadSong.innerHTML = `Download Songs`;
//         }
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
//         }
//     });

//     // select1.addEventListener('click', () => {
//     //     downloadAlbum();
//     // });

//     downloadButton.addEventListener('click', () => {
//         clicked++;

//         if (clicked === 1) {
//             setTimeout(() => {
//                 window.location.assign('/musicPlayer');
//             }, 3000)
//         }
//     });

//     // albumButton.addEventListener('click', () => {
//     //     clicked++;

//     //     if (clicked === 1) {
//     //         setTimeout(() => {
//     //             window.location.assign('/musicPlayer');
//     //         }, 1000)
//     //     }
//     // });
// }

const musicPlayer = {
    activate(event) {
        if (event.target.getAttribute("class") !== "active") {
            const id = document.createAttribute("id");
            id.value = "selected"

            event.target.setAttributeNode(id);
            event.target.setAttribute("class", "buffer makeTaller active");
            showSongInfo(event);
        }

        function showSongInfo(event) {
            let artist = document.getElementById("artist");
            let artistSong = document.getElementById("artistSong");

            artist.innerHTML = event.target.parentElement.getAttribute("artist");
            artistSong.innerHTML = (event.target.parentElement.firstElementChild.innerHTML);
        }
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
            }
        }
    },
    
    playSong(event) {
        for (let i = 0; i < songs.length; i++) {
            if (event.target.parentElement.contains(audio[i])) {
                event.target.parentElement.lastElementChild.play();
                purchaseSong();
            } 
        }

        function purchaseSong() {
            const button = document.getElementsByTagName("button")[1];
            const song1 = document.getElementById("selected");

            if (song1) {
                button.setAttribute("class", "btn btn-block purchaseColor")
            }
        }
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
            }

            if (s === 50) {
                event.target.nextElementSibling.pause();
                event.target.nextElementSibling.currentTime = 0;
            }
            songCounter.innerHTML = `${m}:${s}`;
            duration.style.width = parseInt(Math.floor(musicPlayer.dynamicWidth(event))) + "px";
        }
    },
}

// The addEventListener with a for loop that will control the functioanlity of the player. //////////////////////////////////////////////////////////addEventListener("click", () => {
for (let i = 0; i < songs.length; i++) {
    songs[i].addEventListener("click", (event) => {
        musicPlayer.stopMusic();
        musicPlayer.deactivate();
        musicPlayer.activate(event);
        musicPlayer.playSong(event);
        musicPlayer.songVitals(event);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Code below this line pertains to the login page ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function used to validate the login form. //////////////////////////////////////////////////////////

const toAccountPage = () => {
    window.location.assign('/account');
}

const toCredentialsPage = () => {
    window.location.assign('/credentials');
}

const backToLoginPage = () => {
    window.location.assign('/')
}

const backToMusicPage = () => {
    window.location.assign('/musicPlayer')
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Code below this line pertains to the login page ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const style = {
    base: {
        fontSize: '20px',
        color: 'rgb(90, 67, 210)'
    }
}
const cardElement = elements.create('card', {style: style});

if (card) {
    cardElement.mount('#cardElement');
}


if (form) {
    const calculateTotal = () => {
        const itemList = document.getElementById('items').children;
        const price = document.getElementById('price');
        const priceArray = [];

        for (let i = 0; i < itemList.length; i++) {
            const priceString = itemList[i].lastElementChild.innerHTML.slice(1, 6);
            priceArray.push(parseFloat(priceString));
            price.innerHTML =`$ ${priceArray.reduce((a, b) => a + b)}`;
        }
    }

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
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
                alert('Your payment has been processed!');
            }
        }
        });
    });
}

    

