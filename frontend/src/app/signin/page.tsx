"use client"
import SigninForm from "@/components/signinForm";
import { useState } from "react";
import userSignin from "@/libs/userSignin";

export default function Signin() {

  const [formData, setFormData] = useState({ studentID: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call API with formData
      const data = await userSignin(formData.studentID, formData.password);
      alert("Login successful!");
      console.log("User data:", data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
        {/* Header */}
        <div className="justify-center sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="flex text-[#E799AC] text-[50px] sm:text-[70px] lg:text-[100px] font-extrabold justify-center text-center sm:text-left">
            Sign in
          </div>
          <div className="flex justify-center w-[95%]">
            <SigninForm
              formData={formData}
              loading={loading}
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
            ></SigninForm>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          </div>
        </div>
        
      </div>
    );
  }