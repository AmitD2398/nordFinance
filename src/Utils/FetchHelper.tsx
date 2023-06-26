import {ApiUrl} from '../constants/Constant';

const post_params = (params: {}) => {
  var dataToSend: any = params;
  var formBody: any = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

export const fetchUrl = (params: any, urlEndPint: string) => {
  return new Promise(function (myResolve, myReject) {
    // "Producing Code" (May take some time)
    let formBody = post_params(params);
    fetch(ApiUrl + urlEndPint, {
      method: 'POST', //Request Type
      body: formBody, //post body
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(' endpoint ==  ', urlEndPint)
        // console.log(' data -   ', responseJson)
        myResolve(responseJson);
      })
      //If response is not in json then in error
      .catch(error => {
        console.log('error endpoint ==  ', urlEndPint);
        console.log('error data --- ', error);
        myReject(error);
      });
  });
};

export const fetchFormData = (
  data: any,
  AccessToken: string,
  urlEndPint: string,
) => {
  // console.log("urlTotal::", ApiUrl + urlEndPint, AccessToken, data);

  return fetch(ApiUrl + urlEndPint, {
    method: 'POST',
    body: data,
  }).then(response => response.json());
  //If response is in json then in success

  // .then((responseJson) => {
  //     responseJson
  //     // if (mount) setScreenLoader(true);
  //     // console.log('KycUpdateResult==== ', responseJson);
  //     // if (responseJson.status === 200) {
  //     // } else if (responseJson.status === 400) {
  //     // } else if (responseJson.status === 603) {
  //     // }

  // }
  // )

  //If response is not in json then in error
  // .catch((error) => {
  //     console.log("ErrorKycUpdate", error);
  // })
};
