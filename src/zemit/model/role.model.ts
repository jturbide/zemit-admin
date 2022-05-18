import Model from '@/zemit/core/model';
import UserModel from "@/zemit/model/user.model";

export default class RoleModel extends Model {
  relatedMap () {
    return {
      userlist: UserModel,
    }
  }
}
