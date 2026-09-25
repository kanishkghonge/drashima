// Global variables
let selectedLanguage = 'english';
let selectedDate = null;
let selectedTime = null;
let bookingData = {};
let inactivityTimer = null;
let currentTestimonialIndex = 0;

// Translation object
const translations = {
    english: {
        bookConsultationText: 'Book Your Consultation',
        testimonialsHeading: 'Words from Happy Patients',
        timeSelectionTitle: 'Select Date & Time',
        backToBookingText: 'Go Back',
        backToTimeText: 'Go Back',
        consultType: 'Online Teleconsultation',
        consultFee: 'Consultation Fee: ₹800',
        dateLabel: 'Select Date',
        timeLabel: 'Select Time Slot',
        nextBtnText: 'Continue',
        detailsTitle: 'Your Details',
        labelName: 'Patient Name',
        labelAge: 'Patient Age',
        labelPhone: 'Mobile Number',
        labelProblem: 'Brief Description of Problem',
        summaryTitle: 'Booking Summary',
        summaryFee: 'Fee: ₹800',
        proceedPaymentText: 'Proceed to Payment',
        paymentTitle: 'Payment',
        paymentSummaryTitle: 'Appointment Summary',
        finalPatientLabel: 'Patient:',
        finalDateLabel: 'Date:',
        finalTimeLabel: 'Time:',
        finalTotalLabel: 'Total Amount:',
        mockPaymentNote: 'Mock Payment Gateway (Razorpay integration pending)',
        upiText: 'UPI',
        cardText: 'Card',
        netbankingText: 'Net Banking',
        backText: 'Go Back',
        successTitle: 'Booking Confirmed!',
        successMessage: 'Your appointment has been booked successfully.',
        confLinkInfo: 'You will receive a video consultation link on WhatsApp shortly.',
        bookAnotherText: 'Book Another Appointment',
        popupText: 'Not sure how to proceed?',
        popupBtnText: 'Message on WhatsApp',
        consentText: 'I have read and agree to the ',
        termsLinkText: 'Terms & Conditions',
        modalTitle: 'Terms & Conditions',
        acceptTermsBtn: 'I Understand and Accept'
    },
    hindi: {
        bookConsultationText: 'अपना परामर्श बुक करें',
        testimonialsHeading: 'खुश मरीजों के शब्द',
        timeSelectionTitle: 'तारीख और समय चुनें',
        backToBookingText: 'वापस जाएं',
        backToTimeText: 'वापस जाएं',
        consultType: 'ऑनलाइन टेलीकंसल्टेशन',
        consultFee: 'परामर्श शुल्क: ₹800',
        dateLabel: 'तारीख चुनें',
        timeLabel: 'समय चुनें',
        nextBtnText: 'आगे बढ़ें',
        detailsTitle: 'आपका विवरण',
        labelName: 'मरीज का नाम',
        labelAge: 'मरीज की उम्र',
        labelPhone: 'मोबाइल नंबर',
        labelProblem: 'समस्या का संक्षिप्त विवरण',
        summaryTitle: 'बुकिंग सारांश',
        summaryFee: 'शुल्क: ₹800',
        proceedPaymentText: 'भुगतान के लिए आगे बढ़ें',
        paymentTitle: 'भुगतान',
        paymentSummaryTitle: 'अपॉइंटमेंट सारांश',
        finalPatientLabel: 'मरीज:',
        finalDateLabel: 'तारीख:',
        finalTimeLabel: 'समय:',
        finalTotalLabel: 'कुल राशि:',
        mockPaymentNote: 'मॉक पेमेंट गेटवे (Razorpay एकीकरण लंबित)',
        upiText: 'UPI',
        cardText: 'कार्ड',
        netbankingText: 'नेट बैंकिंग',
        backText: 'वापस जाएं',
        successTitle: 'बुकिंग कन्फर्म हो गई!',
        successMessage: 'आपकी अपॉइंटमेंट सफलतापूर्वक बुक हो गई है।',
        confLinkInfo: 'आपको जल्द ही WhatsApp पर वीडियो कंसल्टेशन लिंक मिलेगा।',
        bookAnotherText: 'दूसरी अपॉइंटमेंट बुक करें',
        popupText: 'आगे कैसे बढ़ें समझ नहीं आ रहा?',
        popupBtnText: 'WhatsApp पर मैसेज करें',
        consentText: 'मैंने ',
        termsLinkText: 'नियम और शर्तें',
        consentTextEnd: ' पढ़ी हैं और स्वीकार करता/करती हूं',
        modalTitle: 'नियम और शर्तें',
        acceptTermsBtn: 'मैं समझता/समझती हूं और स्वीकार करता/करती हूं'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    startInactivityTimer();
});

