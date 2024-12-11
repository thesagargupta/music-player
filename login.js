// Button and Element References
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const sliderWrapper = document.querySelector('.slider-wrapper');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

// Toggle Buttons
loginBtn.addEventListener('click', () => {
    sliderWrapper.style.transform = 'translateX(0)';
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    sliderWrapper.style.transform = 'translateX(-50%)';
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

// Switch Links
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signupBtn.click();
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginBtn.click();
});

// Function to send Google token to the backend
function sendTokenToBackend(token) {
    console.log("Sending token to backend:", token); // Debugging token

    fetch('http://localhost:3000/auth/google', {  // Replace with your deployed backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response from backend:", data);  // Success message or user details
        alert(data.message); // Notify the user
    })
    .catch(error => {
        console.error("Error during Google authentication:", error);
        alert("Authentication failed. Please try again.");
    });
}

// Google Sign-Up function
function onSignUp() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn()
        .then(googleUser => {
            const token = googleUser.getAuthResponse().id_token;
            console.log("Google Sign-Up token:", token); // Debugging
            sendTokenToBackend(token);
        })
        .catch(error => {
            console.error("Sign-Up Error: ", error);
            alert("Google Sign-Up failed. Please try again.");
        });
}

// Google Sign-In function
function onSignIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn()
        .then(googleUser => {
            const token = googleUser.getAuthResponse().id_token;
            console.log("Google Sign-In token:", token); // Debugging
            sendTokenToBackend(token);
        })
        .catch(error => {
            console.error("Sign-In Error: ", error);
            alert("Google Sign-In failed. Please try again.");
        });
}

// Initialize Google Sign-In API
function startApp() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: '932935661249-jrn8ku7eclcv3d70t8be92l7isokkpln.apps.googleusercontent.com',  // Replace with your actual Google client ID
        })
        .then(() => {
            console.log("Google API Initialized Successfully.");
        })
        .catch(error => {
            console.error("Google API Initialization Error: ", error);
        });
    });
}

// Add event listeners for Google Sign-In and Sign-Up buttons
window.onload = () => {
    console.log("Initializing event listeners...");
    const signupButton = document.getElementById('google-signup');
    const loginButton = document.getElementById('google-login');

    if (!signupButton || !loginButton) {
        console.error("Google Sign-Up or Sign-In button not found in DOM!");
    } else {
        signupButton.addEventListener('click', onSignUp);
        loginButton.addEventListener('click', onSignIn);
        console.log("Event listeners attached successfully.");
    }

    // Initialize Google API
    startApp();
};
