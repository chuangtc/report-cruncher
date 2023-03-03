import {Observable} from 'rxjs'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export const axiosObservable = <T>(config: AxiosRequestConfig): Observable<T> => {
    return new Observable((observer) => {
        axios(config)
            .then((response: AxiosResponse<T>) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error);
            });
    });
}
