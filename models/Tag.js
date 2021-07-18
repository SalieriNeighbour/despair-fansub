const mongoose = require('mongoose');
const Post = require('./Post');

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    posts: {
        type: Array,
        default: []
    }
});

TagSchema.static('findOneOrCreate', async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);

    return one || this.create(doc);
});

module.exports = mongoose.model('tag', TagSchema);