// Language selection - SIMPLIFIED
function selectLanguage(lang) {
    console.log('Language selected:', lang);
    selectedLanguage = lang;
    showPage('booking-page');
    // Update language after page is shown
    setTimeout(() => {
        updateLanguage();
    }, 100);
    resetInactivityTimer();
}

// Update all text based on selected language - SAFE VERSION
function updateLanguage() {
    const trans = translations[selectedLanguage];
    
    // Update only elements that exist RIGHT NOW
    const ids = [
        'book-consultation-text', 'testimonials-heading', 'consult-type', 'consult-fee',
        'time-selection-title', 'date-label', 'time-label', 'next-btn-text',
        'back-to-booking-text', 'back-to-time-text', 'details-title', 'label-name',
        'label-age', 'label-phone', 'label-problem', 'summary-title', 'summary-fee',
        'proceed-payment-text', 'payment-title', 'payment-summary-title',
        'final-patient-label', 'final-date-label', 'final-time-label', 'final-total-label',
        'mock-payment-note', 'upi-text', 'card-text', 'netbanking-text', 'back-text',
        'success-title', 'success-message', 'conf-link-info', 'book-another-text',
        'popup-text', 'popup-btn-text', 'modal-title', 'accept-terms-btn', 'terms-link-text'
    ];
    
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && trans[id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]) {
            const key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            el.textContent = trans[key];
        }
    });
    
    // Update consent text separately since it has multiple parts
    const consentTextStart = document.getElementById('consent-text-start');
    const consentTextEnd = document.getElementById('consent-text-end');
    if (consentTextStart) {
        consentTextStart.textContent = trans.consentText;
    }
    if (consentTextEnd && trans.consentTextEnd) {
        consentTextEnd.textContent = trans.consentTextEnd;
    }
}

// Show specific page
function showPage(pageId) {
    console.log('Showing page:', pageId);
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page activated');
    } else {
        console.error('Page not found:', pageId);
    }
    resetInactivityTimer();
}

// Generate next 7 days date buttons
function generateDateButtons() {
    const dateButtonsContainer = document.getElementById('date-buttons');
    if (!dateButtonsContainer) return;
    
    dateButtonsContainer.innerHTML = '';
    
    const daysOfWeek = selectedLanguage === 'english' 
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    
    const monthsOfYear = selectedLanguage === 'english'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['जन', 'फर', 'मार', 'अप्र', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्ट', 'नव', 'दिस'];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = monthsOfYear[date.getMonth()];
        
        const button = document.createElement('button');
        button.className = 'date-btn';
        button.onclick = () => selectDate(date, button);
        button.innerHTML = `
            <span class="day">${dayOfWeek}</span>
            <span class="date">${dayOfMonth} ${month}</span>
        `;
        
        dateButtonsContainer.appendChild(button);
    }
}

// Select date
function selectDate(date, button) {
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedDate = date;
    
    generateTimeSlots();
    
    selectedTime = null;
    const nextBtn = document.getElementById('next-to-details');
    if (nextBtn) nextBtn.disabled = true;
    
    resetInactivityTimer();
}

