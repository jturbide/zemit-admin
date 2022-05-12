import Service from '@/zemit/core/service';
import EmailModel from '@/zemit/model/email.model';

export default class EmailService extends Service {
  modelUrl = '/email';
  baseUrl = '/api';
  model = EmailModel;
}
