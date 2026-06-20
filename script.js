const form = document.getElementById("contactForm");
const successMessage =
document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch(
    "/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        successMessage.textContent =
            result.message;

        form.reset();

    } catch (error) {

        successMessage.textContent =
            "Failed to send message";
    }
    
});
