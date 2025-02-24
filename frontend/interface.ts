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