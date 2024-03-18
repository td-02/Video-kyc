const video = document.getElementById('video');
        const captureButton = document.getElementById('capture-button');
        const captureAgainButton = document.getElementById('capture-again-button');
        const submitButton = document.getElementById('submit-button');
        const canvas = document.getElementById('captured-image');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.error('Error accessing camera:', err);
                alert('Error accessing camera. Please check your camera permissions.');
            });

        video.addEventListener('loadedmetadata', function() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });

        function captureImage() {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.style.display = 'none';
            captureButton.style.display = 'none';
            submitButton.style.display = 'block';
            captureAgainButton.style.display = 'block';
            canvas.style.display = 'block';
            document.getElementById('buttons-container').style.display = 'block';
        }

        function captureAgain() {
            video.style.display = 'block';
            captureButton.style.display = 'block';
            submitButton.style.display = 'none';
            captureAgainButton.style.display = 'none';
            canvas.style.display = 'none';
            document.getElementById('buttons-container').style.display = 'none';
        }

        function submitData() {
            const imageDataURL = canvas.toDataURL('image/png');
            // Display the captured image
            const image = new Image();
            image.src = imageDataURL;
            document.body.appendChild(image);

            // Redirect to the confirmation page
            window.location.href = 'confirmation.html';
        }