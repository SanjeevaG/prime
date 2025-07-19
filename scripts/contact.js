// contact.js - Contact page with inquiry form
import { contactData } from './contactdata.js';

function clearPageContent() {
  const header = document.querySelector('header');
  document.body.innerHTML = '';
  if (header) {
    document.body.appendChild(header);
  }
}

function renderContactPage() {
  clearPageContent();
  
  const main = document.createElement('main');
  main.className = 'contact-page';
  
  // Title
  const title = document.createElement('h1');
  title.textContent = 'Contact Us';
  main.appendChild(title);
  
  // Contact information section
  const contactSection = document.createElement('section');
  contactSection.className = 'contact-info';
  
 
  const contactList = document.createElement('div');
  contactList.className = 'contact-list';
  
  contactData.forEach(contact => {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.innerHTML = `
      <h3>${contact.name}</h3>
      <p><a href="tel:${contact.tpNumber}">${contact.tpNumber}</a></p>
    `;
    contactList.appendChild(contactItem);
  });
  
  contactSection.appendChild(contactList);
  main.appendChild(contactSection);
  
  // Inquiry form section
  const formSection = document.createElement('section');
  formSection.className = 'inquiry-form';
  
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Send Inquiry';
  formSection.appendChild(formTitle);
  
  const form = document.createElement('form');
  form.id = 'inquiryForm';
  form.innerHTML = `
    <div class="form-group">
      <label for="name">Your Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="email">Your Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone">
    </div>
    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject" required>
    </div>
    <div class="form-group">
      <label for="message">Your Inquiry</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    <button type="submit" class="submit-btn">Send Inquiry</button>
  `;
  
  // Form submission handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Using FormSubmit.co service (free) or your own backend
      const response = await fetch('https://formsubmit.co/ajax/primeglobaltradingcars@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: `New Inquiry: ${data.subject}`,
          _template: 'table'
        })
      });
      
      if (response.ok) {
        alert('Your inquiry has been sent successfully!');
        form.reset();
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your inquiry. Please try again later.');
    }
  });
  
  formSection.appendChild(form);
  main.appendChild(formSection);
  document.body.appendChild(main);
}

export { renderContactPage };