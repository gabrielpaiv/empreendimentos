import {
  ActionButton,
  Actions,
  Container,
  Content,
  Address,
  Tag,
  Title,
  TagWrapper,
  InfoWrapper
} from './styles'
import { BiTrashAlt, BiPencil } from 'react-icons/bi'

interface EnterpriseProps {
  title: string
  address: string
  tags: string[]
  edit: () => void
  remove: () => void
}

export function Enterprise({
  title,
  address,
  tags,
  edit,
  remove
}: EnterpriseProps) {
  return (
    <Container>
      <Content>
        <InfoWrapper>
          <Title>{title}</Title>
          <Address>{address}</Address>
        </InfoWrapper>
        <Actions>
          <ActionButton onClick={edit}>
            <BiPencil color="var(--green)" size="1.5rem" />
          </ActionButton>
          <ActionButton onClick={remove}>
            <BiTrashAlt color="var(--red)" size="1.5rem" />
          </ActionButton>
        </Actions>

        <TagWrapper>
          {tags.map(tag => (
            <Tag key={title + tag}>{tag}</Tag>
          ))}
        </TagWrapper>
      </Content>
    </Container>
  )
}
