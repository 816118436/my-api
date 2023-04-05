import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/users.routes'
import { vendorRouter } from '@vendor/http/vendor.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá Dev!' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)
routes.use('/vendor', vendorRouter)

export { routes }
