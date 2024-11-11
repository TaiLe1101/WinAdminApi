import { StatusCodes } from "http-status-codes";
import { vpcsLinkService } from "~/services/vpcsLinkService";

export const vpcsLinkController = {
  async index(req, res, next) {
    try {
      const data = await vpcsLinkService.index();
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = await vpcsLinkService.create(req.body);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.CREATED,
        message: "Created",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    const { id } = req.params; // Lấy id từ params
    try {
      const data = await vpcsLinkService.show(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params; // Lấy id từ params
    try {
      const data = await vpcsLinkService.update(id, req.body);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params; // Lấy id từ params
    try {
      await vpcsLinkService.delete(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.NO_CONTENT,
        message: "Deleted",
      });
    } catch (error) {
      next(error);
    }
  },

  async redirect(req, res, next) {
    const { slug } = req.params; // Lấy id từ params
    try {
      const data = await vpcsLinkService.redirect(slug);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Redirect",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
