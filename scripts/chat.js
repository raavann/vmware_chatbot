// Collapsible
var coll = document.getElementsByClassName("collapsible");
let __score__=0;
let __total__ = 0;
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

    let optionHtml = '<select name="disorders" id="disorders" onchange="questioning(this)"> <option value="null">Select a test</option> ';

    for (var key in questions){
        optionHtml += `<option value="${key}">${key}</option>`
    
    }
    $("#chatbox").append(optionHtml);
    document.getElementById("userInput").scrollIntoView(false);

}

// Send first bot message
firstBotMessage();

// questioning
function questioning(select){
    if(select.value == 'null'){
        reset();
        return;
    }

    console.log(questions[select.value].length,questions[select.value][0] )
    __total__ = questions[select.value]['totalPoints'];

    for (let index = 0; index < questions[select.value]['questions'].length; index++) {
        const element = questions[select.value]['questions'][index];
        console.log(element);
        scoring(element);
    }
}

function scoring(el){
    for (const key in el) {
        console.log(el)
    }
}

// Retrieve the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText) {
        userText = firstMessage;
    }

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
}