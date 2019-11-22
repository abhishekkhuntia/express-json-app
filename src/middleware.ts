// "use strict";var __awaiter=this&&this.__awaiter||function(e,s,a,c){return new(a=a||Promise)(function(t,r){function n(e){try{i(c.next(e))}catch(e){r(e)}}function o(e){try{i(c.throw(e))}catch(e){r(e)}}function i(e){e.done?t(e.value):function(t){return t instanceof a?t:new a(function(e){e(t)})}(e.value).then(n,o)}i((c=c.apply(e,s||[])).next())})},__generator=this&&this.__generator||function(r,n){var o,i,s,e,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=2&t[0]?i.return:t[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[2&t[0],s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(r,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}};exports.__esModule=!0;var fs=require("fs"),path=require("path"),express=require("express"),bodyParser=require("body-parser"),InitMiddleWare=function(){function e(e,t){var a=this;this.app=e,this.cb=t,this.controllers={},this.initializeMiddleWare=function(){return __awaiter(a,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return this.configContent?[4,this.loadControllersMap(path.join(process.cwd(),this.configContent.controllerPath))]:[3,2];case 1:e.sent(),this.cb&&"function"==typeof this.cb&&this.cb(this),this.dynamicRouterMap(),e.label=2;case 2:return[2]}})})},this.dynamicRouterMap=function(){a.configContent&&a.configContent.routes&&Object.keys(a.configContent.routes).forEach(function(e){var i=a.configContent.routes[e],s=a.controllers[i.controller],t=""+a.configContent.basePath+e,r=i.bodyParser?bodyParser.json():function(e,t,r){r()};a.app.use(t,r,function(t,r,n){if(t.method)if(i&&i.methods&&i.methods[t.method]&&i.methods[t.method].methodId&&s[i.methods[t.method].methodId]&&"function"==typeof s[i.methods[t.method].methodId]){var o=s[i.methods[t.method].methodId];i.methods[t.method].secured&&a.securityHandler&&"function"==typeof a.securityHandler?a.securityHandler(t,r,t.headers[a.securityHeader],function(e){e||o(t,r,n)}):o(t,r,n)}else r.status(502).send({status:"error",message:"Handler Mis-matched!"})})})},this.setSecurityHandler=function(e){var t;e&&1==Object.keys(e).length&&(t=Object.keys(e)[0])&&"function"==typeof e[t]?(a.securityHeader=t.toLowerCase(),a.securityHandler=e[t]):(console.error("Error setting the security handler!"),process.exit(1))},this.loadControllersMap=function(c){return __awaiter(a,void 0,void 0,function(){var t=this;return __generator(this,function(e){return[2,new Promise(function(s,a){return __awaiter(t,void 0,void 0,function(){var t,r,n,o,i;return __generator(this,function(e){switch(e.label){case 0:if(!fs.statSync(c).isDirectory())return[3,5];t=fs.readdirSync(path.join(c)),r=0,e.label=1;case 1:return r<t.length?(n=t[r]).match(/\.js$|\.ts$/)?(o=n.replace(/\.js$|\.ts$/,""),[4,Promise.resolve().then(function(){return require(path.join(c,n))})]):[3,3]:[3,4];case 2:i=e.sent(),this.controllers[o]=i,e.label=3;case 3:return r++,[3,1];case 4:s(),e.label=5;case 5:return a("Missing router map"),[2]}})})})]})})},this.configPath=path.join(process.cwd(),"route-map.json"),this.routerInstance=express.Router(),this.loadConfigToMemory(),this.initializeMiddleWare()}return e.prototype.loadConfigToMemory=function(){if(fs.statSync(this.configPath).isFile())try{this.configContent=JSON.parse(fs.readFileSync(this.configPath,"utf-8"))}catch(e){console.error("Error occurred loading config!",e),process.exit(1)}},e}();exports.default=InitMiddleWare;
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
class InitMiddleWare{
    configPath: string;
    srcFolderPath: string;
    configContent: any;
    controllers: any = {};
    routerInstance: any;
    securityHandler: any;
    securityHeader: any;
    
