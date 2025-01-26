document.getElementById('flap').addEventListener('change', function() {
    const nextButton = document.getElementById('next-button');
    if (this.checked) {
      setTimeout(function() {
        nextButton.style.display = 'block';
        setTimeout(function() {
          nextButton.classList.add('show');
        }, 10); // Small delay to trigger the transition
      }, 0); // 3 seconds delay
    } else {
      nextButton.classList.remove('show');
      setTimeout(function() {
        nextButton.style.display = 'none';
      }, 0); // Match this delay with the CSS transition duration
    }
  });
  
  document.getElementById('next-button').addEventListener('click', function() {
    document.querySelector('.envelope-wrapper').classList.add('hide');
    const envelopeContainer = document.querySelector('.envelope-container');
    const planner = document.getElementById('planner');
    const nextButton = document.getElementById('next-button');
    
    // Hide envelope
    envelopeContainer.style.opacity = 0;
    
    setTimeout(function() {
        envelopeContainer.style.display = 'none';
        // Hide next button
        nextButton.style.display = 'none';
        nextButton.style.opacity = 0;
        
        // Show planner
        planner.style.display = 'block';
        setTimeout(function() {
            planner.style.opacity = 1;
        }, 10);
    }, 500);
  });

document.getElementById('date-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dateType = document.getElementById('date-type').value;
    const timeInput = document.getElementById('date-time').value;
    
    // Format time to include AM/PM
    const timeObj = new Date(`2000/01/01 ${timeInput}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    if (!dateType || !timeInput) {
        alert('Please select both a date type and time!');
        return;
    }

    // Prepare email parameters with formatted time
    const templateParams = {
        to_email: 'raymundluzon@gmail.com',
        date_type: dateType,
        date_time: formattedTime
    };

    // Send email using EmailJS
    emailjs.send("service_kr5rcg7", "template_y2z51k5", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Hide the planner
            const planner = document.getElementById('planner');
            planner.style.opacity = 0;
            
            setTimeout(() => {
                planner.style.display = 'none';
                
                // Show confirmation message with selected time
                const confirmation = document.getElementById('confirmation');
                const confirmationMessage = document.getElementById('confirmation-message');
                confirmationMessage.textContent = `I'll call you at ${formattedTime}!`;
                
                confirmation.style.display = 'block';
                setTimeout(() => {
                    confirmation.style.opacity = 1;
                }, 10);
            }, 500);
        }, function(error) {
            console.log('FAILED...', error);
            alert('There was an error sending your date plan. Please try again!');
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const envelopeContainer = document.querySelector('.envelope-container');
    const popup = document.getElementById('popup-message');
    
    // Wait for falling animation to complete
    setTimeout(() => {
        // Show popup
        popup.classList.remove('hidden');
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 10);

        // Hide popup after 2 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 300);
        }, 3000);

        // Start floating animation
        envelopeContainer.style.animation = 'float 3s ease-in-out infinite';
    }, 1500); // 1500ms matches the fallIn animation duration
});