// Generate time slots (7pm - 10pm in 20-min intervals)
function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots');
    if (!timeSlotsContainer) return;
    
    timeSlotsContainer.innerHTML = '';
    
    const startHour = 19;
    const endHour = 22;
    const intervalMinutes = 20;
    
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
            const timeSlot = document.createElement('button');
            timeSlot.className = 'time-slot';
            
            let displayHour = hour;
            let period = 'PM';
            
            if (selectedLanguage === 'hindi') {
                period = hour >= 12 ? 'शाम' : 'सुबह';
            }
            
            if (hour > 12) {
                displayHour = hour - 12;
            }
            
            const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
            timeSlot.textContent = timeString;
            
            const isBooked = Math.random() < 0.2;
            
            if (isBooked) {
                timeSlot.classList.add('booked');
            } else {
                timeSlot.onclick = () => selectTimeSlot(timeString, timeSlot);
            }
            
            timeSlotsContainer.appendChild(timeSlot);
        }
    }
}

// Select time slot
function selectTimeSlot(time, button) {
    document.querySelectorAll('.time-slot').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedTime = time;
    
    const nextBtn = document.getElementById('next-to-details');
    if (nextBtn) nextBtn.disabled = false;
    
    resetInactivityTimer();
}

// Show time selection page
function showTimeSelection() {
    showPage('time-selection-page');
    updateLanguage();
    generateDateButtons();
}

// Go to details page
function goToDetails() {
    if (!selectedDate || !selectedTime) {
        alert(selectedLanguage === 'english' 
            ? 'Please select date and time' 
            : 'कृपया तारीख और समय चुनें');
        return;
    }
    
    const dateString = selectedDate.toLocaleDateString(
        selectedLanguage === 'english' ? 'en-US' : 'hi-IN',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    const summaryDateLabel = selectedLanguage === 'english' ? 'Date: ' : 'तारीख: ';
    const summaryTimeLabel = selectedLanguage === 'english' ? 'Time: ' : 'समय: ';
    
    const summaryDateEl = document.getElementById('summary-date');
    const summaryTimeEl = document.getElementById('summary-time');
    
    if (summaryDateEl) summaryDateEl.textContent = summaryDateLabel + dateString;
    if (summaryTimeEl) summaryTimeEl.textContent = summaryTimeLabel + selectedTime;
    
    showPage('details-page');
    updateLanguage();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patient-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            bookingData.name = document.getElementById('patient-name').value;
            bookingData.age = document.getElementById('patient-age').value;
            bookingData.phone = document.getElementById('patient-phone').value;
            bookingData.problem = document.getElementById('patient-problem').value;
            bookingData.date = selectedDate;
            bookingData.time = selectedTime;
            
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(bookingData.phone)) {
                alert(selectedLanguage === 'english' 
                    ? 'Please enter a valid 10-digit mobile number' 
                    : 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
                return;
            }
            
            if (bookingData.age < 0 || bookingData.age > 18) {
                alert(selectedLanguage === 'english' 
                    ? 'Please enter a valid age (0-18 years for pediatric consultation)' 
                    : 'कृपया मान्य उम्र दर्ज करें (बाल चिकित्सा के लिए 0-18 वर्ष)');
                return;
            }
            
            goToPayment();
        });
    }
});

