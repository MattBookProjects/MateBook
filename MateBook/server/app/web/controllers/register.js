import validators from '../../utils/validators.js';;
import registerService from '../../services/register.service.js';

export default async function register(req, res){
    let username, password, first_name, last_name;
    try {
        username = validators.validateStringInput(req.body.username);
        password = validators.validateStringInput(req.body.password);
        first_name = validators.validateStringInput(req.body.first_name);
        last_name = validators.validateStringInput(req.body.last_name);
    }
    catch {
        res.status(400).json({message: 'Invalid input'});
        return;
    }
    try {
        await registerService.register(username, password, first_name, last_name);
        res.status(201);
    } catch (err) {
        res.status(err.status).json({message: err.message})
    }
}
   
    

