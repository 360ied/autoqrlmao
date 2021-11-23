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

  let hide = (element, hidden) => {
    if (hidden) {
      element.setAttribute("hidden", "hidden");
    } else {
      element.removeAttribute("hidden");
    }
  };

  let showScreen = (studentID) => {
    dateText.innerHTML = `You are granted entry for: ${formattedDate()}`;
    qrCode.makeCode(studentID);

    hide(inputDiv, true);
    hide(screenDiv, false);
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }

  let storedStudentID = localStorage.getItem("student_id");
  if (storedStudentID !== null) {
    showScreen(storedStudentID);
  }

  inputForm.onsubmit = (event) => {
    let studentID = studentIDInput.value;

    showScreen(studentID);

    localStorage.setItem("student_id", studentID);

    event.preventDefault();
  };
})();
