const logEl = document.getElementById("log")
const timeEl = document.getElementById("timer")
const truthEl = document.getElementById("truth")
const dareEl = document.getElementById("dare")
const board = document.getElementById("board")
const titleEl = document.getElementById("title")
const qesCodeEl = document.getElementById("qesCode")
const questionEl = document.getElementById("question")
const demoTEl = document.getElementById("demoT")
const demoDEl = document.getElementById("demoD")
const capTEl = document.getElementById("capT")
const capDEl = document.getElementById("capD")

var touchCount = 0
var newTouchCount = 0
var currentTouch = null
var timer = null
var timeCount = 3
var choosen = null
var member = []
var hub = false
var hubReady = false
var dO = null
var openBoard = false
var qes = null
var qesT = null
var qesD = null
var resetReady = false
var timeReset = 10


function resetTimer() {
    timeCount = 3
    if (timer) clearInterval(timer)
    timeEl.textContent = `${timeCount}`
    timer = setInterval(() => {
        timeCount--
        timeEl.textContent = `${timeCount}`
        if (timeCount <= 0) {
            clearInterval(timer)
            timeEl.textContent = "-:-"
            chooseOne()
        }
    }
        , 1000)
}
function chooseOne() {
    random = Math.floor(Math.random() * touchCount)
    choosen = currentTouch[random]
    member[random].classList.add("choosen")
    logInHub()
}
function logInHub(){
    hub = true
    touchCount = 0
    setTimeout(() => {resetMember(), hubReady = true}, 3000); 
    logEl.style.opacity = "0"
    timeEl.style.opacity = "0"
    document.body.style.backgroundColor = "rgb(84, 194, 246)"
    qesD = selecQes("Dare")
    qesT = selecQes("Truth")
    console.log(qesD,qesT)
    demoDEl.textContent = `${qesD.split("$")[0].replace(/^./, "_")}`
    demoTEl.textContent = `${qesT.split("$")[0].replace(/^./, "_")}`
    truthActive(1)
    dareActive(1)

}
function showMember(){
    for (let i = 0; i < touchCount; i++) {
        let div = document.getElementById(`mem${i}`)
        div.style.left = `${currentTouch[i].clientX}px`;
        div.style.top = `${currentTouch[i].clientY}px`;
    }
}
function resetMember() {
    member.forEach(div => { div.remove() });
    member = [];
    for (let i = 0; i < touchCount; i++) {
        const div = document.createElement("div");
        div.id = `mem${i}`
        div.classList.add("mem");
        div.style.position = "absolute";
        document.body.appendChild(div);
        member.push(div);
    }
}
function dareActive(open){
    switch (open){
        case 0: {
            dareEl.style.transitionDelay = "0s"
            dareEl.style.opacity = "0"
            dareEl.style.height = "0"
            dareEl.style.width = "0"
            dareEl.style.top = "50%"
            capD.textContent = ""
            break;
        };
        case 1: {
            dareEl.style.transitionDelay = "3s"
            dareEl.style.opacity = "1"
            dareEl.style.height = "48%"
            dareEl.style.width = "95%"
            dareEl.style.top = "75%"
            capD.textContent = `Lèm`
            break;
        };
    }
}
function truthActive(open){
    switch (open){
        case 0: {
            truthEl.style.transitionDelay = "0s"
            truthEl.style.opacity = "0"
            truthEl.style.height = "0"
            truthEl.style.width = "0"
            truthEl.style.top = "50%"
            capT.textContent = ""
            break;
        };
        case 1: {
            truthEl.style.transitionDelay = "3s"
            truthEl.style.opacity = "1"
            truthEl.style.height = "48%"
            truthEl.style.width = "95%"
            truthEl.style.top = "25%"
            capT.textContent = "Lói"
            break;
        };
    }
}
function boardActive(open){
    switch (open){
        case 0:{
            board.style.height = "0"
            board.style.width = "0"
            break;
        }
        case 1:{
            board.style.transitionDelay = "0s"
            board.style.height = "98vh"
            board.style.width = "95vw"
            board.style.border = "5px solid black"
            break;
        }

    }
}
function selecQes(option){
    if (Math.random() > 0.01){
        if (option == "Truth"){
            random = Math.floor(Math.random() * QUESTION_TRUTH.length)
            return QUESTION_TRUTH[random]
        }
        if (option == "Dare"){
            random = Math.floor(Math.random() * QUESTION_DARE.length)
            return QUESTION_DARE[random]
        }
    }
    else {
        let Cl = ["A","B","C","D","E","F"]
        return `${Cl[Math.floor(Math.random() * Cl.length)]}${(Math.floor(Math.random() * 31)).toString().padStart(3, "0")}$Lượt tiếp phải chọn S tier (nếu có)!!!---Miễn lượt chơi tiếp theo.`
    }
}

function hUb(){
    boardActive(1)
    truthActive(0)
    dareActive(0)

    qes = ((dO == "Dare") ? qesD : qesT).split("$");


    titleEl.textContent = `${dO}`
    titleEl.style.opacity = "1"
    qesCodeEl.textContent = `${qes[0]}`
    qesCodeEl.style.opacity = "1"
    questionEl.textContent = `${qes[1]}`
    questionEl.style.opacity = "1"
    setTimeout(rs,8000)



}
function rs(){
    resetReady=true
}
function handle(e) {
    if (!hub){
        currentTouch = Array.from(e.touches)
        newTouchCount = e.touches.length
        if (newTouchCount != touchCount) {
            touchCount = newTouchCount
            resetMember()
            logEl.textContent = `${newTouchCount}`
            if (touchCount > 0) {
                resetTimer()
            }
            else {
                if (timer) clearInterval(timer)
                timer = null
                timeEl.textContent = "-:-"
                choosen = null
            }
        }
        showMember()
    }
}
function restart() {
    if (resetReady) {
        truthActive(0)
        dareActive(0)
        touchCount = 0
        newTouchCount = 0
        currentTouch = null
        timer = null
        timeCount = 3
        choosen = null
        member = []
        hub = false
        hubReady = false
        dO = null
        openBoard = false
        qes = null
        qesT = null
        qesD = null
        demoDEl.textContent = ""
        demoTEl.textContent = ""
        capTEl.textContent = ""
        capDEl.textContent = ""
        questionEl.textContent = ""
        qesCodeEl.textContent = ""
        titleEl.textContent = ""
        document.body.style.backgroundColor = "rgb(189, 62, 62)"
        titleEl.style.opacity = "0"
        qesCodeEl.style.opacity = "0"
        questionEl.style.opacity = "0"
        board.style.height = "0"
        board.style.width = "0"
        board.style.border = "None"
        timeEl.style.opacity = "1"
        logEl.style.opacity = "1"
    };
    resetReady = false
}
board.addEventListener("touchend", (e) => restart())
dareEl.addEventListener("touchstart", (e) => {dO = "Dare"; hUb()})
truthEl.addEventListener("touchstart", (e) => { dO = "Truth"; hUb()})
window.addEventListener('touchstart', (e) => handle(e))
window.addEventListener('touchend', (e) => handle(e))
window.addEventListener('touchmove', (e) => handle(e))
window.addEventListener('touchcancel', (e) => handle(e))
