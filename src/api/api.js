import axios from 'axios';

const BASE = '';

export var reqLogin = async () => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getSmallChart',
    //data: {'username': username, 'password': password},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};
export var reqSessionChart = async (type,starttime,endtime) => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getSessionChart',
    data: {'type': type, 'starttime': starttime,'endtime': endtime},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};

export var reqWarning = async () => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getWarning',
    //data: {'username': username, 'password': password},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};

export var reqRanking = async () => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getRanking',
    //data: {'username': username, 'password': password},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};

export var reqPercentChart = async () => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getPercentChart',
    //data: {'username': username, 'password': password},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};

export var reqMap = async () => {
  let result = await axios({
    method: 'post',
    url: BASE + '/dashboard/getMap',
    //data: {'username': username, 'password': password},
  })
    .then(function (response){
      return response.data;
    })
    .catch(function (response) {});
  console.log(result);
  return result;
};
