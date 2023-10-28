import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able create gym', async () => {
    const { gym } = await sut.execute({
      title: 'WMX',
      description: null,
      phone: null,
      latitude: -19.8799342,
      longitude: -47.4392362,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
