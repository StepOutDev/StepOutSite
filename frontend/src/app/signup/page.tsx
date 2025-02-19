import SignupForm from "@/components/signupComponents/signupform";

export default function Signup() {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
        {/* Header */}
        <div className="grid grid-cols-1 justify-center sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="flex text-[#E799AC] text-[50px] sm:text-[70px] lg:text-[100px] font-extrabold justify-center text-center sm:text-left">
            Sign up
          </div>
          <div className="flex justify-center w-[95%]">
            <SignupForm></SignupForm>
          </div>
        </div>
        
      </div>
    );
  }
  