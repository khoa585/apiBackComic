import express from 'express';
import comicRouter from './comic/ControllerComic';
import categoryRouter from './category/ControllerCategory';
const router = express.Router();
router.use("/comic",comicRouter);
router.use("/category",categoryRouter);
export default router ;