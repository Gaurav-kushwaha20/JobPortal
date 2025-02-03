"use client"
import { verifyToken } from '../../../api/UserAPI'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

const page = () => {
    // fetch backend url from the environmet variable
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


    // take the user token from the parameter
    const params = useParams()
    const token = params.token

    // useRouter to navigate to another page
    const router = useRouter()

    useEffect(() => {
        // check wheather the token is valid or not
        verifyToken(token, backend_url)
            .then(data => {
                console.log(data)
                if (data?.success) {
                    // success alert
                    Swal.fire({
                        title: data.success,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            router.push("/login")

                        } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");
                        }
                    });

                } else if (data?.error) {
                    // sweet alert if any error from the backend server
                    Swal.fire({
                        title: data.error,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            router.push("/login")
                        }
                    });


                }

            })

    }, [])


    return (
        <div>
            {/* {token} */}
        </div>
    )
}

export default page