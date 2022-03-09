import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class SocialPost {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema({
            userId: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                max: 500
            },
            img: {
                type: String
            },
            likes: {
                type: Array,
                default: []
            },
        
        },
            { timestamps: true }
        )
        schema.plugin(uniqueValidator);
        mongoose.model('SocialPost', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('SocialPost');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('SocialPost');
    }
}

export default SocialPost;
