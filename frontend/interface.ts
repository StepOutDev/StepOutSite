export interface User{
    student_id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    year: string;
    major: string;
    role: string;
    password: string;
    image: string;
    telephone: string;
    instagram: string;
    line: string;

}

export interface FormRegister{
    student_id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    year: string;
    major: string;
    isMember: boolean;
    password: string;
    confirmPassword: string;
}

export interface Kneepads{
    number: string;
    size: string;
    status: string;
    booking_date: string;
    return_date: string;
    nick_name: string;
    year: string;
    major: string;
}

export interface Event{
    event_name: string;
    day: string;
    time: string;
    place: string;
    song: string[];
    description: string;
    image: string;
}

export interface FormEvent {
    song: string[];  // Use string[] to define a list (array) of strings
    event_name: string;
    day: string;      // Use Date type for date values
    time: string;
    image: string;
    place: string;
    description: string;
    
}