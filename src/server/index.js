import express from "express";
import comicRouter from "./comic/ControllerComic";
import categoryRouter from "./category/ControllerCategory";
import chapterRouter from "./chapter/ControllerChapter";

const router = express.Router();
router.use("/comic", comicRouter);
router.use("/category", categoryRouter);
router.use("/chapter", chapterRouter);
export default router;
