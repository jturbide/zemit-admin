import Service from '@/zemit/core/service';
import UserModel from '@/zemit/model/user.model';

export default class UserService extends Service {
  modelUrl = '/user';
  baseUrl = '/api';
  model = UserModel;
}
