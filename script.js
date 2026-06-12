/* ================= TYPING ================= */
const text = "I design modern web experiences ✨";
let i = 0;

function type() {
  const el = document.getElementById("typing");

  if (!el) return;

  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 50);
  }
}

window.addEventListener("DOMContentLoaded", type);


/* ================= EMAILJS ================= */
(function () {
  emailjs.init("aoPqxtvr1vT7Wb40A"); // 🔴 replace this
})();

const form = document.getElementById("contact-form");
const statusText = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = form.querySelector("button");
  btn.innerText = "Sending...";

  const params = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  emailjs.send("service_3tqmaf4","template_qx99hhf", params)
    .then(() => {
      statusText.innerText = "Message sent successfully ✅";
      statusText.style.color = "#00ff88";

      btn.innerText = "Send Message";
      form.reset();

      setTimeout(() => {
        statusText.innerText = "";
      }, 3000);
    })
    .catch((error) => {
      console.log(error);

      statusText.innerText = "Failed to send message ❌";
      statusText.style.color = "red";

      btn.innerText = "Send Message";
    });
});