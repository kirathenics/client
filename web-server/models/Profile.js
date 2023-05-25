import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    profileLink: {
        type: String,
        required: true,
        unique: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        default: 'Не определен',
    },
    department: {
        type: String,
        default: 'Не определена',
    },
    title: {
        type: String,
        default: 'Не определено',
    },
    cited: {
        type: Number,
        default: 0,
    },
    hIndex: {
        type: Number,
        default: 0,
    },
    i10Index: {
        type: Number,
        default: 0,
    },
    citationArray: [
        {
            year: {
                type: Number,
                default: 0,
            },
            cited: {
                type: Number,
                default: 0,
            }
        }
    ],
}, { collection: 'profiles' })

export default mongoose.model('ProfileSchema', ProfileSchema)