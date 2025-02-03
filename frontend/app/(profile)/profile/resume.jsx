import React from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ResumeSample, Sample1, Sample2} from "./ResumeSample";


const Resume = () => {
    const downloadPDF = async () => {
        const element = document.getElementById("user-details"); // Element to capture
        const canvas = await html2canvas(element, { scale: 2, useCORS: true }); // High resolution for quality
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth(); // PDF width
        const pdfHeight = pdf.internal.pageSize.getHeight(); // PDF height

        // Calculate proportional dimensions
        const canvasAspectRatio = canvas.width / canvas.height; // Aspect ratio of the captured content
        // const pdfAspectRatio = pdfHeight  / pdfWidt; // Aspect ratio of the PDF
        const pdfAspectRatio = 1/ 1.3; // Aspect ratio of the PDF

        let renderWidth = pdfWidth;
        let renderHeight = pdfHeight;

        // Maintain aspect ratio based on width
        renderHeight = renderWidth / pdfAspectRatio;
        // renderHeight = renderWidth / canvasAspectRatio;

        // Center the image vertically
        const offsetY = (pdfHeight - renderHeight) / 2;

        pdf.addImage(imgData, "PNG", 0, offsetY, renderWidth, renderHeight);
        pdf.save("user-details.pdf");
    };
    
    // main function return statement
    return (
        <div className={''}>
            <div id="user-details">
               {/*<ResumeSample />*/}
                {/* <Sample1 /> */}
                <Sample2 />
             
            
            </div>
            {/* Download button */}
            <div className={' bottom-0'}>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={downloadPDF}
                    
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default Resume;