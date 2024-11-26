

interface SigninFormProps {
  formData: { studentID: string; password: string };
  loading: boolean;
  error: string | null;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

export default function SigninForm({
  formData,
  loading,
  error,
  onChange,
  onSubmit,
}: SigninFormProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

    return(

        <div className="flex bg-white rounded-lg shadow-lg">
  
          {/* Form Section */}
          <form className="flex flex-col flex-1 p-6 space-y-4"
            onSubmit={handleFormSubmit}
          >
            {error && <div className="text-red-500">{error}</div>}
            
            <div>
                <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">StudentID</div>
                <input
                type="text"
                name="studentID"
                // placeholder="Student ID"
                value={formData.studentID}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                required
                />
            </div>

            <div>
                <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Password</div>
                <input
                type="password"
                name="password"
                // placeholder="Student ID"
                value={formData.password}
                onChange={handleInputChange}
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
