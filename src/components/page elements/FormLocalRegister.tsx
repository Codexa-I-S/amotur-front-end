'use client'

import { Input } from "../ui/input"
import { Button } from "../ui/button"


export default function FormLocalRegister() {

    return (

        <form>

            {/* Name */}
            <div>
                <label>Nome:</label>
                <input

                type="text"
                placeholder="Digite o nome da empresa"
                className="w-70 h-8 p-2 ml-5 bg-[#f5f5f5] rounded-[10px] lg:text-[14px]"
                />
            </div>

            {/* Type */}
            <div>

            </div>

            {/* Description */}
            <div>

            </div>

            {/* Coordinates */}
            <div>

            </div>

            {/* Contacts */}
            <div>

            </div>

            {/* logo */}
            <div>

            </div>

            {/* Photos */}
            <div>

            </div>

        </form>

    )

}