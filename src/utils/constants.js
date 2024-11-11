import { env } from "~/config/environment";

export const __PROD__ = env.BUILD_MODE === "production";

export const COOKIE_REFRESH_TOKEN_KEY = "rft";

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;

export const OBJECT_ID_RULE_MESSAGE =
  "Đoạn chuỗi này không phải kiểu ký tự ObjectId";

export const JWT_RULE =
  /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

export const JWT_RULE_MESSAGE = "Mã Token của bạn không chính xác";

export const WHITELIST_DOMAINS = ["http://localhost:5173"];
