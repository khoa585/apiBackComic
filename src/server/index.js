import express from "express";
import comicRouter from "./comic/ControllerComic";
import categoryRouter from "./category/ControllerCategory";
import chapterRouter from "./chapter/ControllerChapter";
import userRouter from "./user/ControllerUser";
import commentRouter from "./comments/ControllerComment";

const router = express.Router();
router.use("/comic", comicRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/chapter", chapterRouter);
router.use("/comment", commentRouter);
export default router;
