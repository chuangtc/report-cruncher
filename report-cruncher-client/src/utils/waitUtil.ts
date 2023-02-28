import { from, Observable } from 'rxjs'

export const waitFor = (time: number): Observable<void> => {
  return from(timeOutAsPromise(time))
}

export const timeOutAsPromise = (time: number): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, time)
  })
}
