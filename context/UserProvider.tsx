import { fetchCurrentUser } from "@/lib/auth";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/app/types";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const loadUser = async () => {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      };

      loadUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)