    import mongoose from "mongoose";
    const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    });

    // //hash password before saving
    // UserSchema.pre("save", async function (next) {
    // if (this.isModified("password")) {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
    // next();
    // });

   const User = mongoose.model("User", UserSchema);
   export default User;
