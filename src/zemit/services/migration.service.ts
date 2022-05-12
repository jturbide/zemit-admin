import Service from '@/zemit/core/service';
import MigrationModel from '@/zemit/model/migration.model';

export default class MigrationService extends Service {
  modelUrl = '/migration';
  baseUrl = '/api';
  model = MigrationModel;
}
