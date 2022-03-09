import Controller from './Controller';
import SocialPost from '../models/PostModel';
import SocialpostService from '../services/SocialpostService';

const postService = new SocialpostService(new SocialPost().getInstance());

class SocialpostController extends Controller {
    constructor(service) {
        super(service);

        this.like = this.like.bind(this);
      

    }



    async like(req, res) {
        const data = {
            id: req.params.id,
            body: req.body
        }
        const response = await this.service.like(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }



}

export default new SocialpostController(postService);
