import {executeQuery} from '../../config/db';

const getAllPersons = async (req, res)=> {
    let personsData = await executeQuery('select * from persons', [])
    res.send(personsData);
}

export {getAllPersons};
