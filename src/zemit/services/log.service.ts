import Service from '@/zemit/core/service';
import LogModel from '@/zemit/model/log.model';

export default class LogService extends Service {
  modelUrl = '/log';
  baseUrl = '/api';
  model = LogModel;
}
