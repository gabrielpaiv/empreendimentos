import { Address } from '../types/enterprise'

export function formatAddress({ district, street, city, number }: Address) {
  return `${street}, ${number} - ${district}, ${city}`
}
