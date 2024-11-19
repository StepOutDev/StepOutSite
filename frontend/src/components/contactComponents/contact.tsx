export default function Contact() {
    return (
        <div id="contact" className="bg-[#7A4E9A] w-full h-auto grid grid-cols-1 mt-[5%] md:grid-cols-3 gap-6 p-4">

            {/* Follow me section */}
            <div className="flex flex-col text-white items-center ml-6 mt-4 md:items-start ml-0">
                <h2 className="text-[24px] md:text-[32px] font-bold text-center md:text-left">Follow Us</h2>
                <div className="flex flex-col space-y-5 mt-4 md:mt-6">
                    {/* Add your social media links or icons */}
                    <a href="https://youtube.com/@stepout_intania?si=agSPg-xc8y-y4Cgq" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/youtube.png" alt="Youtube" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">StepOut Intania</div>
                    </a>
                    <a href="https://www.instagram.com/stepout_intania/profilecard/?igsh=MTR2M3lhNWpkbzhnYg==" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/instagram.png" alt="Instagram" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">stepout_intania</div>
                    </a>
                    <a href="https://www.tiktok.com/@stepout_intania?_t=8rWRHbeqMqO&_r=1" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/tik-tok.png" alt="Tiktok" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">stepout_intania</div>
                    </a>
                </div>
            </div>

            {/* Contact section */}
            <div className="flex flex-col text-white items-center md:items-start mt-4">
                <h2 className="text-[24px] md:text-[32px] font-bold text-center md:text-left">Contact</h2>
                <div className="flex flex-col space-y-5 mt-[5%]">
                    {/* Add your social media links or icons */}
                    <a href="https://www.instagram.com/stepout_intania/profilecard/?igsh=MTR2M3lhNWpkbzhnYg==" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/instagram.png" alt="Instagram" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">stepout_intania</div>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/phone-call.png" alt="Call" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">0991905115 : Q 2 CEDT</div>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
                        <img src="/images/icon/phone-call.png" alt="Call" className="w-6 h-6 md:w-8 md:h-8 invert" />
                        <div className="ml-2 md:ml-4 text-[16px] md:text-[20px]">0944257253 : Auto 3 IE</div>
                    </a>
                </div>
            </div>

            {/* bg-logo section */}
            <div className="flex items-center justify-center h-60 md:60 bg-cover bg-center" style={{ backgroundImage: 'url(/images/logo/Logo1.png)'}}>
            </div>
        </div>
    );
}
