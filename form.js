document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryType = document.querySelector('input[name="queryType"]:checked');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const queryTypeError = document.getElementById('queryTypeError');
    const messageError = document.getElementById('messageError');
    const consentError = document.getElementById('consentError');

    if (!firstName.value.trim()) {
        firstNameError.classList.remove('hidden');
        firstName.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        firstNameError.classList.add('hidden');
        firstName.removeAttribute('aria-invalid');
    }

    if (!lastName.value.trim()) {
        lastNameError.classList.remove('hidden');
        lastName.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        lastNameError.classList.add('hidden');
        lastName.removeAttribute('aria-invalid');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        emailError.classList.remove('hidden');
        email.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
        email.removeAttribute('aria-invalid');
    }

    if (!queryType) {
        queryTypeError.classList.remove('hidden');
        isValid = false;
    } else {
        queryTypeError.classList.add('hidden');
    }

    if (!message.value.trim()) {
        messageError.classList.remove('hidden');
        message.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        messageError.classList.add('hidden');
        message.removeAttribute('aria-invalid');
    }

    if (!consent.checked) {
        consentError.classList.remove('hidden');
        consent.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        consentError.classList.add('hidden');
        consent.removeAttribute('aria-invalid');
    }

    if (isValid) {
        const formData = new FormData();
        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('email', email.value);
        formData.append('queryType', queryType.value);
        formData.append('message', message.value);
        formData.append('consent', consent.checked);

        fetch('send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('successMessage').classList.remove('hidden');
                // Clear the form
                document.getElementById('contactForm').reset();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Add focus styles for accessibility
document.querySelectorAll('input, textarea, button').forEach(el => {
    el.addEventListener('focus', () => {
        el.classList.add('focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500', 'focus:border-indigo-500');
    });
    el.addEventListener('blur', () => {
        el.classList.remove('focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500', 'focus:border-indigo-500');
    });
});
