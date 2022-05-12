import Service from '@/zemit/core/service';
import TypeModel from '@/zemit/model/type.model';

export default class TypeService extends Service {
  modelUrl = '/type';
  baseUrl = '/api';
  model = TypeModel;
}
