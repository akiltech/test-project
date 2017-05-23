import angular from 'angular';
import 'angular-ui-router';

import './components/navbar';

import { MainCtrl } from './controllers/MainCtrl';


angular.module('nectar', ['ui.router', 'navbar'])
    .controller('mainCtrl', MainCtrl)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: "views/main.html",
            controllerAs: 'ctrl',
            controller: 'mainCtrl',
        });

        $urlRouterProvider.otherwise('/home');
    });


