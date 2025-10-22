'use client'
import { useState } from "react"

export default function ToggleDark() {
    const [isDark, setIsDark] = useState(true)

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle('dark')
    }

    return (      
            <div>
                <button onClick={toggleTheme} className="absolute bg-white top-2 right-2 w-12 border-solid border-2 border-slate-950 rounded-2xl">               
                    <img src={isDark ? "/dark.png" : "/light.png"} width={24} alt="light" className="dark:translate-x-0 transition-transform duration-300 translate-x-5 " />
                </button>
            </div>       
    );
}