import { Router } from "express";
import auctorioRouter from "./auctorio.js";
import blogRouter from "./blog.js";
import contactRouter from "./contact.js";

const v1Router = Router();

v1Router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "electroria-api",
    version: 1,
    timestamp: new Date().toISOString(),
  });
});

v1Router.use("/blog", blogRouter);
v1Router.use("/contact", contactRouter);
v1Router.use("/auctorio", auctorioRouter);

export default v1Router;
