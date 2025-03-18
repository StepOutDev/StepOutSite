'use client'
import { cookies } from "next/headers";
import { User } from "../../../interface";

export default function ProtectRoute(props: {children: React.ReactNode, role: string[], cookie: string|undefined, user: User|undefined}) {
    if (!props.cookie || !props.user) {
        window.location.href = "/signin";
    }
    else{
        if (props.role.includes(props.user.role)) {
            return <>{props.children}</>;
        } else {
            window.location.href = "/";
            return <></>
        }
    }
    return null;
}