    constructor(private app: express.Application, pathConfig: any, private cb?: Function){
        this.srcFolderPath = pathConfig.basePath;
        this.configPath = path.resolve(this.srcFolderPath, 'route-map.json');
        this.routerInstance = express.Router();
        console.log("ARG PATHS >> ", process.argv);
        this.loadConfigToMemory();
        this.initializeMiddleWare();
    }
    initializeMiddleWare = async() => {
        if(this.configContent){
           await this.loadControllersMap(path.resolve(this.srcFolderPath, this.configContent.controllerPath));
           if(this.cb && typeof(this.cb) == 'function'){
               this.cb(this);
           }
           this.dynamicRouterMap();
        }
    }
    dynamicRouterMap = ()=> {
        if(this.configContent && this.configContent.routes){
            let routes = Object.keys(this.configContent.routes);
            routes.forEach(route => { 
                let routerMap = this.configContent.routes[route],
                routeObj = this.controllers[routerMap.controller],
                finalUrl = `${this.configContent.basePath}${route}`,
                middleWareFunc = routerMap.bodyParser ? bodyParser.json(): (req, res, next)=>{next()},
                methods = Object.keys(routerMap.methods);
                methods.forEach(method => {
                    if(routerMap && 
                        routerMap.methods && 
                        routerMap.methods[method] && 
                        routerMap.methods[method].methodId && 
                        routeObj[routerMap.methods[method].methodId] &&
                        (typeof(routeObj[routerMap.methods[method].methodId]) == 'function')){
                            let routeFunc = routeObj[routerMap.methods[method].methodId],
                                appFunction;
                            switch(method){
                                case 'GET':
                                appFunction = this.app.get;
                                break;
                                case 'POST':
                                appFunction = this.app.post;
                                break;
                                case 'DELETE':
                                appFunction = this.app.delete;
                                break;
                                case 'PUT':
                                appFunction = this.app.put;
                                break;
                            }
                            if(appFunction){
                                if (routerMap.methods[method].secured && this.securityHandler){
                                    appFunction.call(this.app, finalUrl, middleWareFunc, this.securityHandler, routeFunc);
                                } else{
                                    appFunction.call(this.app, finalUrl, middleWareFunc, routeFunc);
                                }
                            }
                    }                
                });
            });
        }
    }
    setSecurityHandler = (securityMap) => {
        let header;
        if(securityMap && 
           (Object.keys(securityMap).length == 1) && 
           (header = Object.keys(securityMap)[0]) && 
           typeof(securityMap[header]) == 'function'){ 
            this.securityHeader = header.toLowerCase();
            this.securityHandler = securityMap[header];
        } else{
            console.error("Error setting the security handler!");
            process.exit(1);
        }
    }
    loadControllersMap = async (controllerPath: string) => {
        return new Promise(async (resolve, reject)=> {
            if(fs.statSync(controllerPath).isDirectory()){
                let fileNames = fs.readdirSync(path.join(controllerPath));
                for(var i=0; i < fileNames.length; i++){
                    var fileName = fileNames[i];
                    if(fileName.match(/\.js$|\.ts$/)){
                        try{
                            let file = fileName.replace(/\.js$|\.ts$/, '');
                            let controller = await import(path.join(controllerPath, fileName));
                            this.controllers[file] = controller;
                        }
                        catch(e){
                            console.log("Error initializing ", fileName, " with error ", e);
                            reject('Error initializing controller');
                        }
                        
                    }
                }
                 resolve();
            }
            reject('Missing router map');
        })
    }
    loadConfigToMemory(){
        if(fs.statSync(this.configPath).isFile()){
            try{
                this.configContent = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
            } catch(e){
                console.error("Error occurred loading config!", e);
                process.exit(1);
            }   
        }
    }
}
export default InitMiddleWare;