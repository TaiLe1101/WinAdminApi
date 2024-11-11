import express from "express";
import { vpcsLinkRoute } from "./vpcsLinkRoute";

const Router = express.Router();

/* PRODUCT ROUTE */
Router.use("/vpcs-link", vpcsLinkRoute);

export const APIsV1 = Router;
