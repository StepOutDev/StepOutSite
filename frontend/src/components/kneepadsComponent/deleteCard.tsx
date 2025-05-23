import deleteKneepads from "@/libs/kneepads/deleteKneepads";

export default function KneepadsDeletePopup(props: {number: string, cookie: string, setDelete: Function}) {
    return (
        <div className="flex flex-col item-center bg-white w-[306px] h-[300px] sm:w-[550px] sm:h-[270px]
        border-[3px] border-[#1A5AB8] rounded-[20px] shadow-[3px_5px_4px_rgba(0,0,0,0.25)]">
            <img src="/images/kneepads/cat3.jpg" alt="delete" className="w-[90px] h-[100px] mx-auto mt-[30px]
            rounded-[10px]"/>
            <div className="flex flex-row justify-center font-[poppinsSemiBold] text-[20px] sm:text-[24px] text-[#1A5AB8] p-[20px]">
                Do you want to delete the kneepads?
            </div>
            <div>
                <button className="inline font-[poppinsSemiBold] text-[16px] text-[#ED79B7]
                    border-[2px] border-[#ED79B7] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] ml-[10%] mr-[5%] hover:bg-[#ED79B7] hover:text-white" onClick={() =>{ props.setDelete(false);}}>
                    No
                </button>
                <button className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]
                    border-[2px] border-[#1A5AB8] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] mr-[10%] ml-[5%] hover:bg-[#1A5AB8] hover:text-white" onClick={() => {props.setDelete(false);
                    deleteKneepads(props.number,props.cookie); window.location.reload();}}>
                    Yes
                </button>
            </div>
        </div>
    )
}
