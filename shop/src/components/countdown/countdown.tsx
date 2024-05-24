'use client'

import { useState } from "react";


export const countdown = () => {

    const date = new Date

    const [Time, setTime] = useState('')

    const handle_time = () => {
        setTimeout(() => {
            const hour = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
            handle_time();
        }, 1000);

    }

    return (
        <div>
            <div>
            <span>{Time}</span>
            </div>
            

        </div>
    )
}

