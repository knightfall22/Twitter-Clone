import { DotsHorizontalIcon } from "@heroicons/react/outline";
import Image from "next/image";


const Trending = ({result}) => {
    console.log(result);
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 
    cursor-pointer transiton duration-200 
    ease-out flex items-center justify-between'>
        <div className='space-y-0.5'>
            <p className='text-[#6e767d] text-xs font-medium'>{result.heading}</p>
            <h6 className='font-bold max-w-[250px] text-sm'>{result.description}</h6>
            <p className='text-[#6e767d] text-xs font-medium max-w-[250px]'>Trending with <span className="tag">{result.tags}</span> </p>
        </div>
        {result.img ? (
        <Image
          src={result.img}
          width={80}
          height={80}
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
    
  )
}

export default Trending