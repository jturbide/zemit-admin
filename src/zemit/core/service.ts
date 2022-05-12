import Zemit from '@/zemit/zemit';
import Model from '@/zemit/core/model';
import axios, { Axios, AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ZemitOptions } from '@/zemit/vue';
import Logger from '@/zemit/core/logger';
import Identity from '@/zemit/core/identity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createError = require('./../../../node_modules/axios/lib/core/createError.js');

const d = new Logger('zemit/core/service');

export type ModelServiceEndpointType =
  'getAll' |
  'getList' |
  'get' |
  'export' |
  'count' |
  'new' |
  'validate' |
  'save' |
  'create' |
  'update' |
  'delete' |
  'restore' |
  ''
  ;

// @todo
export interface ZemitIdentity {
  groupList: any,
  loggedIn: boolean,
  loggedInAs: boolean,
  roleList: any,
  typeList: any,
  user: any
  userAs: any
}

export interface ZemitData<T> {
  view: T,
  identity?: ZemitIdentity,
  api: {
    app: string,
    core: string,
    name: string,
    phalcon: string,
    php: string,
    version: string,
    zemit: string,
  }
  hash: string,
  response: boolean,
  code: number,
  status: string,
  timestamp: string,
  dispatcher?: any,
  profiler?: any,
  request?: any,
  router?: any,
}

export abstract class ServiceConfig {
  model = Model;
  config?: Partial<ZemitOptions>;
  zemit?: Zemit;
}

export default class Service extends ServiceConfig {

  http?: Axios;
  baseUrl = '';
  modelUrl = '';
  endpointList: { [key: ModelServiceEndpointType | string]: string } = {
    getAll: '/get-all',
    getList: '/get-list',
    get: '/get',
    export: '/export',
    count: '/count',
    new: '/new',
    validate: '/validate',
    save: '/save',
    create: '/save',
    update: '/save',
    delete: '/delete',
    restore: '/restore',
    logout: '/logout',
    login: '/login',
  };

  constructor (opts: Partial<ServiceConfig> = {}) {
    super();
    Object.assign(this, opts);
  }

  static getInstance<T> (this: new () => T, opts: Partial<ServiceConfig> = {}): T {
    return Object.assign(new this(), opts);
  }

  get Http () {
    return this.http || axios.create(this.config?.axiosRequestConfig);
  }

  set Http (http) {
    this.http = http;
  }

  getEndpointUrl = (endpoint: ModelServiceEndpointType | string): string => this.endpointList[endpoint];
  setEndpointUrl = (endpoint: ModelServiceEndpointType | string, url: string): string => this.endpointList[endpoint] = url;

  getBaseUrl = () => this.baseUrl;
  setBaseUrl = (url: string) => this.baseUrl = url;

  setModelUrl = (url: string) => this.modelUrl = url;
  getModelUrl = () => this.modelUrl;

  /**
   * Build an endpoint url using the baseUrl + modelUrl + endpointUrl
   * @param endpoint
   */
  getUrl(endpoint: ModelServiceEndpointType | string) {
    return [
      this.getBaseUrl(),
      this.getModelUrl(),
      this.getEndpointUrl(endpoint)
    ].filter(Boolean).join('/').replace(/\/+/g, '\/');
  }

  /**
   * Endpoint URL getters
   * @return string
   */
  getGetAllUrl = () => this.getUrl('getAll');
  getGetListUrl = () => this.getUrl('getList');
  getGetUrl = () => this.getUrl('get');
  getExportUrl = () => this.getUrl('export');
  getCountUrl = () => this.getUrl('count');
  getNewUrl = () => this.getUrl('new');
  getValidateUrl = () => this.getUrl('validate');
  getCreateUrl = () => this.getUrl('create');
  getUpdateUrl = () => this.getUrl('update');
  getSaveUrl = () => this.getUrl('save');
  getDeleteUrl = () => this.getUrl('delete');
  getRestoreUrl = () => this.getUrl('restore');
  getLogoutUrl = () => this.getUrl('logout');
  getLoginUrl = () => this.getUrl('login');

  getAll = (data = {}) => this.handleRequest(this.getGetAllUrl(), data);
  getList = (data = {}) => this.handleRequest(this.getGetListUrl(), data);
  get = (data = {}) => this.handleRequest(this.getGetUrl(), data);
  export = (data = {}) => this.handleRequest(this.getExportUrl(), data);
  count = (data = {}) => this.handleRequest(this.getCountUrl(), data);
  new = (data = {}) => this.handleRequest(this.getNewUrl(), data);
  validate = (data = {}) => this.handleRequest(this.getValidateUrl(), data);
  create = (data = {}) => this.handleRequest(this.getCreateUrl(), data);
  update = (data = {}) => this.handleRequest(this.getUpdateUrl(), data);
  save = (data = {}) => this.handleRequest(this.getSaveUrl(), data);
  delete = (data = {}) => this.handleRequest(this.getDeleteUrl(), data);
  restore = (data = {}) => this.handleRequest(this.getRestoreUrl(), data);

  handleRequest (
    url: string,
    data: object,
    successCallable?: CallableFunction,
    errorCallable?: CallableFunction,
    completeCallable?: CallableFunction
  ): Promise<AxiosResponse<ZemitData<any>>> {

    if (data instanceof Model) {
      data = data.toObject();
    }

    const success = (
      response: AxiosResponse<ZemitData<any>>,
      resolve: CallableFunction,
      reject: CallableFunction,
    ) => {
      if (response?.data?.view?.single) {
        response.data.view.single = new this.model(response.data.view.single);
      }
      if (response?.data?.view?.list) {
        response.data.view.list = response.data.view.list.map((item: any) => {
          return new this.model(item);
        });
      }
      d.d('success:response', url, response);
      successCallable && successCallable(response);
      resolve(response);
    };

    const error = (
      reason: AxiosError<any>|AxiosResponse<any>,
      resolve: CallableFunction,
      reject: CallableFunction,
    ) => {
      d.d('error:reason', url, reason);
      errorCallable && errorCallable(reason);
      reject(reason);
    };

    const complete = (
      resolve: CallableFunction,
      reject: CallableFunction,
    ) => {
      d.info('finally', url);
      completeCallable && completeCallable();
    };

    const http = axios.create(this.config?.axiosRequestConfig);

    http.interceptors.response.use(response => {
      d.info('interceptor:response', response);
      switch (response?.data?.response) {
        case undefined:
        case null:
        case true:
          return response;
      }
      return Promise.reject(createError(response.statusText, response.config, response.status, response.request, response));
    });

    http.interceptors.request.use(config => {
      d.info('interceptor:config', config);
      if (config.headers) {
        const AuthorizationToken = Identity.getIdentity()?.jwt;
        if (AuthorizationToken) {
          config.headers.Authorization = `Bearer ${AuthorizationToken}`;
        }
      }
      return config;
    });

    return new Promise((resolve, reject) =>
      http.post(url, data)
        .then((response: AxiosResponse<any>) => success(response, resolve, reject))
        .catch((reason: AxiosError<any>) => error(reason, resolve, reject))
        .finally(() => complete(resolve, reject)),
    );
  }
}
