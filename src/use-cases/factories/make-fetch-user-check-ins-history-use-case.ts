import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-in-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const usecase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return usecase
}
