import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IVendorRepository } from '@vendor/repositories/IVendorRepository'
import { Vendor } from '@vendor/entities/Vendor'

export type CreateVendorDTO = {
  name: string
  email: string
  cnpj: string
}

@injectable()
export class CreateVendorUseCase {
  constructor(
    @inject('VendorRepository')
    private vendorRepository: IVendorRepository,
  ) {}

  async execute({ name, email, cnpj }: CreateVendorDTO): Promise<Vendor> {
    const emailExists = await this.vendorRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already in use')
    }
    const cnpjExists = await this.vendorRepository.findByCnpj(cnpj)
    if (cnpjExists) {
      throw new AppError('CNPJ already exists')
    }
    const vendor = await this.vendorRepository.create({
      name,
      email,
      cnpj,
    })
    return vendor
  }
}
