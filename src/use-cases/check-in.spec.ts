import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepostirory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepostirory
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepostirory()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()


    gymsRepository.items.push({
      id: 'gym-01',
      title: 'WMX',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0)
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 9, 14, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2023, 9, 14, 8, 0, 0))
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })

    await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 9, 14, 8, 0, 0))
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })

    vi.setSystemTime(new Date(2023, 9, 15, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})