import { EnterpriseType } from '../../types/enterprise'
import { formatAddress } from '../../utils/address'
import { Button } from '../Button'
import { Enterprise } from '../Enterprise'
import { Container } from '../Enterprise/styles'
import { ButtonWrapper } from './styles'

interface DashboardProps {
  data: EnterpriseType[]
  after: boolean
  onSearch: () => void
}

export function Dashboard({ data, after, onSearch }: DashboardProps) {
  return (
    <Container>
      {data.map(item => (
        <Enterprise
          key={item.id}
          title={item.name}
          address={formatAddress(item.address)}
          tags={[item.status, item.purpose]}
          edit={() => console.log(item)}
          remove={() => console.log(item)}
        />
      ))}
      {after && (
        <ButtonWrapper>
          <Button
            title="Carregar mais..."
            action={() => console.log('não kk')}
          />
        </ButtonWrapper>
      )}
    </Container>
  )
}
