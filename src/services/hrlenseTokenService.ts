export const hrlenseToken = async () => {
  let token = sessionStorage.getItem("hrlense_token");

  // If token exists, return it
  if (token) return token;

  // Otherwise generate new token
  const res = await fetch(
    `https://hrms-demo.jobvritta.com/api/DropDown/generateToken?employee_Code=120`,
    { method: "POST" }
  );
  const data = await res.json();
  token = data.token;

  if (token) {
    sessionStorage.setItem("hrlense_token", token);
  }

  return token;
};
