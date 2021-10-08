import { ActionButton } from './styles'

interface ButtonProps {
  title: string
  action: () => void
}

export function Button({ action, title }: ButtonProps) {
  return <ActionButton onClick={action}>{title}</ActionButton>
}
