import Controller from '../controllers/SocialUserController';

export default (router) => {
    router.post(`/api/Socialuser/login`, Controller.login);
    router.post(`/api/Socialuser/signup`, Controller.signup);

    // follow unfollw
    router.post(`/api/Socialuser/:id/follow`, Controller.follow);
    router.post(`/api/Socialuser/:id/unfollow`, Controller.unfollow);

 


    router.get(`/api/Socialuser`, Controller.getAll);
    router.post(`/api/Socialuser`, Controller.insert);
    router.get(`/api/Socialuser/:id`, Controller.get);
    router.put(`/api/Socialuser/:id`, Controller.update);
    router.delete(`/api/Socialuser/:id`, Controller.delete);
};
