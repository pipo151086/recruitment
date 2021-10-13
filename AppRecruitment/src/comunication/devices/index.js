import { fetchPostService } from '../handlers'
import defaultUrl from '../../settings'

const securityUrl = `${defaultUrl}Device/`;

export const GetAll = async (args) => await fetchPostService('get', `${securityUrl}GetAll`, args);


