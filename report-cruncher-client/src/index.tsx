import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';

import {Provider} from 'react-redux'
import {store} from './store/store'
import {HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {RouteByEventChanger} from "./components/RouteByEventChanger/RouteByEventChanger.component";
import {ThemeProvider} from "./ThemeProvider/ThemeProvider.component";
import { AppCruncher} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense fallback={<></>}>
        <HashRouter>
            <RouteByEventChanger/>
            <Provider store={store}>
                <ThemeProvider>
                    <AppCruncher/>
                </ThemeProvider>
            </Provider>
        </HashRouter>
    </Suspense>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
