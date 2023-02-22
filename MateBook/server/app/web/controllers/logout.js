import logoutService from '../../services/logout.service.js';

export default async function logout(req, res){
    const user_id = req.body.auth.user_id;
    const session_token = req.body.auth.session_token;
    try {
        await logoutService.logout(user_id, session_token);
        res.status(200).json({});
    } catch (err) {
        res.status(err.status).json({message: err.message});
    }
}