import React from 'react';
import Image from "next/image";
import {MdAlternateEmail} from "react-icons/md";
import {FaMobileAlt} from "react-icons/fa";
import {TbWorld} from "react-icons/tb";
import {IoLocationOutline} from "react-icons/io5";


export const ResumeSample = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* User Details Content */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            // src={'/pp.jpg'}
                            src="http://localhost:5000/profile/default.png"
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white "
                            onLoad={() => console.log('Image loaded!')} // Ensure image is loaded
                        />
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">
                                <span>{'Gaurav'}</span>
                                <span> {'Kushwaha'}</span>
                            </h1>
                            <p className="text-sm opacity-80">{'rockymoderator@gmail.com'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Sample1 = () => {
    return (
        <div className="w-full  flex gap-10 ">
            {/* Left part */}
            <div className="bg-gray-300 w-1/3 rounded-lg">
                {/* Profile picture */}
                <div className="profile-picture py-2">
                    {/* Uncomment and use an actual image if needed */}
                    <Image
                        className="rounded-full object-center object-cover mx-auto w-48 h-48 border-[10px] border-blue-400 "
                        src="/profile.jpg"
                        alt="profile image" width={400} height={100}/>
                </div>

                <div id={'profile-contact-hobbies-details'} className={' p-10 flex flex-col gap-5 '}>

                    {/* PROFILE */}
                    <div className={'profile'}>
                        <p className={'text-blue-600 text-2xl font-bold mb-2'}>PROFILE</p>
                        <p className={'text-gray-600 font-light'}>Want to put your own image in the circle? It is easy!
                            Select the image and do a right mouse
                            click. Select “Fill” from the shortcut menu. Choose Picture… from the list. Navigate your
                            computer to get the appropriate picture. Click okay to insert your selected image.
                            <br/> <br/>
                            Once your image has been inserted, select it again. Go to the Picture Tools Format menu.
                            Click on the down arrow below “Crop” and select “Fill” from the list. This will auto adjust
                            your image to crop to the image. You can click and drag your image to place it
                            appropriately.
                        </p>
                    </div>

                    {/* contact section */}
                    <div id={'contact'}>
                        <div id={'contact-heading'}>
                            <p className={'text-blue-600 text-2xl font-bold mb-2'}>Contact</p>
                        </div>

                        <div className={'flex flex-col gap-3'}>
                            {/*Phone number*/}
                            <div id={'phone'}>
                                <p className={'text-gray-600 font-light'}>PHONE:</p>
                                <span>678-555-0103</span>
                            </div>

                            {/* website */}
                            <div id={'website'}>
                                <p className={'text-gray-600 font-light'}>WEBSITE:</p>
                                <span>website.com</span>
                            </div>

                            {/* E-mail */}
                            <div id={'email'}>
                                <p className={'text-gray-600 font-light'}>EMAIL:</p>
                                <span>Someone12@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/*   Hobbies section  */}
                    <div id={'hobby'}>
                        <div id={'hobbies-heading'}>
                            <p className={'text-blue-600 text-2xl font-bold mb-2'}>HOBBIES</p>
                        </div>
                        {/* Hobby List */}
                        <div id={'hobby'}>
                            <p className={'text-gray-600 font-light'}>Hobby 1</p>
                            <p className={'text-gray-600 font-light'}>Hobby 2</p>
                            <p className={'text-gray-600 font-light'}>Hobby 3</p>

                        </div>
                    </div>


                </div>
            </div>

            {/* Right part */}
            <div className="p-10 bg-white border-2 w-2/3 flex flex-col gap-5  ">

                {/* Name and Job Title */}
                <div id={'name-job-title'} className={'flex flex-col gap-5'}>
                    <div id={'name'} className={'flex flex-col gap-3'}>
                        <p className={'text-7xl font-medium'}>Mark</p>
                        <p className={'text-7xl font-medium'}>Zugerberg</p>
                    </div>

                    <div id={'job-title'}>
                        <p id={'job-title'} className={'text-3xl'}>CEO of Meta</p>
                    </div>
                </div>

                {/* Education */}
                <div id={'education'} className={'flex flex-col gap-5'}>
                    <div id={'education'}>
                        <p className={'text-2xl font-bold'}>EDUCATION</p>
                        <hr className="border-t-2 border-blue-500 w-full"/>
                    </div>

                    <div id={'school'}>
                        <p className={'text-xl font-semibold'}>Milestone secondary college</p>
                        <p className={'flex gap-4'}><span>2019-1-1</span> - <span>2021-1-1</span></p>
                        <p id={'school-description'}>I have studies physics, chemistry, Math and Computer Science as the
                            major subject. I have learn basic c program in computer and javascript as well </p>
                    </div>

                    <div id={'school-2'}>
                        <p className={'text-xl font-semibold'}>Milestone secondary college</p>
                        <p className={'flex gap-4'}><span>2019-1-1</span> - <span>2021-1-1</span></p>
                        <p id={'school-description'}>I have studies physics, chemistry, Math and Computer Science as the
                            major subject. I have learn basic c program in computer and javascript as well
                        </p>
                    </div>

                </div>


                {/*  WORK EXPERIENCE   */}
                <div id={'work-experience'} className={'flex flex-col gap-5'}>
                    <div id={'work-experience'}>
                        <p className={'text-2xl font-bold'}>WORK EXPERIENCE</p>
                        <hr className="border-t-2 border-blue-500 w-full"/>
                    </div>


                    <div id={'company-name'} className={'flex flex-col gap-5'}>
                        <div id={'company-1'}>
                            <p className={'text-xl font-semibold flex gap-5'}><span>Google</span> <span>Senior web developer</span>
                            </p>
                            <p className={'flex gap-4'}><span>2019-1-1</span> - <span>2021-1-1</span></p>
                            <p id={'school-description'}>Worked as the senior web developer in using javascript </p>
                        </div>

                        <div id={'company-1'}>
                            <p className={'text-xl font-semibold flex gap-5'}><span>Google</span> <span>Senior web developer</span>
                            </p>
                            <p className={'flex gap-4'}><span>2019-1-1</span> - <span>2021-1-1</span></p>
                            <p id={'school-description'}>Worked as the senior web developer in using javascript </p>
                        </div>

                        <div id={'company-1'}>
                            <p className={'text-xl font-semibold flex gap-5'}><span>Google</span> <span>Senior web developer</span>
                            </p>
                            <p className={'flex gap-4'}><span>2019-1-1</span> - <span>2021-1-1</span></p>
                            <p id={'school-description'}>Worked as the senior web developer in using javascript </p>
                        </div>
                    </div>

                </div>


                {/*  Skills   */}
                <div id={'skills'} className={'flex flex-col gap-5'}>
                    <div id={'work-experience'}>
                        <p className={'text-2xl font-bold'}>SKILLS</p>
                        <hr className="border-t-2 border-blue-500 w-full"/>
                    </div>

                    <div id={'skills-description f'}>
                        <div id={'skill-1'} className={'pr-8 flex gap-16 '}>
                            <span className={'w-5'}>HTML</span>
                            <span className={'bg-blue-400 rounded-sm w-[80%] text-center'}>80</span>
                        </div>
                    </div>

                    <div id={'skills-description f'}>
                        <div id={'skill-1'} className={'pr-8 flex gap-16 '}>
                            <span className={'w-5'}>CSS</span>
                            <span className={'bg-blue-400 rounded-sm w-[70%] text-center'}>70</span>
                        </div>
                    </div>

                    <div id={'skills-description f'}>
                        <div id={'skill-1'} className={'pr-8 flex gap-16 '}>
                            <span className={'w-5'}>NEXT.JS</span>
                            <span className={'bg-blue-400 rounded-sm w-[90%] text-center'}>90</span>
                        </div>
                    </div>


                </div>

            </div>
        </div>

    )
}


