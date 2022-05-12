import Service from '@/zemit/core/service';
import LangModel from '@/zemit/model/lang.model';

export default class LangService extends Service {
  modelUrl = '/lang';
  baseUrl = '/api';
  model = LangModel;
}
