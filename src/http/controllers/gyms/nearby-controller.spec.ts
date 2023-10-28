import request from 'supertest';
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { title } from 'process';

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  
  it("should be able list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "WMX Gym",
        description: "Some description",
        phone: "11999999",
        latitude: -19.8799342,
        longitude: -47.4392362
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Olimpica Gym",
        description: "Some description",
        phone: "11999999",
        latitude: -19.7703889,
        longitude: -47.9376458
      })
    
    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -19.8799342,
        longitude: -47.4392362
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "WMX Gym"
      })
    ])
  })
})