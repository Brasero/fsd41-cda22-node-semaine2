import mongoose from "./index.js";

// {
//     "id": 1,
//     "name": "Bobby",
//     "image": "bob.jpg",
//     "age": 16,
//     "description": "super cat"
// }

const kittenSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    image: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "Super chat"
    }
})

export default mongoose.model('kitten', kittenSchema);