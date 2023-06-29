
const endorsementTextField = document.querySelector(".endorsement-text-field");
const fromField = document.querySelector(".from-field");
const toField = document.querySelector(".to-field");
const publishButton = document.querySelector(".publish-button");
const endorsementListEl = document.querySelector(".endorsement-list");

// ############################################ DATABASE SETTING ############################################

const firebaseConfig = {
    apiKey: "AIzaSyBGhIKaqR50P1d6N0aqUX76F0XSFmbc_lA",
    authDomain: "we-are-champion-80ba1.firebaseapp.com",
    databaseURL: "https://we-are-champion-80ba1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "we-are-champion-80ba1",
    storageBucket: "we-are-champion-80ba1.appspot.com",
    messagingSenderId: "662309222812",
    appId: "1:662309222812:web:f054723f9ac6592957b059"
  };

const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
const emdorsementsInDB = dbRef.child("emdorsements")

// ########################################### DATABASE SETTING END ##########################################




// ############################################ DATABASE FUNCTIONS ############################################

function addToDB(endorsement, to, from, likes){
    let endorsementObj =  {
        "to": to,
        "from": from,
        "text": endorsement,
        "likes": likes
    }

    emdorsementsInDB.push(endorsementObj);
}

emdorsementsInDB.on("value", function(snapshot){
    if(!snapshot.exists()) return

    renderEndorsements(Object.entries(snapshot.val()));
    listenForLikes();
});

function updateLikes(key, newLikes){
    const updates = {
        likes: newLikes
    }
    emdorsementsInDB.child(key).update(updates);
}

// ########################################### DATABASE FUNCTIONS END ##########################################




// ###################################### WHEN PUSH BUTTON IS CLICKED ######################################

publishButton.addEventListener("click", function(){
    let endorsement = endorsementTextField.value
    let to = toField.value
    let from = fromField.value

    if(!endorsement) return
    if(!to) to = "Unknown"
    if(!from) from = "Unknown"

    addToDB(endorsement, to, from, 0);
    clearFields();
});

// ##################################### WHEN PUSH BUTTON IS CLICKED END ####################################




// ########################################### CLEARING FUNCTIONS ###########################################

function clearFields(){
    endorsementTextField.value = "";
    toField.value = "";
    fromField.value = "";
}

function clearEndorsementList(){
    endorsementListEl.innerHTML = "";
}

// ########################################## CLEARING FUNCTIONS END #########################################




// ###################################### ENDORSEMENT RENDRING FUNCTIONS #####################################

function renderEndorsements(endorsements){

    clearEndorsementList();
    for(let i=endorsements.length-1; i>=0; i--){
            renderEndorsement(endorsements[i]);
    }
}

function renderEndorsement(endorsementKeyValuePair){
    const key = endorsementKeyValuePair[0];
    const endorsement = endorsementKeyValuePair[1];

    let heartIcon = '🖤';
    if(isLiked(key))  heartIcon = '❤️';

   let endorsementListItem =  `
    <li>
        <div class ="to">To ${endorsement.to}</div>
        <div class="endorsement-text">
            ${endorsement.text}
        </div>
        <div class="from">
            <span>From ${endorsement.from}</span>
            <span class="likes" id=${key}>${heartIcon} ${endorsement.likes}</span>
        </div>
    </li>
    `
    endorsementListEl.innerHTML += endorsementListItem;
}

// #################################### ENDORSEMENT RENDRING FUNCTIONS END ####################################




// ############################################## LIKES FUNCTIONS #############################################

function listenForLikes(){
    const likes = document.querySelectorAll(".likes")
    likes.forEach(like => {
        like.addEventListener("click", function(event){
            const key = event.target.id;
            const previousLikes = Number(event.target.textContent.split(" ")[1]);

            let newLikes = previousLikes;
            if(isLiked(key)){
                removeLike(key);
                newLikes -= 1;
            } 
            else{
                addLike(key);
                newLikes += 1;
            }      

            updateLikes(event.target.id, newLikes);
        });
    });
}

function addLike(key){
    localStorage.setItem(key, "liked");
}

function removeLike(key){
    localStorage.removeItem(key);
}

function isLiked(key){
    if(localStorage.getItem(key)) return true
    return false;
}

// ############################################ LIKES FUNCTIONS END ############################################
