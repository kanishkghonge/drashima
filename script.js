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
        bookingTitle: 'Book Your Consultation',
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
        popupBtnText: 'Message on WhatsApp'
    },
    hindi: {
        bookingTitle: 'अपना परामर्श बुक करें',
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
        popupBtnText: 'WhatsApp पर मैसेज करें'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    startInactivityTimer();
});

// Language selection
function selectLanguage(lang) {
    console.log('Language selected:', lang);
    selectedLanguage = lang;
    updateLanguage();
    console.log('About to show booking page');
    showPage('booking-page');
    console.log('Page should be visible now');
    resetInactivityTimer();
}

// Update all text based on selected language
function updateLanguage() {
    const trans = translations[selectedLanguage];
    
    // Helper function to safely update text content
    const updateIfExists = (id, text) => {
        try {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        } catch (error) {
            console.log('Could not update element:', id);
        }
    };
    
    // Update all text elements (only if they exist)
    updateIfExists('book-consultation-text', trans.bookConsultationText);
    updateIfExists('testimonials-heading', trans.testimonialsHeading);
    updateIfExists('consult-type', trans.consultType);
    updateIfExists('consult-fee', trans.consultFee);
    updateIfExists('time-selection-title', trans.timeSelectionTitle);
    updateIfExists('date-label', trans.dateLabel);
    updateIfExists('time-label', trans.timeLabel);
    updateIfExists('next-btn-text', trans.nextBtnText);
    updateIfExists('back-to-booking-text', trans.backToBookingText);
    updateIfExists('back-to-time-text', trans.backToTimeText);
    updateIfExists('details-title', trans.detailsTitle);
    updateIfExists('label-name', trans.labelName);
    updateIfExists('label-age', trans.labelAge);
    updateIfExists('label-phone', trans.labelPhone);
    updateIfExists('label-problem', trans.labelProblem);
    updateIfExists('summary-title', trans.summaryTitle);
    updateIfExists('summary-fee', trans.summaryFee);
    updateIfExists('proceed-payment-text', trans.proceedPaymentText);
    updateIfExists('payment-title', trans.paymentTitle);
    updateIfExists('payment-summary-title', trans.paymentSummaryTitle);
    updateIfExists('final-patient-label', trans.finalPatientLabel);
    updateIfExists('final-date-label', trans.finalDateLabel);
    updateIfExists('final-time-label', trans.finalTimeLabel);
    updateIfExists('final-total-label', trans.finalTotalLabel);
    updateIfExists('mock-payment-note', trans.mockPaymentNote);
    updateIfExists('upi-text', trans.upiText);
    updateIfExists('card-text', trans.cardText);
    updateIfExists('netbanking-text', trans.netbankingText);
    updateIfExists('back-text', trans.backText);
    updateIfExists('success-title', trans.successTitle);
    updateIfExists('success-message', trans.successMessage);
    updateIfExists('conf-link-info', trans.confLinkInfo);
    updateIfExists('book-another-text', trans.bookAnotherText);
    updateIfExists('popup-text', trans.popupText);
    updateIfExists('popup-btn-text', trans.popupBtnText);
}

// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    resetInactivityTimer();
}

// Generate next 7 days date buttons
function generateDateButtons() {
    const dateButtonsContainer = document.getElementById('date-buttons');
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
    // Remove previous selection
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedDate = date;
    
    // Generate time slots
    generateTimeSlots();
    
    // Reset time selection
    selectedTime = null;
    document.getElementById('next-to-details').disabled = true;
    
    resetInactivityTimer();
}

// Generate time slots (7pm - 10pm in 20-min intervals)
function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots');
    timeSlotsContainer.innerHTML = '';
    
    const startHour = 19; // 7 PM
    const endHour = 22; // 10 PM
    const intervalMinutes = 20;
    
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
            const timeSlot = document.createElement('button');
            timeSlot.className = 'time-slot';
            
            // Format time
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
            
            // Random booking simulation (for demo purposes)
            const isBooked = Math.random() < 0.2; // 20% chance of being booked
            
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
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedTime = time;
    
    // Enable continue button
    document.getElementById('next-to-details').disabled = false;
    
    resetInactivityTimer();
}

// Show time selection page
function showTimeSelection() {
    showPage('time-selection-page');
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
    
    // Update summary
    const dateString = selectedDate.toLocaleDateString(
        selectedLanguage === 'english' ? 'en-US' : 'hi-IN',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    const summaryDateLabel = selectedLanguage === 'english' ? 'Date: ' : 'तारीख: ';
    const summaryTimeLabel = selectedLanguage === 'english' ? 'Time: ' : 'समय: ';
    
    document.getElementById('summary-date').textContent = summaryDateLabel + dateString;
    document.getElementById('summary-time').textContent = summaryTimeLabel + selectedTime;
    
    showPage('details-page');
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patient-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            bookingData.name = document.getElementById('patient-name').value;
            bookingData.age = document.getElementById('patient-age').value;
            bookingData.phone = document.getElementById('patient-phone').value;
            bookingData.problem = document.getElementById('patient-problem').value;
            bookingData.date = selectedDate;
            bookingData.time = selectedTime;
            
            // Validate phone number
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(bookingData.phone)) {
                alert(selectedLanguage === 'english' 
                    ? 'Please enter a valid 10-digit mobile number' 
                    : 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
                return;
            }
            
            // Validate age (pediatric - typically 0-18)
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
    // Update payment summary
    const dateString = selectedDate.toLocaleDateString(
        selectedLanguage === 'english' ? 'en-US' : 'hi-IN',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    document.getElementById('final-patient-name').textContent = bookingData.name;
    document.getElementById('final-date').textContent = dateString;
    document.getElementById('final-time').textContent = selectedTime;
    
    showPage('payment-page');
}

// Process payment
function processPayment(method) {
    // Simulate payment processing
    const processingMsg = selectedLanguage === 'english' 
        ? 'Processing payment...' 
        : 'भुगतान प्रक्रिया में...';
    
    alert(processingMsg);
    
    // Simulate delay
    setTimeout(() => {
        showConfirmation();
    }, 1500);
    
    resetInactivityTimer();
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
    
    document.getElementById('conf-patient').textContent = patientLabel + bookingData.name;
    document.getElementById('conf-date').textContent = dateLabel + dateString;
    document.getElementById('conf-time').textContent = timeLabel + selectedTime;
    
    showPage('confirmation-page');
    
    // Here you would typically send booking data to backend/ERPNext
    console.log('Booking Data:', bookingData);
}

// Go back function
function goBack(page) {
    showPage(page + '-page');
}

// Inactivity timer for WhatsApp popup
function startInactivityTimer() {
    inactivityTimer = setTimeout(() => {
        showWhatsAppPopup();
    }, 20000); // 20 seconds
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
    
    // Remove active class and add exit animation
    testimonials[currentTestimonialIndex].classList.remove('active');
    if (direction < 0) {
        testimonials[currentTestimonialIndex].classList.add('exit-left');
    }
    dots[currentTestimonialIndex].classList.remove('active');
    
    // Update index
    currentTestimonialIndex += direction;
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    } else if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    }
    
    // Remove exit animation from all
    setTimeout(() => {
        testimonials.forEach(t => t.classList.remove('exit-left'));
    }, 400);
    
    // Add active class to new testimonial
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
