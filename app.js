(() => {
  let screenDiv = document.getElementById("screen-div");
  let inputDiv = document.getElementById("input-div");
  let inputForm = document.getElementById("input-form");
  let studentIDInput = document.getElementById("student-id-input");
  let dateText = document.getElementById("date-text");
  let qrCode = new QRCode(document.getElementById("qr-code-div"), {});
  let circleImg = document.getElementById("check-circle-img");
  let nameText = document.getElementById("name-text");
  let studentNameInput = document.getElementById("student-name-input");

  let formattedDate = () => {
    let d = new Date();

    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  let hide = (element, hidden) => {
    if (hidden) {
      element.setAttribute("hidden", "hidden");
    } else {
      element.removeAttribute("hidden");
    }
  };

  let showScreen = (studentID, studentName) => {
    dateText.innerHTML = formattedDate();
    qrCode.makeCode(studentID);
    nameText.innerHTML = studentName;

    hide(inputDiv, true);
    hide(screenDiv, false);
  };

  let showInput = () => {
    hide(inputDiv, false);
    hide(screenDiv, true);
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }

  let storedStudentID = localStorage.getItem("student_id");
  let storedStudentName = localStorage.getItem("student_name");
  if (storedStudentID !== null && storedStudentName !== null) {
    showScreen(storedStudentID, storedStudentName);
  }

  inputForm.onsubmit = (event) => {
    let studentID = studentIDInput.value;
    let studentName = studentNameInput.value;

    showScreen(studentID, studentName);

    localStorage.setItem("student_id", studentID);
    localStorage.setItem("student_name", studentName);

    event.preventDefault();
  };

  circleImg.onclick = () => {
    showInput();
    localStorage.removeItem("student_id");
    localStorage.removeItem("student_name");
  };
})();
