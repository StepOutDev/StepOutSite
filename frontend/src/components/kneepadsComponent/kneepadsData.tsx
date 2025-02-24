import { fetchData } from "next-auth/client/_utils";
import { Kneepads, User } from "../../../interface";

export default function KneepadsData(props: {kneepads: Kneepads}) {
    
    switch(props.kneepads.status) {
        case "available":
            return (
               <>available</> 
            )
        case "booked":
            return (
                <div className="flex flex-col">
                    <div>
                        User : {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                    </div>
                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            )
        case "unavailable":
            return (
                <img src="/images/kneepads/cat.jpg" className="w-[90px] mt-[10px] rounded-[20px]"/>
            )
        case "disappear":
            return (
                <img src="/images/kneepads/cat2.jpeg" className="w-[90px] mt-[10px] rounded-[20px]"/>
            )  
        case "pending":
            return (
                <>pending</>
            )              
    }
}