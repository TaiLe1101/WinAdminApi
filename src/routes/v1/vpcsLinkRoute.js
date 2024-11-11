import express from "express";
import { vpcsLinkController } from "~/controllers/vpcsLinkController";

const Router = express.Router();

// Route để lấy danh sách VpcsLink
Router.route("/").get(vpcsLinkController.index);

Router.route("/redirect/:slug").get(vpcsLinkController.redirect);

// Route để tạo VpcsLink mới
Router.route("/create").post(vpcsLinkController.create);

Router.route("/:id").get(vpcsLinkController.show);

// Route để cập nhật VpcsLink theo ID
Router.route("/:id").put(vpcsLinkController.update);

// Route để xóa VpcsLink theo ID
Router.route("/:id").delete(vpcsLinkController.delete);

export const vpcsLinkRoute = Router;
