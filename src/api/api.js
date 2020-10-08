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
