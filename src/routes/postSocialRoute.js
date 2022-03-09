import Controller from '../controllers/SocialpostController';

export default (router) => {
    

    // like dislike
    router.put(`/api/Socialpost/:id/like`, Controller.like);
 

 


    router.get(`/api/Socialpost`, Controller.getAll);
    router.post(`/api/Socialpost`, Controller.insert);
    router.get(`/api/Socialpost/:id`, Controller.get);
    router.put(`/api/Socialpost/:id`, Controller.update);
    router.delete(`/api/Socialpost/:id`, Controller.delete);
};
