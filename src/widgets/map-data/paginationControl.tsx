import DoubleLeftIcon from "../../../public/images/DoubleLeftIcon.svg";
import LeftIcon from "../../../public/images/LeftIcon.svg";
import RightIcon from "../../../public/images/RightIcon.svg";
import DoubleRightIcon from "../../../public/images/DoubleRightIcon.svg";
import Image from "next/image";

type PaginationControlType = {
    totalPages: number,
    currentPage: number,
    changePage: (page: number) => void;
}

export default function PaginationControl({ totalPages, currentPage, changePage}: PaginationControlType) {

    const pages:number[] = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }

    return (
        <>
            <div className="flex gap-2">
                <div className="m-2 flex items-center">
                    <button onClick={() => changePage(1)}
                            disabled={currentPage === 1}
                            className={`flex items-center ${currentPage === 1 ? 'opacity-50' : ''}`}>
                        <Image src={DoubleLeftIcon} alt="Icon" width="19" height="19" />
                    </button>
                </div>
                <div className="m-2 flex items-center">
                    <button onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center ${currentPage === 1 ? 'opacity-50' : ''}`}>
                        <Image src={LeftIcon} alt="Icon" width="19" height="19" />
                    </button>
                </div>
                {pages.map((page, index) => (
                    <div key={index} className="m-2 flex items-center ">
                        <button className={`flex items-center font-poppins font-base ${currentPage === page ? 
                            'opacity-50' : ''}`}
                                onClick={() => changePage(page)}>{page}</button>
                    </div>
                ))}
                <div className="m-2 flex items-center">
                    <button onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center ${currentPage === totalPages ? 'opacity-50' : ''}`}>
                        <Image src={RightIcon} alt="Icon" width="19" height="19" />
                    </button>
                </div>
                <div className="m-2 flex items-center">
                    <button onClick={() => changePage(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center ${currentPage === totalPages ? 'opacity-50' : ''}`}>
                        <Image src={DoubleRightIcon} alt="Icon" width="19" height="19" />
                    </button>
                </div>
            </div>

        </>
    );
};