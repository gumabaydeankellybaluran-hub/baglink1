// ===================================
// BAGLINK MOBILE APP
// JavaScript functionality
// ===================================

// 1. SWITCH BETWEEN SCREENS

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    // Hide bottom navigation on welcome and login.
    const bottomNav = document.getElementById("bottomNav");

    if (screenId === "welcome" ||
        screenId === "login" ||
        screenId === "notifications" ||
        screenId === "support") {

        bottomNav.style.display = "none";

    } else {
        bottomNav.style.display = "flex";
    }

    // Highlight the selected navigation item.
    document.querySelectorAll(".bottom-nav button").forEach(function(button) {
        button.classList.remove("active");
    });

    let navScreen = screenId;

    if (screenId === "account" ||
        screenId === "settings" ||
        screenId === "support") {

        navScreen = "profile";
    }

    const activeButton = document.querySelector(
        '.bottom-nav button[data-nav="' + navScreen + '"]'
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    window.scrollTo(0, 0);
}


// 2. SHOW A TEMPORARY MESSAGE

function showMessage(message) {
    const messageBox = document.getElementById("messageBox");

    messageBox.textContent = message;
    messageBox.classList.add("show");

    clearTimeout(window.messageTimer);

    window.messageTimer = setTimeout(function() {
        messageBox.classList.remove("show");
    }, 2500);
}


// 3. DEMO LOGIN

document.getElementById("loginForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const username = document.getElementById("username")
            .value.trim();

        const password = document.getElementById("password")
            .value;

        if (username === "" || password === "") {
            showMessage("Please enter your username and password.");
            return;
        }

        // Update the displayed account name.
        document.getElementById("welcomeName").textContent =
            username + "!";

        document.getElementById("profileName").textContent =
            username;

        document.getElementById("accountName").textContent =
            username;

        document.getElementById("infoName").textContent =
            username;

        showMessage("Demo login successful!");

        showScreen("home");
    }
);


// 4. NOTIFICATION SEARCH

document.getElementById("searchNotification")
    .addEventListener("input", function() {

        const searchText = this.value.toLowerCase().trim();

        const historyItems = document.querySelectorAll(
            ".history-item"
        );

        historyItems.forEach(function(item) {
            const searchableText =
                item.dataset.search.toLowerCase();

            if (searchableText.includes(searchText)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });


// 5. EDIT ACCOUNT INFORMATION

function editInformation(type) {
    let newValue = "";
    let currentValue = "";
    let promptText = "";

    if (type === "name") {
        currentValue =
            document.getElementById("infoName").textContent;

        promptText = "Enter your new name:";
    }

    else if (type === "password") {
        promptText = "Enter your new password:";
    }

    else if (type === "address") {
        currentValue =
            document.getElementById("infoAddress").textContent;

        if (currentValue === "Add your address") {
            currentValue = "";
        }

        promptText = "Enter your new address:";
    }

    newValue = prompt(promptText, currentValue);

    // Stop if the user cancels or enters blank text.
    if (newValue === null || newValue.trim() === "") {
        return;
    }

    newValue = newValue.trim();

    if (type === "name") {

        document.getElementById("infoName").textContent =
            newValue;

        document.getElementById("profileName").textContent =
            newValue;

        document.getElementById("accountName").textContent =
            newValue;

        document.getElementById("welcomeName").textContent =
            newValue + "!";

        showMessage("Name updated in this demo.");
    }

    else if (type === "address") {

        document.getElementById("infoAddress").textContent =
            newValue;

        showMessage("Address updated in this demo.");
    }

    else if (type === "password") {

        // This only simulates the action.
        // It does not save a real account password.

        showMessage("Demo password change completed.");
    }
}


// 6. SETTINGS INFORMATION

function openSetting(settingName) {
    let message = "";

    if (settingName === "About BagLink") {
        message =
            "BagLink is a concept for a smart bag accessory and mobile tracking application.";
    }

    else if (settingName === "FAQs") {
        message =
            "FAQs: Keep your tracker charged and check its connection status in the app.";
    }

    else if (settingName === "Terms and Condition") {
        message =
            "Terms and conditions will be added here before the application is published.";
    }

    else if (settingName === "Privacy Policy") {
        message =
            "The real application should explain how user information is collected and protected.";
    }

    else if (settingName === "Contact Us") {
        message =
            "Add your official BagLink support email or contact information here.";
    }

    showMessage(settingName + ": " + message);
}


// 7. LOG OUT

function logout() {
    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (confirmLogout) {

        document.getElementById("loginForm").reset();

        showScreen("welcome");

        showMessage("You have logged out of the demo.");
    }
}


// 8. START THE APPLICATION

document.addEventListener("DOMContentLoaded", function() {
    showScreen("welcome");
});