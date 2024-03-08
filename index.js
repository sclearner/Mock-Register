const form = document.forms.form;
const [day, month, year] = document.getElementById("dob").children;
const error = {
  name: document.getElementById('name-error'),
  username: document.getElementById('username-error'),
  password: document.getElementById('password-error'),
  dob: document.getElementById('dob-error'),
  gender: document.getElementById('gender-error')
}
const dayInMonth = {
  Jan: 31,
  Feb: { leap: 29, noleap: 28 },
  Mar: 31,
  Apr: 30,
  May: 31,
  Jun: 30,
  Jul: 31,
  Aug: 31,
  Sep: 30,
  Oct: 31,
  Nov: 30,
  Dec: 31,
};

function dayInMonthYear(month, year) {
  if (month == "") return 0;
  if (month != "Feb") return dayInMonth[month];
  if (year === "") return 28;
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
    return 29;
  }
  return 28;
}

function dobChange(e) {
  const days = dayInMonthYear(month.value, year.value);
  const value = day.value;
  day.innerHTML = "";
  day.appendChild(document.createElement("option"));
  for (let i = 1; i <= days; i++) {
    let option = document.createElement("option");
    option.appendChild(document.createTextNode(`${i}`));
    day.appendChild(option);
  }
  if (value <= days) day.value = value;
  else day.value = days;
}

month.appendChild(document.createElement("option"));
for (const i in dayInMonth) {
  let option = document.createElement("option");
  option.appendChild(document.createTextNode(i));
  month.appendChild(option);
}

day.appendChild(document.createElement("option"));
month.addEventListener("change", dobChange);
year.addEventListener("change", dobChange);

year.appendChild(document.createElement("option"));
for (let i = 1900; i <= new Date().getFullYear() - 13; i++) {
  let option = document.createElement("option");
  option.appendChild(document.createTextNode(`${i}`));
  year.appendChild(option);
}

document.getElementById('show-password').addEventListener("change", (e) => {
  console.log(e)
  if (e.target.checked) {
    form.password.type = 'text'
  }
  else {
    form.password.type = 'password'
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstname = form.firstname.value;
  const surname = form.surname.value;
  const username = form.username.value;
  const password = form.password;
  const dob = new Date(
    `${form.year.value}-${form.month.value}-${form.day.value}`
  );
  const gender = form.gender;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+\.\w{2,4}$/;
  const phoneRegex = /^(\+\d{1,3})?\d{7,11}$/;
  let isVaild = true;

  if (firstname == "" || surname == "") {
    error.name.textContent = "Please fill in your full name."
    isVaild = false
  }
  else {
    error.name.textContent = ""
  }

  if (emailRegex.test(username) || phoneRegex.test(username)) {
    error.username.textContent = ""
  }
  else {
    error.username.textContent = "You must type email or phone number.";
    isVaild = false;
  }

  if (password.value.length < 8) {
    error.password.textContent = "Password's too short.";
    isVaild = false;
  } else {
    error.password.textContent = "";
  }

  if (isNaN(dob)) {
    error.dob.textContent = "Please choose date of birth.";
    isVaild = false;
  }
  else {
    error.dob.textContent = ""
  }

  if (gender.value == "") {
    error.gender.textContent = "Please choose gender.";
    isVaild = false;
  }
  else {
    error.gender.textContent=""
  }

  if (isVaild) {
    alert(JSON.stringify({
      name: `${firstname} ${surname}`,
      username: username,
      password: password.value,
      dob: dob,
      gender: gender.value,
    }));
  }
});
