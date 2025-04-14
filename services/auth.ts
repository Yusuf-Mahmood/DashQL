import { USER_QUERY } from "@/graphql/queries";

export const loginUser = async (identifier: string, password: string): Promise<string | null> => {
  const encodedCredentials = btoa(`${identifier.trim()}:${password.trim()}`);
  const isEmail = identifier.includes("@");
  const bodyData = isEmail
    ? { email: identifier, password }
    : { username: identifier, password };

  try {
    const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) throw new Error("Invalid credentials");

    const token = await response.json();
    return token;
  } catch (err) {
    return null;
  }
};

export const fetchProfileData = async (token: string): Promise<any> => {
  try {
    const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(USER_QUERY),
    });
    const json = await response.json();
    return json?.data?.user || null;
  } catch (err) {
    return null;
  }
};
