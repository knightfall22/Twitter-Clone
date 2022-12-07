import {useEffect, useState} from 'react'
import { SparklesIcon} from "@heroicons/react/outline";
import Input from './Input';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db,storage } from '../firebase';
import Post from './Post';


function Feed() {
  const [posts, setPosts] = useState([]);
  
  useEffect(
    () => onSnapshot(
      query(collection(db, "posts"), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    ),
    [db]
  )

  return (
    <div className=' text-white flex-grow border-l border-r border-gray-700  max-w-2xl  sm:ml-[72px]
        xl:ml-[290px]
    '>
        <div className='flex text-[#d9d9d9] sm:justify-between items-center 
        sticky py-2 px-3 top-0 z-50 bg-black border-b border-gray-700'>
            <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
            <div className='hoverAnimation flex items-center w-9 h-9 justify-center ml-auto xl:px-0'>
                <SparklesIcon className='h-5 text-white '/>
            </div>
        </div>

        <Input />
        <div className='pb-72'>
          {posts.map(post =>
            <Post key={post.id} id={post.id} post={post.data()} />
            )}
        </div>
    </div>
  )
}

export default Feed