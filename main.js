        // Function to display the form based on selected language
        function showForm() {
            var language = document.getElementById("language").value;
            if (language === "") {
                alert("Please select a language.");
                return;
            }
            document.getElementById("languageSelection").style.display = "none";
            document.getElementById("kycForm").style.display = "block";
            changeLabels(language);
        
        }

        // Function to validate the form before submission
// Function to validate the form before submission
function validateForm() {
    var fullName = document.getElementById("fullName").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var panAadhaar = document.getElementById("panAadhaar").value;
    var signature = document.getElementById("signature").value;
    var incomeRange = document.getElementById("incomeRange").value;
    var employmentType = document.getElementById("employmentType").value;

    // Basic validation: check if required fields are filled out
    if (fullName === "" || dob === "" || address === "" || panAadhaar === "" || signature === "" || incomeRange === "" || employmentType === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    // Validate date of birth format (YYYY-MM-DD)
    if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(dob)) {
        alert("Please enter a valid date of birth in the format YYYY-MM-DD.");
        return false;
    }

    // Validate PAN Card / Aadhaar format (12 characters)
    if (!/^\d{12}$/.test(panAadhaar)) {
        alert("Please enter a valid PAN Card or Aadhaar number (12 digits).");
        return false;
    }

    // Validate income range format (numeric value)
    if (!/^\d+$/.test(incomeRange)) {
        alert("Please enter a valid income range (numeric value only).");
        return false;
    }

    // Other validations as needed...
    startVideo(); // Start video after showing the form

    // Store some information locally using localStorage
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("dob", dob);
    localStorage.setItem("address", address);
    localStorage.setItem("panAadhaar",panAadhaar);
    localStorage.setItem("signature",signature);
    localStorage.setItem("incomeRange",incomeRange);
    localStorage.setItem("employmentType",employmentType);
    return false; // Prevent default form submission
}

        // Function to resize text
        function resizeText(size) {
            var currentFontSize = parseFloat(document.body.style.fontSize) || 16; // Default font size is 16px
            var newSize = currentFontSize + size;
            document.body.style.fontSize = newSize + "px";
        }

        // Function to change labels based on language selection
        function changeLabels(language) {
            var labels = {
                en: {
                    fullName: "Full Name:",
                    dob: "Date of Birth:",
                    address: "Address:",
                    panAadhaar: "PAN Card / Aadhaar:",
                    signature: "Signature:",
                    incomeRange: "Income Range:",
                    employmentType: "Type of Employment:",
                    submitButton: "Submit"
                },
                es: {
                    fullName: "Nombre completo:",
                    dob: "Fecha de Nacimiento:",
                    address: "Dirección:",
                    panAadhaar: "Tarjeta PAN / Aadhaar:",
                    signature: "Firma:",
                    incomeRange: "Rango de Ingresos:",
                    employmentType: "Tipo de Empleo:",
                    submitButton: "Enviar"
                },
                fr: {
                    fullName: "Nom complet:",
                    dob: "Date de Naissance:",
                    address: "Adresse:",
                    panAadhaar: "Carte PAN / Aadhaar:",
                    signature: "Signature:",
                    incomeRange: "Plage de Revenus:",
                    employmentType: "Type d'Emploi:",
                    submitButton: "Soumettre"
                },
                de: {
                    fullName: "Vollständiger Name:",
                    dob: "Geburtsdatum:",
                    address: "Adresse:",
                    panAadhaar: "PAN-Karte / Aadhaar:",
                    signature: "Unterschrift:",
                    incomeRange: "Einkommensbereich:",
                    employmentType: "Beschäftigungsart:",
                    submitButton: "Einreichen"
                },
                hi: {
                    fullName: "पूरा नाम:",
                    dob: "जन्म तिथि:",
                    address: "पता:",
                    panAadhaar: "पैन कार्ड / आधार कार्ड:",
                    signature: "हस्ताक्षर:",
                    incomeRange: "आय की रेंज:",
                    employmentType: "रोजगार के प्रकार:",
                    submitButton: "प्रस्तुत करें"
                }
                // Add more languages as needed
            };

            var currentLabels = labels[language];
            document.getElementById("fullNameLabel").innerText = currentLabels.fullName;
            document.getElementById("dobLabel").innerText = currentLabels.dob;
            document.getElementById("addressLabel").innerText = currentLabels.address;
            document.getElementById("panAadhaarLabel").innerText = currentLabels.panAadhaar;
            document.getElementById("signatureLabel").innerText = currentLabels.signature;
            document.getElementById("incomeRangeLabel").innerText = currentLabels.incomeRange;
            document.getElementById("employmentTypeLabel").innerText = currentLabels.employmentType;
            document.getElementById("submitButton").innerText = currentLabels.submitButton;
           
        }
        // Function to start video capture
        function startVideo() {
            var constraints = { video: true };
            
            navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                var videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.autoplay = true;
                videoElement.playsinline = true;
                videoElement.muted = true;
                videoElement.style.width = '100%';
                videoElement.style.marginBottom = '20px';
                document.getElementById('kycForm').appendChild(videoElement);

                // Show the capture button after video starts
                document.getElementById('captureButtonContainer').style.display = 'block';
            })
            .catch(function(err) {
                console.log('Error accessing camera:', err);
                alert('Error accessing camera. Please check your camera permissions.');
            });
        }

        // Function to capture picture
        function capturePicture() {
            var videoElement = document.querySelector('video');
            var canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            var context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            var imageURL = canvas.toDataURL('image/png');
            var imageElement = document.createElement('img');
            imageElement.src = imageURL;
            document.getElementById('kycForm').appendChild(imageElement);
        }