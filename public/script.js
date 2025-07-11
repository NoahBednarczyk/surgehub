// script.js

// Smooth scroll to contact section
function scrollToContact() {
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
  }
}

// Alert on form submission
function submitForm(event) {
  event.preventDefault();
  alert('Thanks for contacting us!');
}
