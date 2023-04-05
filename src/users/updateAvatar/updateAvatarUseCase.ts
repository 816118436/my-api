import { inject, injectable } from 'tsyringe'
import path from 'node:path'
import fs from 'node:fs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import uploadConfig from '@config/upload'

export type UpdateAvatarDTO = {
  userId: string
  avatarFileName: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, avatarFileName }: UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFileName
    return this.usersRepository.save(user)
  }
}
