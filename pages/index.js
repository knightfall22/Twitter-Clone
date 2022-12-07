import Head from 'next/head'
import Image from 'next/image'
import Feed from '../Components/Feed'
import Sidebar from '../Components/Sidebar'
import styles from '../styles/Home.module.css'
import { getProviders, getSession, useSession } from "next-auth/react";
import axios from "axios"
import Login from '../Components/Login'
import Modal from '../Components/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Widgets from '../Components/Widgets'

export default function Home({trendingResults, followResults, providers}) {
  const {data: session} = useSession() 
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  if (!session){ return  <Login providers={providers}/>}
  return (

    <div className={styles.container}>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1350px] mx-auto"> {/* make note of width */}
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets trendingResults={trendingResults} followResults={followResults}/>
        {/* Modal */}
        {isOpen && <Modal />}
      </main>
    </div>
  )
}

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