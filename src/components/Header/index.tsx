import { Button } from '../Button'
import { Container, Content, Logo } from './styles'

interface HeaderProps {
  action: () => void
}

export function Header({ action }: HeaderProps) {
  return (
    <Container>
      <Content>
        <Logo>Empreendi Mentos</Logo>
        <Button title="Adicionar +" action={action} />
      </Content>
    </Container>
  )
}
