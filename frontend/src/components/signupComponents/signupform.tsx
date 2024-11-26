

export default function SignupForm() {

    const major = [
        '-','Civil','Electrical','Mechanical','Automotive','Industrial',
        'Environmental','Metallurgical & Materials','Mining & Petroleum','Chemical','Computer',
        'Nuclear','Georesources','Survey','Robotics & AI','ICE',
        'NANO','ADME','AERO','CHPE','CEDT','SEMI'
    ]

    return(

        <div className="flex bg-white rounded-lg shadow-lg">
  
          {/* Form Section */}
          <form className="flex flex-col flex-1 p-6 space-y-4">
            {/* Student ID */}
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

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Firstname</div>
                    <input
                        type="text"
                        name="firstName"
                        // placeholder="Firstname"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Lastname</div>
                    <input
                        type="text"
                        name="lastName"
                        // placeholder="Lastname"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    />                  
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Nickname</div>
                    <input
                        type="text"
                        name="nickname"
                        // placeholder="Nickname"
                        className="px-4 py-2 bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    />
                </div>
            </div>
  
            {/* Year and Major */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Year</div>
                    <select
                        name="year"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    >
                        <option value="" disabled>
                        Year
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Major</div>
                    <select
                        id="major"
                        name="Major"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    >
                        <option value="" disabled>Major</option>
                            {major.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
  
            {/* Checkbox */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isMember"
                className="w-4 h-4 text-pink-500 border-gray-300 bg-white rounded focus:ring-pink-300"
              />
              <span className="text-sm text-gray-700">
                Are you a StepOut member?{" "}
                <span className="text-pink-500 text-xl">🦋</span>
              </span>
            </label>
  
            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Password</div>
                    <input
                        type="password"
                        name="password"
                        // placeholder="Password"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Confirm Password</div>
                    <input
                        type="password"
                        name="confirmPassword"
                        // placeholder="Confirm Password"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        required
                    />
                </div>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E799AC] text-white py-2 rounded-xl hover:bg-pink-600"
            >
              Sign up
            </button>
          </form>
        </div>

    )

}