    import mongoose from "mongoose";

    const todoSchema = new mongoose.Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            },
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    });

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

