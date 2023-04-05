import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVendorUseCase } from './CreateVendorUseCase'

export class CreateVendorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createVendorUseCase = container.resolve(CreateVendorUseCase)
    const { name, email, cnpj } = request.body
    const vendor = await createVendorUseCase.execute({
      name,
      email,
      cnpj,
    })
    return response.status(201).json(instanceToInstance(vendor))
  }
}
