const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    successMessage.textContent = "Sending...";

    const formData = new FormData(form);

    formData.append(
        "access_key",
        "2033afa3-6e39-485f-9d0d-1018e17e8bdd"
    );

    try {
        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {
            successMessage.textContent =
                "Message sent successfully!";
            form.reset();
        } else {
            successMessage.textContent =
                "Failed to send message";
        }

    } catch (error) {
        console.error(error);
        successMessage.textContent =
            "Error sending message";
    }
});