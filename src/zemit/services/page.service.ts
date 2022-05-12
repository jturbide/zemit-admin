import Service from '@/zemit/core/service';
import PageModel from '@/zemit/model/page.model';

export default class PageService extends Service {
  baseUrl = '/api';
  modelUrl = '/page';
  model = PageModel;
}
