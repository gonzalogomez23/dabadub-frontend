import { useUserContext } from "@/context/UserProvider";
import { fetchFromApi } from "@/lib/api";

type SignupData = {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
};

export const useAuth = () => {
  const { user, setUser } = useUserContext();

  const signup = async (formData: SignupData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, ...data };
    }
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetchFromApi("/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error logging out:", err);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  return { signup, logout };
};
