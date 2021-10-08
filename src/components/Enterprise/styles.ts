import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1140px;
  margin: 1rem auto;
  padding: 0 2rem;
`

export const Content = styled.div`
  display: flex;
  background: var(--white);
  justify-content: space-between;
  border-radius: 0.5rem;
  height: 7.125rem;
  box-shadow: 0 2px 4px 0 #302e450f;
  position: relative;
`

export const Tag = styled.div`
  border-radius: 4.5rem;
  border: 1px solid var(--blue);
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  margin: 0.5rem;
`

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  justify-content: space-between;
`

export const Title = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  max-width: 650px;
`

export const Address = styled.h5`
  font-size: 0.75rem;
  font-weight: 400;
`

export const Actions = styled.div`
  position: absolute;
  right: 35%;
  top: 35%;
`
export const ActionButton = styled.button`
  background: inherit;
  border: none;
  margin: 0.5rem;
`
