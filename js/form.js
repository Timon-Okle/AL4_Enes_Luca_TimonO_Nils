// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const thankYouContainer = document.getElementById("thankYouContainer");
const submitButton = document.getElementById("submit");
submitButton.disabled = true;
const firstnameField = document.getElementById("firstname");
const lastnameField = document.getElementById("lastname");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const countryField = document.getElementById("country");
const favoritedrinkField = document.getElementById("favoritedrink");





// (2) Interaktionen festlegen
firstnameField.addEventListener("keyup", () => {
  validateForm();
});
lastnameField.addEventListener("keyup", () => {
  validateForm();
});

emailField.addEventListener("keyup", () => {
  validateForm();
});
phoneField.addEventListener("keyup", () => {
  validateForm();
});


countryField.addEventListener("keyup", () => {
  validateForm();
});

favoritedrinkField.addEventListener("keyup", () => {
  validateForm();
});

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});





const validateForm = () => {
  
  const email = emailField.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const phone = phoneField.value;
  const firstName = firstnameField.value;
  const lastName = lastnameField.value;
 
  if (email === "" || !emailRegex.test(email) || phone === "" ||firstName === "" ||lastName === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

// (3) Interaktionen Code














const onClickSubmit = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "al4", // SQL Gruppen Namen
    pw: "8ec2f7ae", // SQL Passwort
    tableName: "anmeldeformular", // Name der Tabelle in der SQL Datenbank

    columns: {
      // "email" Name der Spalte in der SQL Tabelle
      // "emailField.value" Eingabe des Benutzers aus dem Formularfeld
      email: emailField.value,
      firstname: firstnameField. value,
      lastname: lastnameField. value,
      email: emailField. value,
      phone: phoneField. value,
      country: countryField.value,
      favoritedrink: favoritedrinkField.value,
      
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, eine Dankeschön Nachricht erscheint
  formContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
};
