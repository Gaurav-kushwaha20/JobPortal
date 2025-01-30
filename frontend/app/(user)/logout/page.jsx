"use client"
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

function Page() {
    const router = useRouter();
    // only the user with token can access this page
    useEffect(() => {
        const token = localStorage.getItem('c_user');
        if(!token){
            Swal.fire({
                title: "Please login first!",
                confirmButtonText: "ok",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    router.push('/login');

                }
            });
        }

        console.log(token);
        localStorage.removeItem('c_user');
        router.push('/login');
    }, [])


    return (
        <div>

        </div>
    );
}

export default Page;