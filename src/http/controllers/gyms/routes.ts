import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/./middlewares/verify-jwt';
import { serach } from './search-controller';
import { nearby } from './nearby-controller';
import { create } from './create-controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', serach)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}