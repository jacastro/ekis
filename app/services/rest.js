import axios from 'axios';

export const get = async(url, params) => {
  try {
    console.log(`GET: https://uade-sem-int-tpo-api.herokuapp.com/${url}`)
    const result = await axios.get(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`,{ params });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export const del = async(url, params) => {
  try {
    console.log(`DELETE: https://uade-sem-int-tpo-api.herokuapp.com/${url}`)
    const result = await axios.delete(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`,{ params });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export const post = async(url, params) => {
  try {
    console.log(`POST: https://uade-sem-int-tpo-api.herokuapp.com/${url}`, params)
    const result = await axios.post(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`, params);
    return result.data;
  } catch (error) {
    throw Error(error)
  }
}

export const put = async(url, params) => {
  try {
    console.log(`PUT: https://uade-sem-int-tpo-api.herokuapp.com/${url}`, params)
    const result = await axios.put(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`, params);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}