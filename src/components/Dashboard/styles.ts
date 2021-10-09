import styled from 'styled-components'

export const Container = styled.main`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 2rem;
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Search = styled.form`
  max-width: 1140px;
  margin: 2rem auto;
  border-bottom: 1px solid var(--blue);
  display: flex;
`
export const SearchInput = styled.input`
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border: none;
  width: 100%;
  outline: none;
  background: transparent;
`
