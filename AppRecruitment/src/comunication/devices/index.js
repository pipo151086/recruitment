import { fetchPostService } from '../handlers'
import defaultUrl from '../../settings'

const deviceUrl = `${defaultUrl}Device/`;

export const GetAll = async (args) => await fetchPostService('get', `${deviceUrl}GetAll`, args);

export const GetConected = async (args) => await fetchPostService('get', `${deviceUrl}GetConected`, args);

export const GetDisconected = async (args) => await fetchPostService('get', `${deviceUrl}GetDisconected`, args);

export const GetLocationParentLocation = async (loc_parLoc) => await fetchPostService('get', `${deviceUrl}GetLocationParentLocation?loc_parLoc=${loc_parLoc}`, args);

export const Add = async (deviceDto) => await fetchPostService('post', `${deviceUrl}Add`, deviceDto);

export const Edit = async (deviceDto) => await fetchPostService('post', `${deviceUrl}Edit`, deviceDto);