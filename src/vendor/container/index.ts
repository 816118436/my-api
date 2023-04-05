import { IVendorRepository } from '@vendor/repositories/IVendorRepository'
import { VendorRepository } from '@vendor/repositories/VendorRepository'
import { CreateVendorController } from '@vendor/useCases/createBusinessPartner/CreateVendorController'

import { container } from 'tsyringe'

container.registerSingleton<IVendorRepository>(
  'VendorRepository',
  VendorRepository,
)

container.registerSingleton('CreateVendorController', CreateVendorController)
