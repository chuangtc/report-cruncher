const LOCAL_STORAGE_KEY = 'report_cruncher__frontend__'

const makeAbsoluteKey = (key: string): string => {
  return (LOCAL_STORAGE_KEY + key).toUpperCase()
}

export const getFromLocalStorage = (key: string): any => {
  const value = window.localStorage.getItem(makeAbsoluteKey(key))
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

export const setInLocalStorage = (key: string, value: any): void => {
  window.localStorage.setItem(makeAbsoluteKey(key), JSON.stringify(value))
}

export const removeFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(makeAbsoluteKey(key))
}
