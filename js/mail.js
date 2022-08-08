

document.querySelector(".form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".nama").value;
  let email = document.querySelector(".e-mail").value;
  let message = document.querySelector(".pesan").value;
  console.log(name, email, message);
  sendEmail(name,email,message);

  document.querySelector(".form").reset();
}



function sendEmail(name,email,message){
    Email.send({
        Host: "smtp.gmail.com",
        Username: "kharisismail53@gmail.com",
        Password: "ghgrvzzyhubepnwy",
        To: "batmanandsuperman27@gmail.com",
        From: email,
        Subject: name+ " Giving you a Feedback from MusicDoom",
        Body: message

    }).then((message) => alert("Mail sent Successfully"));
}
