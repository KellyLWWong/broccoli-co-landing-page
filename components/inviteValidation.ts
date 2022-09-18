function validateForm(
  inputValues: {
    fullName: string;
    email: string;
    confirmEmail: string;
  }
) {
  let errors = {
    fullName: "",
    email: "",
    confirmEmail: "",
  };

  const emailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

  // check if full name is populated and longer than 3 characters
  if (!inputValues.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (inputValues.fullName.trim().length < 3) {
    // console.log('Names less than 3 chars')
    errors.fullName = "Full name needs to be at least 3 characters long :(";
  }

  // check is email is populated and is of a valid email format
  if (!inputValues.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(inputValues.email)) {
    errors.email = "Email is not valid :(";
  }

  // check is confirm email is populated and matches the email
  if (!inputValues.confirmEmail) {
    errors.confirmEmail = "Email confirmation is required";
  } else if (inputValues.confirmEmail !== inputValues.email) {
    errors.confirmEmail = "Email doesn't match :(";
  }

  console.log(errors.fullName)
  console.log(errors.email)
  console.log(errors.confirmEmail)
  // console.log(errors.fullName !== "" && errors.email !== "" && errors.confirmEmail !== "")

  // check is all fields are valid
  const isValid =
    errors.fullName !== "" || errors.email !== "" || errors.confirmEmail !== ""
      ? false
      : true;

  console.log(isValid)

  return { isValid, errors };
}

export default validateForm;