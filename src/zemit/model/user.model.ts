import Model from '@/zemit/core/model';
import RoleModel from '@/zemit/model/role.model';
import GroupModel from '@/zemit/model/group.model';
import TypeModel from '@/zemit/model/type.model';

export default class UserModel extends Model {

  relatedMap () {
    return {
      rolelist: RoleModel,
      grouplist: GroupModel,
      typelist: TypeModel,
    }
  }
}
