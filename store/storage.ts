import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("AsyncStorage 불러오기 실패", e);
    return null;
  }
};

export const setAsyncStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("AsyncStorage 저장 실패", e);
  }
};
