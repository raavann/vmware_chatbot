// Collapsible
var coll = document.getElementsByClassName("collapsible");

let __score__=0;    // current score
let __total__ = 0;  // total score
let __questionCount__ = 0;  // index of question
let __selected__ = 'null';  // selected test in drop down menu

const chatBottom = document.getElementById("chat-bar-bottom")

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}


// QUESTIONS
let firstMessage = "Hello! Welcome to the new text some text some more text..\nThen select the following options!";

function firstBotMessage() {
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = (function getTime() {
        let today = new Date();
        var options = { hour: '2-digit', minute: '2-digit', weekday: 'short'};
        today = today.toLocaleDateString("en-US", options)
        return today;
    })();

    $("#chat-timestamp").append(time);

    // creating drop down and onchange => questioning(this)
    //                                                        onchange = questioning(this)
    let optionHtml = '<select name="disorders" id="disorders" onchange="questioning(this)"> <option value="null">Select a test</option> ';
    for (var key in questions){
        optionHtml += `<option value="${key}">${key}</option>`
    
    }

    $("#chatbox").append(optionHtml);
    chatBottom.scrollIntoView(false);

}

// Send first bot message
firstBotMessage();

// questioning
function questioning(select){
    if(select.value == 'null'){
        reset();
        return;
    }

    __selected__ = select.value;
    __total__ = questions[select.value]['totalPoints'];

    loadQuestion(0);
}

function loadQuestion(questionNum){
    if(questionNum < questions[__selected__]['questions'].length){
        const element = questions[__selected__]['questions'][questionNum];

        let htm = '<p class="botText"><span>' + element['question'] + '</span></p>';
        for (let index = 0; index < element['responses'].length; index++) {
            const option = element['responses'][index];
            htm += `<button class="option" onclick="updateScore(${index})"> ${option}</button>`
            
        }
        $("#chatbox").append(htm);
        chatBottom.scrollIntoView(true);

    } else {
        giveScore();
        chatBottom.scrollIntoView(false);

    }
}

function giveScore(){
    let htm = '<p class="botText"><span>Your total score is ' + __score__ + '</span></p>';
    $("#chatbox").append(htm);
    chatBottom.scrollIntoView(true);
    reset();
}

function updateScore(optionValue){
    let optionSelected =  questions[__selected__]['questions'][__questionCount__]['responses'][optionValue];
    let htm = '<p class="userText"><span>' + optionSelected + '</span></p>';
    $("#chatbox").append(htm);
    chatBottom.scrollIntoView(true);

    __score__ += optionValue + 1;
    __questionCount__++;
    loadQuestion(__questionCount__);
}

// Retrieve the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    chatBottom.scrollIntoView(true);
}

//Gets the text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText('❤️')
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

function reset(){
    __total__ = 0;
    __score__ = 0;
    __questionCount__ = 0;
    __selected__ = 'null';
}