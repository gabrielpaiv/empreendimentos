import { useState } from 'react'
import Modal from 'react-modal'
import { api, viacep } from '../../services/api'
import { EnterpriseType, ViacepResponse } from '../../types/enterprise'
import { Button } from '../Button'
import { ButtonWrapper, Info, Input, Selection, Title } from './styles'

interface AddModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function AddModal({ isOpen, onRequestClose }: AddModalProps) {
  const [status, setStatus] = useState('Lançamento')
  const [purpose, setPurpose] = useState('Residencial')
  const [name, setName] = useState('')
  const [CEP, setCEP] = useState('')
  const [address, setAddress] = useState<ViacepResponse>({} as ViacepResponse)
  const [number, setNumber] = useState('')

  async function handleCEPChange(cep: string) {
    const cepR = cep.replace(/[^0-9]/g, '')
    if (cepR.length !== 8) {
      return
    }

    try {
      const response = await viacep.get<ViacepResponse>(`${cepR}/json`)
      if (response.data?.erro) {
        console.log('putz')
        throw new Error()
      }
      setAddress(response.data)
    } catch (error) {
      console.log
    }
  }

  async function handleSubmit() {
    const newEnterprise: EnterpriseType = {
      id: String(new Date().getTime()),
      name,
      purpose,
      status,
      address: {
        cep: address.cep,
        city: address.localidade,
        street: address.logradouro,
        district: address.bairro,
        number,
        state: address.uf
      }
    }
    await api.post('enterprises', newEnterprise).catch(err => console.log(err))
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Title>Informações</Title>
      <Selection value={status} onChange={e => setStatus(e.target.value)}>
        <option value="Lançamento">Lançamento</option>
        <option value="Breve lançamento">Breve lançamento</option>
        <option value="Em Obras">Em Obras</option>
        <option value="Pronto pra morar">Pronto pra morar</option>
      </Selection>

      <Input
        placeholder="Nome do empreendimento"
        onChange={e => setName(e.target.value)}
      />

      <Selection value={purpose} onChange={e => setPurpose(e.target.value)}>
        <option value="Residencial">Residencial</option>
        <option value="Comercial">Comercial</option>
      </Selection>

      <Input
        placeholder="CEP"
        type="text"
        pattern="^\d{5}-\d{3}$"
        onBlur={e => handleCEPChange(e.target.value)}
      />

      <Info>
        {address.logradouro}
        <br />
        {address.bairro}
        <br />
        {address.localidade}
        <br />
        {address.uf}
      </Info>

      <Input
        type="text"
        placeholder="Número"
        onChange={e => setNumber(e.target.value)}
      />

      <ButtonWrapper>
        <Button title="Cadastrar" action={handleSubmit} />
      </ButtonWrapper>
    </Modal>
  )
}
