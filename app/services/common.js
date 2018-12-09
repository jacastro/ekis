import { AsyncStorage } from "react-native"
import { post, get } from './rest';

const routers = {
  Manager: "PreceptorApp",
  Student: "StudentApp",
  Teacher: "TeacherApp",
}

export const login = (data) => {
  return post(`login`, {
    dni: data.username,
  }).then(async user => {
    await AsyncStorage.setItem('userType', user.type);
    await AsyncStorage.setItem('username', user.dni);
    await AsyncStorage.setItem('user', JSON.stringify({
      id: user.id,
      dni: user.dni,
      first_name: user.first_name,
      last_name: user.last_name,
      type: user.type,
      email: user.email,
      course: user.course
    }));
    return routers[user.type];
  })
}

export const getUsername = async () => {
  return await AsyncStorage.getItem('username');
}

export const getUserId = async () => {
  const user =  await AsyncStorage.getItem('user');
  return user.id;
}

export const getUserType = async () => {
  return await AsyncStorage.getItem('userType');
}

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
}

export const getUserData = async () => {
  const userType = await AsyncStorage.getItem('userType');
  return {
    userType,
    username: await getUsername(),
    router: routers[userType],
  }
}

export const logout = async () => {
  return await AsyncStorage.removeItem('username').then(AsyncStorage.removeItem('userType'));
}

export const getFeedback = async (type) => {
  const user = await getUser();
  return get(`${type}/${user.id}/feedback`);
}