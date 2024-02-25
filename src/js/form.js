const form = document.querySelector(".feedback-form")
const button = document.querySelector(".button")

const KEY_STORAGE = "feedback-form"
let emailValue = form.elements.email.value;
let messageValue = form.elements.message.value

form.addEventListener("input", onInput)

function onInput (e){
    e.preventDefault()

      
    const email = emailValue.trim()
    const textarea = messageValue.trim()

    const entryData = {
        email: email, 
        message: textarea
    }

localStorage.setItem(KEY_STORAGE, JSON.stringify(entryData))

}

function reload(){
    const parseData = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {}

    if(parseData){
        emailValue = parseData.email || "";
        messageValue = parseData.message || ""
    }
}

reload()

form.addEventListener("submit", onSumbit)

function onSumbit(e){
    e.preventDefault();

    emailValue = "";
    messageValue =  ""

    localStorage.clear()
}