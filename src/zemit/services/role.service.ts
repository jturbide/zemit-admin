import Service from '@/zemit/core/service';
import RoleModel from '@/zemit/model/role.model';

export default class RoleService extends Service {
  modelUrl = '/role';
  baseUrl = '/api';
  model = RoleModel;
}
