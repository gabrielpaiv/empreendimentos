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
  page: number
}

export default function Home({ data, after, page }: HomeProps) {
  const [enterprises, setEnterprises] = useState(data)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [nextPage, setNextPage] = useState(page + 1)
  const [showButton, setShowButton] = useState(after)

  async function updateRequest() {
    const update = await api.get<EnterpriseType[]>(
      'enterprises?_start=0&_end=10&_sort=id&_order=desc'
    )
    setEnterprises(update.data)
  }

  async function loadMore() {
    const load = await api
      .get<EnterpriseType[]>(
        `enterprises?_start=${10 * nextPage}&_end=${
          nextPage * 10 + 10
        }&_sort=id&_order=desc`
      )
      .then(response => response.data)
    setNextPage(nextPage + 1)

    setShowButton(load.length === 10)
    setEnterprises([...enterprises, ...load])
  }

  async function onSearch(search: string, event: Event) {
    event.preventDefault()
    const response = await api
      .get<EnterpriseType[]>(`enterprises?name_like=${search}`)
      .then(response => setEnterprises(response.data))
      .catch(err => console.log(err))
  }

  async function onRemove(id: string) {
    const response = await api
      .delete(`enterprises/${id}`)
      .catch(err => console.log(err))

    const index = enterprises.findIndex(item => item.id === id)
    const updated = [...enterprises]
    updated.splice(index, 1)
    setEnterprises(updated)
  }

  return (
    <>
      <Head>
        <title>Empreendi Mentos</title>
      </Head>
      <Header action={() => setAddModalOpen(true)} />
      <Dashboard
        after={showButton}
        data={enterprises}
        onSearch={onSearch}
        onLoadMore={() => loadMore()}
        onRemove={onRemove}
      />
      <AddModal
        isOpen={addModalOpen}
        onRequestClose={() => {
          setAddModalOpen(false)
          updateRequest()
        }}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const response = await api
    .get<EnterpriseType[]>('enterprises?_start=0&_end=10&_sort=id&_order=desc')
    .then(response => {
      return response.data
    })

  const after = response.length === 10

  return {
    props: {
      data: response,
      after,
      page: 0
    }
  }
}
