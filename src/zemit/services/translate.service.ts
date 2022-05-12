import Service from '@/zemit/core/service';
import TranslateModel from '@/zemit/model/translate.model';

export default class TranslateService extends Service {
  modelUrl = '/translate';
  baseUrl = '/api';
  model = TranslateModel;
}
