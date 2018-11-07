import { AsyncStorage } from "react-native"

const routers = {
  preceptor: "PreceptorApp",
  student: "StudentApp",
  teacher: "TeacherApp",
}

export const login = async (data) => {
  await AsyncStorage.setItem('userType', data.userType);
  await AsyncStorage.setItem('username', data.username);
  return routers[data.userType];
}

export const getUsername = async () => {
  return await AsyncStorage.getItem('username');
}

export const getUserType = async () => {
  return await AsyncStorage.getItem('userType');
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