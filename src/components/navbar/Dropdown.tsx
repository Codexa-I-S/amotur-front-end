'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { getUserRole } from "../page-elements/GetUserRole";

export default function Dropdown() {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        const storedToken = localStorage.getItem("authToken");
        setToken(storedToken);

    }, []);

     const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    const handleRedirect = () => {

    router.push("/dashboard")

    }



    return (
        <DropdownMenu>
        <DropdownMenuTrigger>

            <MoreVertical/>

        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-[1002] mt-5 mr-4">

       

            
            {!token ? (
                <button
                    className="w-full"
                    onClick={() => handleLogin()}>

                    <DropdownMenuItem> Login </DropdownMenuItem>

                </button>

                ) : (
                    <button
                        className="w-full"
                        onClick={() => handleLogout()}>
                        
                        <DropdownMenuItem> Sair </DropdownMenuItem>

                    </button>
            )}
            

            {getUserRole() === 'ADMIN' && (
                <button
                    className="w-full"
                    onClick={handleRedirect}>

                    <DropdownMenuItem> Dashboard </DropdownMenuItem>
                    
                </button>
            )}
       

        </DropdownMenuContent>
        </DropdownMenu>
    )

}