import requests from './httpService';

const AttributeServices = {
  //   getAllBrand: async ({ type, option, option1 }) => {
  //     return requests.get(
  //       `/attributes?type=${type}&option=${option}&option1=${option1}`
  //     );
  //   },

  getBrand: async (body) => {
    return requests.get('/brand', body);
  },
  getIdBrand: async (id) => {
    return requests.get(`/brand/${id}`)
  },
  addBarnd: async (body) => {
    return requests.post('/brand/add', body);
  },

  updateBrand: async (id, body) => {
    return requests.put(`/brand/${id}`, body);
  },

  deleteBrand: async (body, id) => {
    return requests.delete(`/brand/${id}`, body);
  },

};

export default AttributeServices;
