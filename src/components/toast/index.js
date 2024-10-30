import { createApp, h, nextTick } from 'vue';
import toastComponent from './toast.vue';

const Toast = {
    instance: null,
    toastDuration: 2000,
    showToast(message, duration = this.toastDuration, type = 'info', position = 'top') {
        if (!message) return;
        if (this.instance && this.instance.show) return this.instance;

        if (!this.instance) {
            const appEl = document.getElementById('vite-wallet-app');
            this.instance = createApp({
                render() {
                    return h(toastComponent, {
                        message,
                        type,
                        position,
                    });
                }
            }).mount(document.createElement('div'));
            appEl.appendChild(this.instance.$el);
        }

        type = type || 'info';
        position = position || 'top';
        this.instance.type = type;
        this.instance.message = message;
        this.instance.position = position;

        nextTick(() => {
            this.instance.show = true;
            setTimeout(() => {
                this.instance.show = false;
            }, duration);
        });
    }
};

export default Toast.showToast;
