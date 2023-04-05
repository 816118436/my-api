import { RefreshToken } from '@users/entities/RefreshToken'

export type CreateRefreshTokenDTO = {
  user_id: string
  token: string
  valid: boolean
  expires: Date
}

export interface IRefreshTokenRepository {
  create({
    user_id,
    token,
    valid,
    expires,
  }: CreateRefreshTokenDTO): Promise<RefreshToken>
  findByToken(token: string): Promise<RefreshToken | null>
  invalidate(refresh_token: RefreshToken): Promise<void>
}
