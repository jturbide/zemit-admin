import Service from '@/zemit/core/service';
import SettingModel from '@/zemit/model/setting.model';

export default class SettingService extends Service {
  modelUrl = '/setting';
  baseUrl = '/api';
  model = SettingModel;
}
