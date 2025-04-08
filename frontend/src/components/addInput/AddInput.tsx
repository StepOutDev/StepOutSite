import React, { useState, useEffect } from 'react';

interface AddInputProps {
    initialSongs?: string[];
    onSongsChange?: (songs: string[]) => void;
    setSongs?: (songs: string[]) => void;
}

export default function AddInput({ initialSongs = [], onSongsChange, setSongs }: AddInputProps) {
    const [inputFields, setInputFields] = useState<string[]>(initialSongs);
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track which input

    useEffect(() => {
        if (initialSongs.length > 0 && JSON.stringify(inputFields) !== JSON.stringify(initialSongs)) {
            setInputFields(initialSongs);
        }
    }, [initialSongs]);

    const addInputField = () => {
        const updatedFields = [...inputFields, ''];
        setInputFields(updatedFields);
        onSongsChange?.(updatedFields);
        setSongs?.(updatedFields);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputFields = [...inputFields];
        newInputFields[index] = e.target.value;
        setInputFields(newInputFields);
        onSongsChange?.(newInputFields);
        setSongs?.(newInputFields);
    };
    
    const handleRemoveField = (index: number) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1); // Remove the field
        setInputFields(newInputFields);
        setSongs?.(newInputFields);
        setActiveIndex(null); // Reset active state
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <div id="inputFields">
                {inputFields.map((value, index) => (
                    <div key={index} className="relative mb-5">
                        <input
                        type="text"
                        placeholder="Enter song"
                        className="w-full px-4 py-2 pr-10 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                        value={value}
                        onChange={(e) => handleInputChange(e, index)}
                        onFocus={() => setActiveIndex(index)}
                        onBlur={() => setTimeout(() => setActiveIndex(null), 200)}
                        />
                        {/* {activeIndex === index && ( */}
                        <button
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-red-600 transition"
                            onClick={() => handleRemoveField(index)}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21
                                c.342.052.682.107 1.022.166m-1.022-.165L18.16
                                19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25
                                2.25 0 01-2.244-2.077L4.772
                                5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12
                                .562c.34-.059.68-.114
                                1.022-.165m0 0a48.11 48.11 0
                                013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
                                51.964 0 00-3.32 0c-1.18.037-2.09
                                1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                            </svg>
                        </button>
                        {/* )} */}
                    </div>
                ))}
                </div>
                <button
                    type='button'
                    onClick={addInputField}
                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl hover:bg-[#c596c2] transition-all"
                >
                    +
                </button>
            </div>
        </div>
    );
};



