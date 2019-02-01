import axios from 'axios';
import {API_ENDPOINT} from 'aliasConstants';

const axiosInstance = axios.create({
  baseURL: '/mock/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const axiosTestInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export async function getWidgets(type, filters = {}) {
  let query = [];
  if (filters) {
    Object.keys(filters).map((key) => {
      return query.push(`${key}=${filters[key]}`);
    });

    if (query.length) {
      query.join('&');
    }
  }

  return axiosTestInstance.get(`indicator/`).then((avail) => {
    let requests = [];
    avail.data.map((item) => {
      return requests.push(axiosTestInstance.get(`indicator/${item.id}?${query.join('&')}&type=${item.type}`));
    });

    return axios.all(requests).then(response => {
      return response;
    }).catch((e) => {
      console.log(e);
    });
  });

  // return axiosInstance.get(`api-avail-widgets.json`).then((avail) => {
  //   let requests = [];
  //   avail.data.map((item) => {
  //     return requests.push(axiosInstance.get(`api-widget-${item.id}.json`))
  //   });
  //
  //   return axios.all(requests)
  //     .then(response => {
  //       return response;
  //     });
  // });
}

export async function getPerson(id) {
  console.log(`getPerson(${id})`);
  return axiosInstance.get(`persons.json?person=${id}`);
}

/**
 *
 * @return {Promise<AxiosPromise<any>>}
 */
export async function getMRFList() {
  // return axiosInstance.get(`api-mrf.json`);
  return axiosTestInstance.get(`mrf/`);
}