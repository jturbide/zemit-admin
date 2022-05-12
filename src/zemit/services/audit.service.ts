import Service from '@/zemit/core/service';
import AuditModel from '@/zemit/model/audit.model';

export default class AuditService extends Service {
  modelUrl = '/audit';
  baseUrl = '/api';
  model = AuditModel;
}
