export type Address = {
  district: string
  city: string
  state: string
  street: string
  number: string
  cep: string
}

export type EnterpriseType = {
  id: string
  name: string
  status: string
  purpose: string
  ri_number?: string
  address: Address
}

export type ViacepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}
