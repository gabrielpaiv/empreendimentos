import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AddModal } from '../components/AddModal'
import { Dashboard } from '../components/Dashboard'
import { Header } from '../components/Header'
import { api } from '../services/api'
import { EnterpriseType } from '../types/enterprise'

interface HomeProps {
  data: EnterpriseType[]
  after?: boolean
}

export default function Home({ data, after }: HomeProps) {
  const [enterprises, setEnterprises] = useState(data)
  const [addModalOpen, setAddModalOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Empreendi Mentos</title>
      </Head>
      <Header action={() => setAddModalOpen(true)} />
      <Dashboard
        after={after}
        data={enterprises}
        onSearch={() => console.log('procurando nemo')}
      />
      <AddModal
        isOpen={addModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const response = await api
    .get<EnterpriseType[]>('enterprises?_start=0&_end=10')
    .then(response => {
      return response.data
    })

  const after = response.length === 10

  return {
    props: {
      data: response,
      after
    }
  }
}
