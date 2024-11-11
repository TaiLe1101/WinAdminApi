import { VpcsLink } from "~/models/vpcsLink";
import { VpcsLinkChild } from "~/models/vpcsLinkChild";
import ApiError from "~/utils/ApiError";

export const vpcsLinkService = {
  async index() {
    try {
      // Lấy tất cả các VpcsLink
      const vpcsLinks = await VpcsLink.find();

      // Tạo một danh sách các VpcsLink với các đối tượng con tương ứng
      const result = await Promise.all(
        vpcsLinks.map(async (link) => {
          const children = await VpcsLinkChild.find({ vpcsLinkId: link._id });
          return {
            ...link.toObject(), // Chuyển đổi đối tượng Mongoose thành đối tượng thuần
            children, // Thêm các đối tượng con vào kết quả
          };
        })
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async create(reqBody) {
    try {
      var vpcs = await VpcsLink.create({
        slug: reqBody.slug,
        domain: reqBody.domain,
        social: reqBody.social,
        variantUrl: reqBody.variantUrl,
      });

      const result = await vpcs.save();

      reqBody.destinationUrl.forEach(async (url) => {
        var vpcsChild = await VpcsLinkChild.create({
          url,
          vpcsLinkId: result._id,
        });

        await vpcsChild.save();
      });
    } catch (error) {
      throw error;
    }
  },

  async show(id) {
    try {
      // Tìm VpcsLink theo id
      const vpcsLink = await VpcsLink.findById(id);
      if (!vpcsLink) {
        throw new ApiError(400, "VpcsLink not found");
      }

      // Tìm các đối tượng con tương ứng
      const children = await VpcsLinkChild.find({ vpcsLinkId: vpcsLink._id });

      // Trả về đối tượng VpcsLink cùng với các đối tượng con
      return {
        ...vpcsLink.toObject(),
        children,
      };
    } catch (error) {
      throw error;
    }
  },

  async update(id, reqBody) {
    try {
      // Cập nhật VpcsLink
      const vpcsLink = await VpcsLink.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
      if (!vpcsLink) {
        throw new ApiError(400, "VpcsLink not found");
      }

      return vpcsLink;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      // Xoá VpcsLink và các đối tượng con tương ứng
      await VpcsLinkChild.deleteMany({ vpcsLinkId: id }); // Xoá các đối tượng con
      const result = await VpcsLink.findByIdAndDelete(id); // Xoá VpcsLink
      if (!result) {
        throw new ApiError(400, "VpcsLink not found");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  async redirect(slug) {
    try {
      // Tìm VpcsLink theo slug
      const vpcsLink = await VpcsLink.findOne({ slug });
      if (!vpcsLink) {
        throw new ApiError(400, "VpcsLink not found");
      }

      // Tìm các đối tượng con tương ứng
      const children = await VpcsLinkChild.find({ vpcsLinkId: vpcsLink._id });

      // Kiểm tra nếu không có children
      if (children.length === 0) {
        throw new ApiError(400, "No children found");
      }

      // Lấy chỉ số child hiện tại
      let currentIndex = await getCurrentIndex(vpcsLink._id);

      // Lấy child hiện tại
      const currentChild = children[currentIndex];

      // Tăng chỉ số cho lần truy cập tiếp theo
      currentIndex = (currentIndex + 1) % children.length; // Quay lại 0 nếu vượt quá số lượng children

      // Cập nhật chỉ số mới vào cơ sở dữ liệu
      await updateCurrentIndex(vpcsLink._id, currentIndex);

      // Tăng visitAmount cho child hiện tại
      currentChild.visitAmount = (currentChild.visitAmount || 0) + 1;
      await currentChild.save(); // Lưu lại child đã cập nhật

      // Trả về đối tượng VpcsLink và mảng children chỉ chứa child hiện tại
      return {
        ...vpcsLink.toObject(), // Chuyển đổi đối tượng Mongoose thành đối tượng thuần
        children: [currentChild], // Trả về mảng children chỉ chứa child hiện tại
      };
    } catch (error) {
      throw error;
    }
  },
};

// Hàm để lấy chỉ số child hiện tại từ VpcsLink
async function getCurrentIndex(vpcsLinkId) {
  const vpcsLink = await VpcsLink.findById(vpcsLinkId);
  if (!vpcsLink) {
    throw new ApiError(400, "VpcsLink not found");
  }
  return vpcsLink.currentChild || 0; // Trả về currentChild hoặc 0 nếu chưa được thiết lập
}

// Hàm để cập nhật chỉ số child hiện tại vào VpcsLink
async function updateCurrentIndex(vpcsLinkId, newIndex) {
  const vpcsLink = await VpcsLink.findById(vpcsLinkId);
  if (!vpcsLink) {
    throw new ApiError(400, "VpcsLink not found");
  }
  vpcsLink.currentChild = newIndex; // Cập nhật currentChild mới
  await vpcsLink.save(); // Lưu lại VpcsLink đã cập nhật
}
