import { fetchPostService } from '../handlers'
import defaultUrl from '../../settings'

const securityUrl = `${defaultUrl}security/`;

export const Auth = async (args) => {
    debugger;
    return await fetchPostService('post', securityUrl, args);
}

