import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class UserModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          unique:true,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        mno: {
          type: Number,
          unique:true,
          required: true
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('employee', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('employee');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('employee');
  }
}

export default UserModel;
