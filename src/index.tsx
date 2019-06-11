import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ServiceContainer, ServiceProvider } from './ServiceContext';
import configureServices from './serviceConfiguration';

const serviceContainer = new ServiceContainer();
configureServices(serviceContainer);

const app = (
    <ServiceProvider value={serviceContainer}>
        <App />
    </ServiceProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
