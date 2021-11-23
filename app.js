(() => {
  let screenDiv = document.getElementById("screen-div");
  let inputDiv = document.getElementById("input-div");
  let inputForm = document.getElementById("input-form");
  let studentIDInput = document.getElementById("student-id-input");
  let dateText = document.getElementById("date-text");
  let qrCode = new QRCode(document.getElementById("qr-code-div"), {});

  let formattedDate = () => {
    let d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  let toggleHide = (element) => {
    if (element.getAttribute("hidden") !== null) {
      element.removeAttribute("hidden");
    } else {
      element.setAttribute("hidden", "hidden");
    }
  };

  inputForm.onsubmit = (event) => {
    let studentID = studentIDInput.value;

    dateText.innerHTML = `You are granted entry for: ${formattedDate()}`;
    qrCode.makeCode(studentID);

    toggleHide(inputDiv);
    toggleHide(screenDiv);

    event.preventDefault();
  };
})();
