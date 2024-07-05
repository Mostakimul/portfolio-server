import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { experienceRoutes } from '../modules/experience/experience.route';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/experiences',
    route: experienceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
