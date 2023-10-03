const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishImageController {
  async delete(req, res) {
    const { filename } = req.params

    const diskStorage = new DiskStorage();
    try {
        await diskStorage.deleteFile(filename);

        const response = { Message: "Image removed." }

        return res.status(200).json(response)
    } catch {
        throw new AppError("Was not possible to remove image!", 500);
    };
  }
}

module.exports = DishImageController