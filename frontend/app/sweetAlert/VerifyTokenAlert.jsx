'use client';

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const VerifyResetToken = ({ verificationResult }) => {
    useEffect(() => {
        if (verificationResult?.error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: verificationResult.error,
                showConfirmButton: true,
            });
        } else if (verificationResult?.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                text: verificationResult.success,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }, [verificationResult]);

    return <div>Processing your request...</div>;
};

export default VerifyResetToken;
