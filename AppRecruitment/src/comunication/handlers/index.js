import { fetch } from "react-native-ssl-pinning";
//import { encodeObject } from "../utils/common";
//import signOutNotAuthorized from '@/utils/unauthorized';

const communication_timeout = 240 * 1000; //milliseconds
const certs = ["cedr5"];

export const fetchPostService = async (
    met,
    url,
    body,
    isFormData,
    timeoutInMs
) => {
    try {
        if (met.toLowerCase() === "get" && body !== undefined) {
            const temp = encodeObject(body);
            url = url + "?" + temp;
        }
        debugger;
        let jwtToken = "";
        if (
            this.globalSession != undefined &&
            this.globalSession.session != undefined &&
            this.globalSession.session.jwt !== undefined
        )

            jwtToken = "Bearer " + this.globalSession.session.jwt.accessToken;

        return await fetch(url, {
            method: met.toUpperCase(),
            timeoutInterval: timeoutInMs ? timeoutInMs : communication_timeout,
            body: isFormData
                ? { formData: body }
                : met.toLowerCase() === "get"
                    ? undefined
                    : JSON.stringify(body),
            sslPinning: {
                certs: certs,
            },
            headers: {
                Accept: "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                e_platform: "mobile",
                Authorization: jwtToken,
                "content-type": isFormData
                    ? "multipart/form-data; charset=UTF-8"
                    : "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log("fetchError=>: ", error);
                let defaultError = {
                    state: false,
                    message: "TimeOut",
                    code: "999999",
                };
                if (error === "timeout" || error?.status === 504)
                    return defaultError;
                if (error.status === 400) return error.json();
                if (error.status === 401) {
                /*    if (signOutNotAuthorized)
                        signOutNotAuthorized();
                    defaultError.message = "UnAuthorized";*/
                    return Promise.reject(error);
                }
                else return Promise.reject(error);
            });
    } catch (err) {
        throw err;
    }
};


export const encodeObject = params => {
    let query = [];
    for (let key in params) {
      let val = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      query.push(val);
    }
    return query.join("&");
  };