export const Sample2 = () => {
    return (
        <div className={' w-full flex '}>


             {/*left side */}
            <div className={'w-1/3 flex flex-col '}>
                {/*  photo profile  */}
                <div className={'h-[30vh] w-full bg-green-400'}>
                    <Image className={'object-cover h-full w-full'} src={'/sample-2-profile.jpg'} alt={'profile picture'}
                           height={1000}
                           width={5000}/>
                </div>

                <div className={'w-full  text-white'}>
                    
                    {/*Contact Details*/}
                    <div className={' w-full h-[40vh] bg-[#884594] pt-1 flex flex-col gap-5   '}
                         style={{clipPath: 'polygon(100% 0, 100% 70%, 50% 100%, 0 70%, 0 0)'}}>

                        <div className={'mt-5 '}>
                            <p className={'text-2xl text-center '}>CONTACT</p>
                            <div className={'border w-2/3 border-white mx-auto mt-2'}/>
                        </div>

                        <div className={'flex flex-col gap-5 mx-auto '}>
                            <p className={'flex gap-5'}><span><MdAlternateEmail/></span> <span>someone@gmail.com</span>
                            </p>
                            <p className={'flex gap-5'}><span><FaMobileAlt/></span> <span>9828890052</span></p>
                            <p className={'flex gap-5'}><span> <TbWorld/> </span> <span>www.website.com</span></p>
                        </div>

                        <div className={'location mx-auto'}>
                            <p>New Work City, MY</p>
                            <p className={'text-5xl flex justify-center'}><IoLocationOutline/></p>
                        </div>
                    </div>

                    {/*    second polygon     */}
                    <div className={' w-full h-[40vh] bg-[#884594]  pt-1 -mt-16'}
                         style={{clipPath: 'polygon(50% 30%, 100% 0, 100% 70%, 50% 100%, 0 70%, 0 0)'}}>

                        <div className={'w-fit h-[40vh] flex   my-auto mx-auto'}>
                            <div className={'my-auto'}>
                                <p>Gaurav Singh</p>
                                <p>Web Developer</p>
                                <p>Evolve It Hub</p>
                                <p>Kathmandu-Kadaghari</p>
                                <p>Mahantaar-3, 77400</p>
                            </div>

                        </div>
                    </div>

                    {/*    third polygon  */}
                    <div className={'w-full h-[20vh] bg-[#884594] pt-1 -mt-16 '}
                         style={{clipPath: 'polygon(50% 60%, 100% 0, 100% 100%, 0 100%, 0 0)'}}>

                    </div>
                </div>
            </div>


            {/*     right side*/}
            <div className={'w-2/3 h-full pt-1 flex flex-col pl-10'}>
                <div>
                    {/*  Name and Job Title   */}
                    <p className={'text-5xl '}><span>ANGELICA</span> <span>ASTROM</span></p>
                    <p className={'text-2xl text-red-400 '}>UI/UX DESIGNER</p>
                    <div className={'border w-full mt-5 '}/>
                </div>


                <div className={''}>
                    <div>
                        <p className={'text-2xl text-gray-500'}>DEAR <span>SIR</span>,</p>
                        <p className={'text-xl text-gray-500'}>Are you looking for
                            a <span>Next.js Developer</span> with: </p>
                    </div>
                    {/*list item of skills and achievements*/}
                    <div className={'pl-10'}>
                        <ul className={'list-disc text-gray-500 text-lg'}>
                            <li><span>2</span> years of hands-on experience in <span>Web development</span> ?</li>
                            <li>Knowledge of the latest technology in <span>web development</span> ?</li>
                            <li>Excellent written and oral communication skills?</li>
                            <li>A passion to learn and to increase his skills?</li>
                        </ul>
                    </div>
                    <br/>
                    <div className={'text-gray-500 text-xl font-medium'}>If so, then you need look no further. You will
                        see from my enclosed
                        resume that I meet all of these qualifications and more.
                    </div>
                    <br/>
                    <div className={'text-gray-500 text-xl font-medium'}>I would very much like to discuss opportunities
                        with [Company
                        Name]. To schedule an interview, please call me at [phone]. The best time to reach me is between
                        [earliest time] and [latest time], but you can leave a voice message at any time, and I will
                        return your call.
                    </div>
                    <br/>
                    <div className={'text-gray-500 text-xl font-medium'}>Thank you for taking the time to review my
                        resume. I look forward to talking with you.
                    </div>
                    <div className={'text-gray-500 text-lg font-medium mt-10 flex flex-col  gap-5'}>
                        <p>Sincerely,</p>
                        <p>Your name</p>
                        <p>Endclosure</p>
                    </div>


                </div>
            </div>
            
        </div>
    )
}