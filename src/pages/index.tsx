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
      <h1>Buscar</h1>
      <Enterprise
        title="Villega Vila Velha"
        address="Rua Dório Silva, 100 - Vila Guaranhuns, Vila Velha"
        tags={['Lançamento', 'Residencial']}
        edit={() => console.log('Editando...')}
        remove={() => console.log('Removendo...')}
      />
    </>
  )
}
