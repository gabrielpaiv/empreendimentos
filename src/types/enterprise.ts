export type Address = {
  district: string
  city: string
  state: string
  street: string
  number: string
  cep: string
}

export type Enterprise = {
  _id: string
  name: string
  status: string
  purpose: string
  ri_number: string
  address: Address
}
