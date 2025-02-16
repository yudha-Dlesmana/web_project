function contactForm(event){
    event.preventDefault();
    const sendTo = "yudha.dlesmana@gmail.com";

    const name = document.getElementById("name").value;
    const email =  document.getElementById("email").value;
    const phoneNumber =  document.getElementById("phoneNumber").value;
    const subject =  encodeURIComponent(document.getElementById("subject").value);
    const message =  document.getElementById("message").value;

    alert(`Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`);

    const mailTo = document.createElement('a');

    mailTo.href = `mailto:${sendTo}?subject=${subject}&body=Hello my name ${name}, ${subject}, ${message}%0A%0AMail Me: ${email}`;

    mailTo.click()
}