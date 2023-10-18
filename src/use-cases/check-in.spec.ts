import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepostirory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepostirory
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepostirory()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'WMX',
      description: '',
      phone: '',
      latitude: -19.8799342,
      longitude: -47.4392362
    })

    vi.useFakeTimers()
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
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
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

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Omplica Fitness',
      description: '',
      phone: '',
      latitude: new Decimal(-19.8884657),
      longitude: new Decimal(-47.3537668)
    })
    
    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -19.8799342,
      userLongitude: -47.4392362,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})