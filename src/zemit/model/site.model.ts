import Model from '@/zemit/core/model';
import LangModel from "@/zemit/model/lang.model";

export default class SiteModel extends Model {
  relatedMap () {
    return {
      langlist: LangModel,
    }
  }
}
