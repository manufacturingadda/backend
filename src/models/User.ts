import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

export interface userInterface {
    name: string
    email: string
    password: string
}

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    orgName: {
        type: String,
        required: true,        
    },
    phoneNumber: {
        type: String,
        required: true,
        unique : true,
    },
    gstNumber: {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type: String,
        required: true,
    }
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    next();
  } catch (e: any) {
    next(e);
  }
});

const userModel = model<userInterface>("User", UserSchema)
export default userModel
