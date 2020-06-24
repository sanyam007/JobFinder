import axios from 'axios';
import qs from 'qs';
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOB } from './types';

//indeed api url and publisher in job query param
const JOB_ROOT_URL = 'https://api.adzuna.com/v1/api/jobs/in/search/1?';
const JOB_QUERY_PARAM = {
    app_id: 'e217260e',
    app_key: 'ae8e94930af9d087426a3f4298f199a6',
    distance: 10,
    what: 'react'
}
const buildJobUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAM, where: zip });
    //console.log(`${JOB_ROOT_URL}${query}`);
    return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let data1 = await axios.get('https://geocode.xyz/' + region.latitude + ',' + region.longitude + '?geoit=json');
        const url = buildJobUrl(data1.data.postal);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
        //console.log(data);

    } catch (e) {
        console.log(e);
    }

};


export const clearLikedJob = () => {
    return { type: CLEAR_LIKED_JOB }
};


export const likeJob = (job) => {

    return {
        payload: job,
        type: LIKE_JOB
    };
};