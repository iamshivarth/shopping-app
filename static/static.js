export const register = {
  title: "Signup",
  about: "We do not share your personal details with anyone.",
  fields: [
    {
      name: "First Name",
      id: "firstName",
      type: "text",
    },
    {
      name: "Last Name",
      id: "lastName",
      type: "text",
    },
    {
      name: "Email",
      id: "email",
      type: "email",
    },
    {
      name: "Password",
      id: "password",
      type: "password",
    },
    {
      name: "Confirm Password",
      id: "confirmPassword",
      type: "password",
    },
  ],
};

export const login = {
  title: "Login",
  about: "Get access to your Orders, Wishlist and Recommendations",
  fields: register.fields.filter(
    (login) => login.id === "email" || login.id === "password"
  ),
};
