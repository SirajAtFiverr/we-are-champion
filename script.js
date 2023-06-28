
const endorsementTextField = document.querySelector(".endorsement-text-field");
const fromField = document.querySelector(".from-field");
const toField = document.querySelector(".to-field");
const publishButton = document.querySelector(".publish-button");

const endorsementListEl = document.querySelector(".endorsement-list");


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

    endorsements.push(
        {
            "to": to,
            "from": from,
            "text": endorsement,
            "likes": 0
        }
    )

    clearFields();
    renderEndorsements();
});

function clearEmdorsementList(){
    endorsementListEl.innerHTML = "";
}

function renderEndorsements(){
    clearEmdorsementList();
    for(let i =0; i<endorsements.length; i++){
        appendEndorsement(endorsements[i]);
    }
}

function appendEndorsement(endorsement){

   let endorsementListItem =  `
    <li>
        <div class="to">To ${endorsement.to}</div>
        <div class="endorsement-text">
            ${endorsement.text}
        </div>
        <div class="from">
            <span>From ${endorsement.from}</span>
            <span class="likes">🖤 ${endorsement.likes}</span>
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

// appendEndorsement(endorsements[0]);
// appendEndorsement(endorsements[1]);
// appendEndorsement(endorsements[2]);