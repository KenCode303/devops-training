// ===========================
// Configuration - Replace with YOUR Google Apps Script URL
// ===========================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBkRSmMJXWuGsbeGZe8zIWqHwluGybcONHKOEwPMivLS3oOo-uHKhswzlak2un9cB3/exec';

// ===========================
// DOM Elements
// ===========================
const form = document.getElementById('registrationForm');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = form.querySelector('.submit-btn');
const itSkillsSlider = document.getElementById('itSkills');
const ratingValue = document.getElementById('ratingValue');

// ===========================
// Update Rating Display
// ===========================
itSkillsSlider.addEventListener('input', (e) => {
    ratingValue.textContent = e.target.value;
});

// ===========================
// Form Submission Handler
// ===========================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check if script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        showMessage('Please configure the Google Apps Script URL in script.js', 'error');
        return;
    }

    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    showMessage('Submitting your registration...', 'loading');

    // Collect form data
    const formData = new FormData(form);
    
    // Optional: Warn about temporary email services
    const email = formData.get('email');
    const tempEmailDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email', 'mailinator.com'];
    const emailDomain = email.split('@')[1];
    if (tempEmailDomains.some(temp => emailDomain && emailDomain.includes(temp))) {
        showMessage('⚠️ Please use a permanent email address, not a temporary email service.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
        return;
    }
    
    const data = {
        fullName: formData.get('fullName'),
        dob: formData.get('dob') || 'Not provided',
        occupation: formData.get('occupation'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        education: formData.get('education'),
        country: formData.get('country'),
        itSkills: formData.get('itSkills'),
        reason: formData.get('reason'),
        timestamp: new Date().toISOString()
    };

    try {
        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Note: With 'no-cors' mode, we can't read the response
        // So we assume success if no error is thrown
        showMessage('✅ Registration submitted successfully! Thank you for registering.', 'success');
        form.reset();
        ratingValue.textContent = '5';
        
        // Re-enable button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Registration';
        }, 3000);

    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('❌ Error submitting registration. Please try again or contact support.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
    }
});

// ===========================
// Show Status Message
// ===========================
function showMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }
}

// ===========================
// Form Validation Enhancement
// ===========================
const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
        showMessage(`Please fill in all required fields`, 'error');
    });

    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});
