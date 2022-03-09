import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



class SocialpostService extends Service {
    constructor(model) {
        super(model);
        this.like = this.like.bind(this);
    

    }

    async like(data) {
        try {
            const post = await this.model.findById(data.id);
            if (!post.likes.includes(data.body.userId)) {
                await this.model.updateOne({ $push: { likes: data.body.userId } });
                return {
                    error: false,
                    statusCode: 200,
                    error: ' The post has been like'
                };
            }
            else {
                await this.model.updateOne({ $pull: { likes: data.body.userId } });
                return {
                    error: false,
                    statusCode: 200,
                    error: ' The post has been dislike '
                };
            }

        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                error: 'Server Error'
            };
        }
    }


}



export default SocialpostService;
