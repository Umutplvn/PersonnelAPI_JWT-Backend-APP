"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
const passwordEncrypt = require('../helpers/passwordEncrypt')

const PersonnelSchema = new mongoose.Schema({

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',  //iliski kurulan model ismi
        required: true,
    },

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password),   // helperden cagirdigimiz fonk sayesinde sifreyi encrypt ettik
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    phone: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: (email) => (email.includes('@') && email.includes('.'))
    },

    title: {
        type: String,
        trim: true,
        required: true,
    },

    salary: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        trim: true,
        default: null
    },

    isActive: {     // personel isten cikti mi calisiyor mu- calismiyorsa sisteme erisemez
        type: Boolean,
        default: true,
    },

    isAdmin: {  // tam yetki
        type: Boolean,
        default: false,
    },

    isLead: {   // sadece kendi departmanina erisebilir
        type: Boolean,
        default: false,
    },

    startedAt: {
        type: Date,
        default: Date.now()
    },

}, { collection: 'personnels', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Personnel', PersonnelSchema)