import { ZemitIdentity } from '@/zemit/core/service';
import store from 'store2';
import AuthService, { GetView } from '@/zemit/services/auth.service';
import Logger from '@/zemit/core/logger';

const d = new Logger('zemit/core/identity');

export default class Identity {

  static identity?: GetView;

  static setIdentity(identity: GetView) {
    this.identity = identity;
    d.d(this.identity);
    store.session.set('identity', this.identity);
  }

  static getIdentity() {
    if (!this.identity) {
      this.identity = store.session.get('identity', undefined);
    }
    return this.identity;
  }

  static removeIdentity() {
    delete this.identity;
    store.session.remove('identity');
  }

  static newIdentity() {
    this.removeIdentity();
    return AuthService.getInstance().get().then(success => {
      this.setIdentity(success.data.view);
      d.d('new', this.identity);
    });
  }

  static isLoggedIn() {
    return this.getIdentity()?.loggedIn;
  }

  static hasRole() {

  }

  static hasPermission() {

  }

}
