import nc from 'next-connect';
import {getAllPersons} from '../../../controller/persons/persons'

const handler = nc();
handler.get(getAllPersons);

export default handler;