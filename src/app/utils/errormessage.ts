import { Notyf } from 'notyf';
export class NotyfService {
  private notyf = new Notyf();

  showError(message: string) {
    this.notyf.error({
      message,
      duration: 5000,
      position: {
        x: 'center',
        y: 'center',
      },
      ripple: true,
      background: '#ff4444',
      className: 'notyf-center',
    });
  }
}
