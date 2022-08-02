const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { bool } = require('sharp/lib/is')


const userSchema = new mongoose.Schema({
    first_name:{
       type:String,
       required:true,
       trim:true
    },
    last_name:{
        type:String,
        trim:true
     },
     email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    username:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    avatar:{
     type:Buffer,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
        timestamps:true
    }
)




userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thediaryman')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
