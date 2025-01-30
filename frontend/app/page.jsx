// app/page.js
import ImageChanger from "./Components/Image-changer";
import Navbar from "./Components/Navbar";


export default function JobPortalLanding() {
    return (
        <div className={'overflow-hidden'}>
            <Navbar className={'z-50'} />
            <div className="overflow-hidden">
            <ImageChanger />
            </div>
            
        </div>
    );
}