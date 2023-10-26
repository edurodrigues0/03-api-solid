import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/./middlewares/verify-jwt';
import { create } from './create-controllers';
import { validate } from './validate-controllers';
import { history } from './history-controllers';
import { metrics } from './metrics-controllers';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymsId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}