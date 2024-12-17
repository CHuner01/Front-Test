
export default function CopyAlert() {

    return(
        <div className="fixed inset-0 p-4 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="w-[350px] h-[75px] flex justify-center items-center rounded-2xl bg-[#0F0F0F]">
                <p className="font-poppins font-base">Link copied!</p>
            </div>
        </div>
    );
}