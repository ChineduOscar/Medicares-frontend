const contactForm = document.getElementById("contactForm");
const fullNameInput = document.getElementById("fullNameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const messageBox = document.getElementById("messageBox");
const sendBtn = document.getElementById("sendBtn")

const API_URL = "http://localhost:3000/contact";

contactForm.addEventListener("submit", submitMessage);

async function submitMessage(e) {
  e.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!fullName || !email || !message) {
    showMessage("All fields are required.", false);
    return;
  }

  try {
    sendBtn.textContent = 'Submitting...'
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || "Message failed to send", false);
      return;
    }

    showMessage(data.message, true);
    contactForm.reset();
  } catch (error) {
    console.log(error);
    showMessage("Something went wrong. Please try again later.", false);
  }finally{
    sendBtn.textContent = 'Submit'
  }
}

function showMessage(message, status) {
  messageBox.textContent = message;

  if (status) {
    messageBox.style.color = "#16a34a";
  } else {
    messageBox.style.color = "#dc2626";
  }
}