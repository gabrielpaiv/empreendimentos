import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { api, viacep } from '../../services/api'
import { EnterpriseType, ViacepResponse } from '../../types/enterprise'
import { Button } from '../Button'
import {
  ButtonWrapper,
  Info,
  Input,
  Selection,
  Title
} from '../AddModal/styles'

interface AddModalProps {
  isOpen: boolean
  onRequestClose: () => void
  data: EnterpriseType
}

export function EditModal({ isOpen, onRequestClose, data }: AddModalProps) {
  const [status, setStatus] = useState(data.status)
  const [purpose, setPurpose] = useState(data.purpose)
  const [name, setName] = useState(data.name)
  const [address, setAddress] = useState<ViacepResponse>({
    bairro: data.address?.district,
    cep: data.address?.cep,
    localidade: data.address?.street,
    logradouro: data.address?.city,
    uf: data.address?.state
  })
  const [number, setNumber] = useState(data.address?.number)

  useEffect(() => {
    setStatus(data.status)
    setPurpose(data.purpose)
    setName(data.name)
    setAddress({
      bairro: data.address.district,
      cep: data.address.cep,
      localidade: data.address.street,
      logradouro: data.address.city,
      uf: data.address.state
    })
    setNumber(data.address.number)
  }, [data])

  async function handleCEPChange(cep: string) {
    const cepR = cep.replace(/[^0-9]/g, '')
    if (cepR.length !== 8) {
      return
    }

    try {
      const response = await viacep.get<ViacepResponse>(`${cepR}/json`)
      if (response.data?.erro) {
        throw new Error()
      }
      setAddress(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit() {
    const updatedEnterprise: EnterpriseType = {
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
    await api
      .put(`enterprises/${data.id}`, updatedEnterprise)
      .catch(err => console.log(err))
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
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Selection value={purpose} onChange={e => setPurpose(e.target.value)}>
        <option value="Residencial">Residencial</option>
        <option value="Comercial">Comercial</option>
      </Selection>

      <Input
        placeholder="CEP"
        type="text"
        value={data.address.cep}
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
        value={number}
        onChange={e => setNumber(e.target.value)}
      />

      <ButtonWrapper>
        <Button title="Editar" action={handleSubmit} />
      </ButtonWrapper>
    </Modal>
  )
}
