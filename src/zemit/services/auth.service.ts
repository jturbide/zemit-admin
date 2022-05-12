import Service, { ModelServiceEndpointType, ZemitData } from '@/zemit/core/service';
import axios, { AxiosResponse } from 'axios';
import Logger from '@/zemit/core/logger';

const d = new Logger('AuthService');

export type AuthEndpointType =
// ModelServiceEndpointType |
  'getAll' |
  'login' |
  'logout'
  ;

export interface ZemitMessage {
  code: number,
  field: string | Array<string>,
  message: string,
  metaData: Array<any>
  type: string
}

export interface GetView {
  jwt: string,
  loggedIn: boolean,
  loggedInAs: boolean,
  refreshed: boolean,
  validated: boolean,
  saved: boolean,
  stored: boolean,
  messages: Array<ZemitMessage>,
  user: any, // @todo
  userAs: any, // @todo,
  permissionList: Array<any>, // @todo
  groupList: Array<any>, // @todo
  roleList: Array<any> // @todo
  typeList: Array<any>, // @todo
}

export interface RegisterView extends GetView {
  loggedIn: boolean;
  loggedInAs: boolean;
  messages: Array<ZemitMessage>;
  saved: boolean;
}

export interface LoginView extends GetView {
  loggedIn: boolean;
  loggedInAs: boolean;
  messages: Array<ZemitMessage>;
  saved: boolean;
}

export interface LogoutView {
  loggedIn: boolean;
  loggedInAs: boolean;
  messages: Array<ZemitMessage>;
  saved: boolean;
}

export default class AuthService extends Service {

  modelUrl = '/auth';
  baseUrl = '/api';

  endpointList = {
    get: '/get',
    logout: '/logout',
    login: '/login',
    register: '/register',
  };

  getGetUrl = () => this.getUrl('get');
  getRegisterUrl = () => this.getUrl('register');
  getLoginUrl = () => this.getUrl('login');
  getLogoutUrl = () => this.getUrl('logout');

  get = (data = {}): Promise<AxiosResponse<ZemitData<GetView>>> => this.handleRequest(this.getGetUrl(), data);
  register = (data = {}): Promise<AxiosResponse<ZemitData<RegisterView>>> => this.handleRequest(this.getRegisterUrl(), data);
  login = (data = {}): Promise<AxiosResponse<ZemitData<LoginView>>> => this.handleRequest(this.getLoginUrl(), data);
  logout = (data = {}): Promise<AxiosResponse<ZemitData<LogoutView>>> => this.handleRequest(this.getLogoutUrl(), data);
}
