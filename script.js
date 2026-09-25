// Global variables
let selectedLanguage = 'english';
let selectedDate = null;
let selectedTime = null;
let bookingData = {};
let inactivityTimer = null;

// Translation object
const translations = {
    english: {
        bookingTitle: 'Select Date & Time',
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
        bookingTitle: 'तारीख और समय चुनें',
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
    startInactivityTimer();
});

// Language selection
function selectLanguage(lang) {
    selectedLanguage = lang;
    updateLanguage();
    showPage('booking-page');
    generateDateButtons();
    resetInactivityTimer();
}

// Update all text based on selected language
function updateLanguage() {
    const trans = translations[selectedLanguage];
    
    // Update all text elements
    document.getElementById('booking-title').textContent = trans.bookingTitle;
    document.getElementById('consult-type').textContent = trans.consultType;
    document.getElementById('consult-fee').textContent = trans.consultFee;
    document.getElementById('date-label').textContent = trans.dateLabel;
    document.getElementById('time-label').textContent = trans.timeLabel;
    document.getElementById('next-btn-text').textContent = trans.nextBtnText;
    document.getElementById('details-title').textContent = trans.detailsTitle;
    document.getElementById('label-name').textContent = trans.labelName;
    document.getElementById('label-age').textContent = trans.labelAge;
    document.getElementById('label-phone').textContent = trans.labelPhone;
    document.getElementById('label-problem').textContent = trans.labelProblem;
    document.getElementById('summary-title').textContent = trans.summaryTitle;
    document.getElementById('summary-fee').textContent = trans.summaryFee;
    document.getElementById('proceed-payment-text').textContent = trans.proceedPaymentText;
    document.getElementById('payment-title').textContent = trans.paymentTitle;
    document.getElementById('payment-summary-title').textContent = trans.paymentSummaryTitle;
    document.getElementById('final-patient-label').textContent = trans.finalPatientLabel;
    document.getElementById('final-date-label').textContent = trans.finalDateLabel;
    document.getElementById('final-time-label').textContent = trans.finalTimeLabel;
    document.getElementById('final-total-label').textContent = trans.finalTotalLabel;
    document.getElementById('mock-payment-note').textContent = trans.mockPaymentNote;
    document.getElementById('upi-text').textContent = trans.upiText;
    document.getElementById('card-text').textContent = trans.cardText;
    document.getElementById('netbanking-text').textContent = trans.netbankingText;
    document.getElementById('back-text').textContent = trans.backText;
    document.getElementById('success-title').textContent = trans.successTitle;
    document.getElementById('success-message').textContent = trans.successMessage;
    document.getElementById('conf-link-info').textContent = trans.confLinkInfo;
    document.getElementById('book-another-text').textContent = trans.bookAnotherText;
    document.getElementById('popup-text').textContent = trans.popupText;
    document.getElementById('popup-btn-text').textContent = trans.popupBtnText;
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
