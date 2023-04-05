import { Vendor } from '@vendor/entities/Vendor'

export type CreateVendorDTO = {
  name: string
  email: string
  cnpj: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type VendorPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Vendor[]
}

export interface IVendorRepository {
  create({ name, email, cnpj }: CreateVendorDTO): Promise<Vendor>
  save(vendor: Vendor): Promise<Vendor>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<VendorPaginateProperties>
  findById(id: string): Promise<Vendor | null>
  findByName(name: string): Promise<Vendor | null>
  findByEmail(email: string): Promise<Vendor | null>
  findByCnpj(cnpj: string): Promise<Vendor | null>
  delete(vendor: Vendor): Promise<void>
}
