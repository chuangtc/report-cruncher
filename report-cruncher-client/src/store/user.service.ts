import {Observable} from "rxjs";

const getUser = () => {
    return new Observable((observer) => {
        observer.next({name: 'Abdel'})
    },)
}

export const userServiceFunctions = {
    getUser,
}
