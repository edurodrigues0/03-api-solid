import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: "WMX",
      description: null,
      phone: null,
      latitude:-19.8799342,
      longitude: 47.4392362
    })

    await gymsRepository.create({
      title: 'Olimpica fitness',
      description: null,
      phone: null,
      latitude:-19.8799342,
      longitude: 47.4392362
    })
    
    const { gyms } = await sut.execute({
      query: 'WMX',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "WMX" }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `WMX GYM ${i}`,
        description: null,
        phone: null,
        latitude:-19.8799342,
        longitude: 47.4392362
      })
    }

    const { gyms } = await sut.execute({
      query: 'WMX',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'WMX GYM 21' }),
      expect.objectContaining({ title: 'WMX GYM 22' })
    ])
  })
})