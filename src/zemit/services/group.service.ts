import Service from '@/zemit/core/service';
import GroupModel from '@/zemit/model/group.model';

export default class GroupService extends Service {
  modelUrl = '/group';
  baseUrl = '/api';
  model = GroupModel;
}
