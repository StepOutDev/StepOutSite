import React, { useState } from 'react';

export default function AddInput() {
    const [inputFields, setInputFields] = useState<string[]>([]);

    const addInputField = () => {
        setInputFields([...inputFields, '']); // Add a new empty string to represent a new input field
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputFields = [...inputFields];
        newInputFields[index] = e.target.value;
        setInputFields(newInputFields);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <div id="inputFields">
                    {inputFields.map((value, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="event_name"
                                placeholder="Enter song"
                                className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl mb-5"
                                value={value}
                                onChange={(e) => handleInputChange(e, index)}
                                // required
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={addInputField}
                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl hover:bg-[#c596c2] transition-all"
                >
                    +
                </button>
            </div>
        </div>
    );
};

