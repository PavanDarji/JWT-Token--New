import Controller from './Controller';
import SocialUser from '../models/SocialUser';
import SocialUserService from '../services/SocialUserService';

const socialService = new SocialUserService(new SocialUser().getInstance());

class SocialUserController extends Controller {
  constructor(service) {
    super(service);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);

    // this.signupp = this.signupp.bind(this);
  }

  async signup(req, res) {
    const response = await this.service.signup(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async login(req, res) {
    const response = await this.service.login(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async follow(req, res) {
      const data = {
        id:req.params.id,
        body:req.body
      }
    const response = await this.service.follow(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async unfollow(req, res) {
    const data = {
      id:req.params.id,
      body:req.body
    }
  const response = await this.service.unfollow(data);
  if (response.error) return res.status(response.statusCode).send(response);
  return res.status(response.statusCode).send(response);
}


}

export default new SocialUserController(socialService);
