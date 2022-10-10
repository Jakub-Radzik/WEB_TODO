const { model, Schema } = require('mongoose');
const models = {};
const schemas = {
  user: {
    username: String,
    password: String,
  },
};

const createModels = () => {
  for (const key in schemas) {
    models[key] = model(
      key[0].toUpperCase() + key.slice(1),
      new Schema(schemas[key])
    );
  }
};

module.exports = {
  createModels,
  models,
};
