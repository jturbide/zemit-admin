import Service from '@/zemit/core/service';
import BackupModel from '@/zemit/model/backup.model';

export default class BackupService extends Service {
  modelUrl = '/backup';
  baseUrl = '/api';
  model = BackupModel;
}
