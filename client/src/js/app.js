import './parallax.min';

document
    .getElementById("send")
    .addEventListener("click", e => {
        e.preventDefault();

        const from = document.getElementById("from");
        const sentFrom = from.value;
        const subject = document.getElementById("subject");
        const name = document.getElementById("name");
        const companyName = document.getElementById("companyName");
        const text = document.getElementById("text");
        const data = {from: from.value, name: name.value, companyName: companyName.value, subject: subject.value, text: text.value};

        const message = document.getElementById("message");
        message.innerText = "Sending e-mail";
        const request = new XMLHttpRequest();
        request.open("POST", `http://127.0.0.1:3000/send`);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200) {
                message.innerText = `Message sent from: ${sentFrom}`;
            }
        };
        request.addEventListener("load", () => {});
        request.send(JSON.stringify(data));
        document.getElementById('form_fields').reset();
    });