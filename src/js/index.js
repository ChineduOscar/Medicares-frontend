const subscribeForm = document.getElementById('subscribeForm')
const emailInput = document.getElementById('emailInput')
const subscribeBtn = document.getElementById("subscribeBtn");
const messageBox = document.getElementById("messageBox")

const API_URL = "https://medicares-backend-api.onrender.com/subscribe/send";

subscribeForm.addEventListener('submit', submitMessage)

async function submitMessage(e){
    e.preventDefault()
    const emailValue = emailInput.value.trim()

    if (!emailValue) {
        showMessage("Please enter your email address.", false);
        return;
    }

    try{
        subscribeBtn.disabled = true
        subscribeBtn.textContent = 'Subscribing...';
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: emailValue
            })
        })

        if (!res.ok) {
            showMessage(data.message || "Subscription failed", false);
            return;
        }

        const data = await res.json()

        showMessage(data.message, true)
        subscribeForm.reset()
    }catch(error){
        showMessage("Something went wrong. Please try again later.", false);
    }finally{
        subscribeBtn.disabled = false
        subscribeBtn.textContent = 'Subscribe'
    }
}

function showMessage(message, status){
    messageBox.textContent = message
    if (status) {
        messageBox.style.color = "#16a34a";
    } else {
        messageBox.style.color = "#dc2626";
    }
}