// Go to payment page
function goToPayment() {
    const dateString = selectedDate.toLocaleDateString(
        selectedLanguage === 'english' ? 'en-US' : 'hi-IN',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    const nameEl = document.getElementById('final-patient-name');
    const dateEl = document.getElementById('final-date');
    const timeEl = document.getElementById('final-time');
    
    if (nameEl) nameEl.textContent = bookingData.name;
    if (dateEl) dateEl.textContent = dateString;
    if (timeEl) timeEl.textContent = selectedTime;
    
    showPage('payment-page');
    updateLanguage();
}

// Process payment
function processPayment(method) {
    // Check if terms are accepted
    const termsCheckbox = document.getElementById('terms-consent');
    if (!termsCheckbox || !termsCheckbox.checked) {
        alert(selectedLanguage === 'english' 
            ? 'Please accept the Terms & Conditions to proceed with payment.' 
            : 'भुगतान जारी रखने के लिए कृपया नियम और शर्तों को स्वीकार करें।');
        return;
    }

    const processingMsg = selectedLanguage === 'english' 
        ? 'Processing payment...' 
        : 'भुगतान प्रक्रिया में...';
    
    alert(processingMsg);
    
    setTimeout(() => {
        showConfirmation();
    }, 1500);
    
    resetInactivityTimer();
}

// Toggle payment buttons based on consent checkbox
function togglePaymentButtons() {
    const checkbox = document.getElementById('terms-consent');
    const paymentButtons = document.querySelectorAll('.payment-method-btn');
    
    paymentButtons.forEach(button => {
        button.disabled = !checkbox.checked;
    });
}

// Open Terms & Conditions modal
function openTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    resetInactivityTimer();
}

// Close Terms & Conditions modal
function closeTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Accept terms from modal
function acceptTermsFromModal() {
    const checkbox = document.getElementById('terms-consent');
    if (checkbox) {
        checkbox.checked = true;
        togglePaymentButtons();
    }
    closeTermsModal();
    
    // Scroll to payment methods
    const paymentMethods = document.getElementById('payment-methods');
    if (paymentMethods) {
        paymentMethods.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('terms-modal');
    if (event.target === modal) {
        closeTermsModal();
    }
}

// Show confirmation page
function showConfirmation() {
    const dateString = selectedDate.toLocaleDateString(
        selectedLanguage === 'english' ? 'en-US' : 'hi-IN',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    const patientLabel = selectedLanguage === 'english' ? 'Patient: ' : 'मरीज: ';
    const dateLabel = selectedLanguage === 'english' ? 'Date: ' : 'तारीख: ';
    const timeLabel = selectedLanguage === 'english' ? 'Time: ' : 'समय: ';
    
    const patientEl = document.getElementById('conf-patient');
    const dateEl = document.getElementById('conf-date');
    const timeEl = document.getElementById('conf-time');
    
    if (patientEl) patientEl.textContent = patientLabel + bookingData.name;
    if (dateEl) dateEl.textContent = dateLabel + dateString;
    if (timeEl) timeEl.textContent = timeLabel + selectedTime;
    
    showPage('confirmation-page');
    updateLanguage();
    
    console.log('Booking Data:', bookingData);
}

// Go back function
function goBack(page) {
    showPage(page + '-page');
    updateLanguage();
}

// Inactivity timer for WhatsApp popup
function startInactivityTimer() {
    inactivityTimer = setTimeout(() => {
        showWhatsAppPopup();
    }, 20000);
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    hideWhatsAppPopup();
    startInactivityTimer();
}

function showWhatsAppPopup() {
    const popup = document.getElementById('whatsapp-popup');
    if (popup) {
        popup.classList.add('show');
    }
}

function hideWhatsAppPopup() {
    const popup = document.getElementById('whatsapp-popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Track user activity
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);

// Testimonial slider functions
function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    testimonials[currentTestimonialIndex].classList.remove('active');
    if (direction < 0) {
        testimonials[currentTestimonialIndex].classList.add('exit-left');
    }
    dots[currentTestimonialIndex].classList.remove('active');
    
    currentTestimonialIndex += direction;
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    } else if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    }
    
    setTimeout(() => {
        testimonials.forEach(t => t.classList.remove('exit-left'));
    }, 400);
    
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
    
    resetInactivityTimer();
}

function goToTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (index === currentTestimonialIndex) return;
    
    testimonials[currentTestimonialIndex].classList.remove('active');
    dots[currentTestimonialIndex].classList.remove('active');
    
    currentTestimonialIndex = index;
    
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
    
    resetInactivityTimer();
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    const bookingPage = document.getElementById('booking-page');
    if (bookingPage && bookingPage.classList.contains('active')) {
        changeTestimonial(1);
    }
}, 5000);
