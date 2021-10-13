import { fetchPostService } from '../handlers'
import defaultUrl from '../../settings'

const securityUrl = `${defaultUrl}security/`;

export const Auth = async (args) => await fetchPostService('post', `${securityUrl}Login`, args);


