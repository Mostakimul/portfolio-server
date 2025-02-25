import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { experienceRoutes } from '../modules/experience/experience.route';
import { projectRoutes } from '../modules/project/project.route';
import { skillRoutes } from '../modules/skill/skill.route';
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
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/skills',
    route: skillRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
