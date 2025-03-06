export default function Contact() {
    return (
        <div id="contact"
            className=" relative w-full mt-[5%] bg-[#7A4E9A] pb-[40px] overflow-hidden"
        >
            <div 
                className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-right opacity-50"
                style={{
                    backgroundImage: "url('/images/logo/Logo1.png')", // Change this to your actual image
                    backgroundSize: "200% auto",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <div className="relative flex md:flex-row flex-col w-full">
                
                {/* <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] m-[10px] ">
                    <img src="/images/logo/Logo1.png" 
                        alt="Logo"
                        className=""
                    />
                </div>  */}

                <div className="flex md:flex-row flex-col mt-[20px] items-start ml-[15%] md:space-x-20 space-y-7 md:space-y-0">
                    {/* Follow me section */}
                    <div className="flex flex-col text-white items-start">
                        <h2 className="text-[24px] md:text-left">Follow Us</h2>
                        <div className="flex flex-col space-y-5 mt-[5%]">
                            {/* Add your social media links or icons */}
                            <a href="https://youtube.com/@stepout_intania?si=agSPg-xc8y-y4Cgq" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/youtube.png" alt="Youtube" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">StepOut Intania</div>
                            </a>
                            <a href="https://www.instagram.com/stepout_intania/profilecard/?igsh=MTR2M3lhNWpkbzhnYg==" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/instagram.png" alt="Instagram" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">stepout_intania</div>
                            </a>
                            <a href="https://www.tiktok.com/@stepout_intania?_t=8rWRHbeqMqO&_r=1" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/tik-tok.png" alt="Tiktok" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">stepout_intania</div>
                            </a>
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className="flex flex-col text-white items-start">
                        <h2 className="text-[24px] md:text-left">Contact</h2>
                        <div className="flex flex-col space-y-5 mt-[5%]">
                            {/* Add your social media links or icons */}
                            <a href="https://www.instagram.com/stepout_intania/profilecard/?igsh=MTR2M3lhNWpkbzhnYg==" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/instagram.png" alt="Instagram" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">stepout_intania</div>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/phone-call.png" alt="Call" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">0991905115 : Nattapat Daengkongkaew</div>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                                <img src="/images/icon/contact/phone-call.png" alt="Call" className="w-5 h-5 md:w-7 md:h-7 invert" />
                                <div className="ml-2 md:ml-4 text-[14px]">0944257253 : Auto 3 IE</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
