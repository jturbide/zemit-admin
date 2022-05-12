import Service from '@/zemit/core/service';
import SiteModel from '@/zemit/model/site.model';

export default class SiteService extends Service {
  modelUrl = '/site';
  baseUrl = '/api';
  model = SiteModel;
}
