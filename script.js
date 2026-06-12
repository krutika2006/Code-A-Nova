// EmailJS init
(function () {
  emailjs.init("aoPqxtvr1vT7Wb40A");
})();

// Accordion
function toggle(btn) {
  const content = btn.nextElementSibling;
  content.style.display =
    content.style.display === "block" ? "none" : "block";
}

// Doctor Modal
function showDoctor(name, spec, info) {
  document.getElementById("docName").innerText = name;
  document.getElementById("docSpec").innerText = spec;
  document.getElementById("docInfo").innerText = info;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Appointment Form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("appointmentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;

    emailjs.send("service_3tqmaf4","template_qx99hhf", {
      name,
      email,
      phone,
      date
    })
    .then(() => {
      alert("Appointment booked successfully!");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to send appointment");
    });
  });

  // Contact Form
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const cname = document.getElementById("cname").value;
    const cemail = document.getElementById("cemail").value;
    const message = document.getElementById("message").value;

    emailjs.send("service_3tqmaf4","template_qx99hhf", {
      name: cname,
      email: cemail,
      message
    })
    .then(() => {
      alert("Message sent successfully!");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to send message");
    });
  });
});