const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This is Invalid Id or Not Found");
  }
};
module.exports = validateMongoDbId;
