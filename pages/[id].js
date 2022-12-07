import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
  import Widgets from "../components/Widgets";
  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
  import Comment from "../components/Comment";
  import Head from "next/head"
  import styles from '../styles/Home.module.css'
import Login from "../Components/Login";


const postPage = ({trendingResults,followResults,providers}) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(
      () =>
        onSnapshot(doc(db, "posts", id), (snapshot) => {
          setPost(snapshot.data());
        }),
      [db]
    );

    useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
          ),
        [db, id]
      );

    if (!session){ return  <Login providers={providers}/>}
  return (
        <div className={styles.container}>
            <Head>
                <title>
                    {post?.username} on Twitter: {post?.text}
                </title>
                <meta name="description" content="Twitter Clone" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-black min-h-screen flex max-w-[1350px] mx-auto"> {/* make note of width */}
                {/* Sidebar */}
                <Sidebar />
                <div className=' text-white flex-grow border-l border-r border-gray-700  max-w-3xl sm:ml-[72px] xl:ml-[290px]'>
                    <div className="flex items-center text-[#d9d9d9] border-b border-gray-700 px-1.5 py-2 font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div className="w-9 h-9 hoverAnimation flex items-center justify-center xl:px-0">
                            <ArrowLeftIcon className="h-5 text-white" onClick={() => router.push('/')}/>
                        </div>
                        Tweet
                    </div>

                    <Post id={id} post={post}  />

                    {comments.length > 0 && (
                        <div className="pb-72">
                            {comments.map((comment) => (
                                <Comment key={comment.id} id={comment.id} comment={comment.data()} />
                            ))}
                        </div>
                    )}
                 </div>

                {/* Widgets */}
                <Widgets trendingResults={trendingResults} followResults={followResults}/>
                {/* Modal */}
                {isOpen && <Modal />}
            </main>
    </div>
  )
}

export default postPage

export async function getServerSideProps(context) {

    const trendingResults = await fetch("https://api.npoint.io/e9ec11fa22416c40f9b0").then(
      (res) => res.json()
    );
    const followResults = await fetch("https://api.npoint.io/c0f3ce52798db1767456").then(
      (res) => res.json()
    );
    const providers = await getProviders();
    const session = await getSession(context);
  
    return {
      props: {
        trendingResults,
        followResults,
        providers,
        session,
      },
    };
  }