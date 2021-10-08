import Head from 'next/head'
import { Enterprise } from '../components/Enterprise'
import { Header } from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Empreendi Mentos</title>
      </Head>
      <Header action={() => console.log('oie')} />
      <h1>Hello World</h1>
      <Enterprise />
      <Enterprise />
      <Enterprise />
      <Enterprise />
    </>
  )
}
