import Service from '@/zemit/core/service';
import TemplateModel from '@/zemit/model/template.model';

export default class TemplateService extends Service {
  modelUrl = '/template';
  baseUrl = '/api';
  model = TemplateModel;
}
