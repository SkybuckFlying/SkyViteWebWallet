import { createApp, h } from 'vue';
import i18n from '@pc/i18n';
import powProcessComponent from './powProcess.vue';

export function powProcess({ cancel = () => {}, isShowCancel = true }) {
    const appEl = document.getElementById('vite-wallet-app');

    const PowProcessComponent = {
        render() {
            return h(powProcessComponent, {
                cancel: () => {
                    cancel && cancel();
                    this.close();
                },
                isShowCancel: isShowCancel
            });
        },
        methods: {
            close(cb) {
                try {
                    appEl.removeChild(this.$el);
                } catch (err) {
                    console.warn(err);
                }
                this.$destroy();
                this.instance = null;
                cb && cb();
            },
            startCount() {
                // Implement your startCount logic here
            }
        },
        mounted() {
            this.startCount();
        },
    };

    const powProcessApp = createApp(PowProcessComponent);
    powProcessApp.use(i18n);

    const instance = powProcessApp.mount(document.createElement('div'));
    appEl.appendChild(instance.$el);

    return instance;
}
