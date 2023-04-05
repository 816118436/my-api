import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'
import { Vendor } from '../entities/Vendor'
import {
  CreateVendorDTO,
  IVendorRepository,
  PaginateParams,
  VendorPaginateProperties,
} from './IVendorRepository'

export class VendorRepository implements IVendorRepository {
  private repository: Repository<Vendor>

  constructor() {
    this.repository = dataSource.getRepository(Vendor)
  }
  async create({ name, email, cnpj }: CreateVendorDTO): Promise<Vendor> {
    const vendor = this.repository.create({
      name,
      email,
      cnpj,
    })
    return this.repository.save(vendor)
  }

  async save(vendor: Vendor): Promise<Vendor> {
    return this.repository.save(vendor)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<VendorPaginateProperties> {
    const [vendor, count] = await this.repository
      .createQueryBuilder('bp')
      .leftJoinAndSelect('bp.vendor', 'vendor')
      .skip(skip)
      .take(take)
      .getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: vendor,
    }
    return result
  }

  async findById(id: string): Promise<Vendor | null> {
    return this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<Vendor | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    return this.repository.findOneBy({ email })
  }

  async findByCnpj(cnpj: string): Promise<Vendor | null> {
    return this.repository.findOneBy({ cnpj })
  }

  async delete(vendor: Vendor): Promise<void> {
    await this.repository.remove(vendor)
  }
}
