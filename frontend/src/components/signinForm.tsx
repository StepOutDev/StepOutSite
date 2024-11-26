

export default function SigninForm() {

    return(

        <div className="flex bg-white rounded-lg shadow-lg">
  
          {/* Form Section */}
          <form className="flex flex-col flex-1 p-6 space-y-4">
            
            <div>
                <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">StudentID</div>
                <input
                type="text"
                name="studentID"
                // placeholder="Student ID"
                className="w-full px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                required
                />
            </div>

            <div>
                <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Password</div>
                <input
                type="text"
                name="Password"
                // placeholder="Student ID"
                className="w-full px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                required
                />
            </div>
  
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E799AC] text-white py-2 rounded-xl hover:bg-pink-600"
            >
              Sign in
            </button>
          </form>
        </div>

    )

}