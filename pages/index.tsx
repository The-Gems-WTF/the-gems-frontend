import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import whitelist from "data/whitelist"

fcl
  .config()
  // .put("accessNode.api", "https://access-testnet.onflow.org")
  // .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/api/flow/auth")
  // .put("discovery.wallet.method", "HTTP/POST") // Needed for testnet to work as it does not allow iframe
  // .put("accessNode.api", "https://access-testnet.onflow.org") // Flow testnet
  // .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")
  .put("accessNode.api", "https://access-mainnet-beta.onflow.org") // Flow mainnet
  .put("challenge.handshake", "https://flow-wallet.blocto.app/authn")

const Home: NextPage = () => {
  const [user, setUser] = useState({ addr: null })

  const logIn = () => {
    fcl.authenticate()
  }

  const logOut = () => {
    fcl.unauthenticate()
  }

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>The Gems</title>
        <meta name="description" content="The Gems" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>The Gems</h1>

        {user?.addr != null ? (
          <>
          <p className={styles.description}>
          {whitelist[user?.addr]!=null ? <>
          You are whitelisted: {whitelist[user?.addr]}x</>:<>You don&apos;t have whitelist</>}
          </p>
            <button
              onClick={() => logOut()}
              type="button"
              className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <p className={styles.description}>Check your whitelist status</p>
            <button
              onClick={() => logIn()}
              type="button"
              className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connect Wallet
            </button>
          </>
        )}
      </main>
    </div>
  )
}

export default Home
