import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'
import { CreateVendorController } from '@vendor/useCases/createBusinessPartner/CreateVendorController'

const vendorRouter = Router()
const createVendorController = container.resolve(CreateVendorController)

vendorRouter.use(isAuthenticated)

vendorRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.string().required(),
    },
  }),
  (request, response) => {
    return createVendorController.handle(request, response)
  },
)

// usersRouter.get(
//   '/',
//   isAuthenticated,
//   celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//       page: Joi.number(),
//       limit: Joi.number(),
//     }),
//   }),
//   (request, response) => {
//     return listUserController.handle(request, response)
//   },
// )

export { vendorRouter }
