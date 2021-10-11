import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { EnterpriseType } from '../../types/enterprise'
import { formatAddress } from '../../utils/address'
import { Button } from '../Button'
import { EditModal } from '../EditModal'
import { Enterprise } from '../Enterprise'
import { Container, SearchInput } from './styles'
import { ButtonWrapper, Search } from './styles'

interface DashboardProps {
  data: EnterpriseType[]
  after: boolean
  onSearch: (search: string, event: Event) => Promise<void>
  onLoadMore: () => void
  onRemove: (id: string) => void
}

export function Dashboard({
  data,
  after,
  onSearch,
  onLoadMore,
  onRemove
}: DashboardProps) {
  const [search, setSearch] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selected, setSelected] = useState({} as EnterpriseType)

  return (
    <>
      <Container>
        <Search onSubmit={() => onSearch(search, event)}>
          <BiSearch size={20} />
          <SearchInput
            placeholder="Buscar"
            onChange={e => setSearch(e.target.value)}
          />
        </Search>

        {data.map(item => (
          <Enterprise
            key={item.id}
            title={item.name}
            address={formatAddress(item.address)}
            tags={[item.status, item.purpose]}
            edit={() => {
              setSelected(item)
              setEditModalOpen(true)
            }}
            remove={() => onRemove(item.id)}
          />
        ))}
        {after && (
          <ButtonWrapper>
            <Button title="Carregar mais..." action={onLoadMore} />
          </ButtonWrapper>
        )}
      </Container>

      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          data={selected}
          onRequestClose={() => {
            setEditModalOpen(false)
          }}
        />
      )}
    </>
  )
}
