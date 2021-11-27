const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    num_eps: {
        type: String,
        default: ''
    },
    year: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    qualidade: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    source: {
        type: String,
        default: ''
    },
    audio: {
        type: String,
        required: true
    },
    tradutor: {
        type: String,
        default: ''
    },
    typesetter: {
        type: String,
        default: ''
    },
    encoder: {
        type: String,
        default: ''
    },
    quality_checker: {
        type: String,
        default: ''
    },
    karaoke: {
        type: String,
        default: ''
    },
    revisor: {
        type: String,
        default: ''
    },
    timer: {
        type: String,
        default: ''
    },
    logo_creator: {
        type: String,
        default: ''
    },
    eps: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        required: true
    },
    batch_link: {
        Type: String,
        default: ''
    },
    classification: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('project', ProjectSchema);
