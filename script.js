
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorsementTextField = document.querySelector(".endorsement-text-field");
const fromField = document.querySelector(".from-field");
const toField = document.querySelector(".to-field");
const publishButton = document.querySelector(".publish-button");

const endorsementListEl = document.querySelector(".endorsement-list");

const appSettings = {
    databaseURL: "https://we-are-champion-80ba1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings);
const database = getDatabase(app)
const emdorsementsInDB = ref(database, "emdorsements");


let endorsements = [

    {
        "to": "Leanne",
        "from": "Sindre",
        "text": "Leanne! Thank you so much for helping me with the March accounting. \
                 Saved so much time because of you! 💜 Frode",
        "likes": 7
    },

    {
        "to": "Bob",
        "from": "Per",
        "text": "Hi Bob! Your React Router course is so good. \
                The students are going to LOVE IT. I’m so excited for the launch :) 🔥 Per",
        "likes": 10
    },

    {
        "to": "Abdellah",
        "from": "Sindre",
        "text": "That transcription feature you completed for Scrimba 3.0 is amazing. \
                I know you’ve been working hard on it for several months now. 👏👏👏 Really good work 🙌",
        "likes": 9
    }

];

publishButton.addEventListener("click", function(){
    let endorsement = endorsementTextField.value
    let to = toField.value
    let from = fromField.value

    if(!endorsement) return
    if(!to) to = "Unknown"
    if(!from) from = "Unknown"

    addToDB(endorsement, to, from, 0);
    clearFields();
})

function addToDB(endorsement, to, from, likes){
    let endorsementObj =  {
        "to": to,
        "from": from,
        "text": endorsement,
        "likes": likes
    }

    push(emdorsementsInDB, JSON.stringify(endorsementObj));
}

function clearEndorsementList(){
    endorsementListEl.innerHTML = "";
}

function renderEndorsements(endorsements){
    clearEndorsementList();
    for(let i=0; i<endorsements.length; i++){
            console.log(endorsements[i])
            appendEndorsement(endorsements[i]);
    }
}

function appendEndorsement(endorsementKeyValuePair){
    let key = endorsementKeyValuePair[0];
    let endorsement = JSON.parse(endorsementKeyValuePair[1]);
    let heartIcon = '🖤';

   let endorsementListItem =  `
    <li>
        <divclass ="to">To ${endorsement.to}</div>
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

function clearFields(){
    endorsementTextField.value = "";
    toField.value = "";
    fromField.value = "";
}

onValue(emdorsementsInDB, function(snapshot){
    if(!snapshot.exists()) return
    renderEndorsements(Object.entries(snapshot.val()));
});
