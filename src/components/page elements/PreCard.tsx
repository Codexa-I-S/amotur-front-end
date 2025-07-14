import ModalCard from "./ModalCard";

type Props = {
    
    name: string;
    type: string;
    instagramUrl: string;
    email: string;
    telefone: string;
    description: string;
    images: string[];
    logo: string;
    
}

export default function PreCard({logo, name, type, instagramUrl, email, telefone, description, images} : Props){

    return (
        <div className="w-[280px] h-[100px] p-[10px] rounded-2xl" >

            <div className="w-full h-2/3 flex" >

                <div className="w-1/3 h-full flex justify-start items-center">
                    <a href={logo} target="e_blank">
                        <img
                        src={logo}
                        className="w-12 h-12  rounded-full transition-transform duration-300 hover:scale-105"
                        />
                    </a>
                </div>

                <div className="w-2/3 h-full flex flex-col justify-center mr-15">

                    <div className="h-1/3 font-bold text-[16px]">
                        <p>{name}</p>
                    </div>
                    
                    <div className="h-1/3 mb-11 py-1">
                        <p className="text-amber-600">{type}</p>
                    </div> 

                </div>
                

            </div>

            <div className="w-full h-1/3 flex justify-center items-center cursor-pointer border-t-3 border-gray-300 mt-1 hover:text-gray-500" >
                <ModalCard
                    name={name}
                    type={type}
                    instagramUrl={instagramUrl}
                    email={email}
                    telefone={telefone}
                    description={description}
                    logo={logo}
                    images={images}
                />
            </div>

        </div>
    )

}