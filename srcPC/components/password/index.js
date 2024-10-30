import { createApp, h } from 'vue';
import i18n from '@pc/i18n';
import store from '@pc/store';
import { constant } from '@pc/utils/store';
import pwdComponent from './password.vue';

const PwdComponent = {
    render() {
        return h(pwdComponent, {
            i18n,
            store,
        });
    }
};

export function pwdConfirm({
    type = 'normal',
    showMask = true,
    title,
    cancel = () => { },
    submit = () => { },
    content = '',
    cancelTxt,
    submitTxt,
    exchange = false
}, isShowPWD = true) {
    const appEl = document.getElementById('vite-wallet-app');

    const pwdApp = createApp(PwdComponent);
    pwdApp.use(i18n);
    pwdApp.use(store);

    let instance = pwdApp.mount(document.createElement('div'));  // Use let instead of const

    const _close = cb => {
        try {
            appEl.removeChild(instance.$el);
        } catch (err) {
            console.warn(err);
        }
        instance.unmount();  // Correct Vue 3 method to unmount
        instance = null;  // Reset instance
        cb && cb();
    };

    instance.showMask = showMask;
    instance.isShowPWD = isShowPWD;
    instance.title = title;
    instance.exchange = exchange;
    instance.type = type;
    instance.cancel = () => {
        _close();
        cancel && cancel();
    };
    instance.submit = () => {
        _close();
        submit && submit();
    };
    instance.content = content || '';
    instance.cancelTxt = cancelTxt || '';
    instance.submitTxt = submitTxt || '';

    appEl.appendChild(instance.$el);
    return true;
}

export function initPwd({
    showMask = true,
    title,
    submit = () => {},
    cancel = () => {},
    content = '',
    submitTxt = '',
    cancelTxt = '',
    exchange = false
}, isConfirm = false) {
    const currHDAcc = store.state.wallet.currHDAcc;
    const accInfo = currHDAcc ? currHDAcc.getAccInfo() : null;
    const isHoldPWD = accInfo ? !!accInfo[constant.HoldPwdKey] : false;
    const isHide = (!isConfirm && isHoldPWD) || currHDAcc.isSeparateKey;
    if (isHide) {
        submit && submit();
        return true;
    }
    pwdConfirm({ showMask, title, submit, content, cancel, cancelTxt, submitTxt, exchange }, !isHoldPWD);
    return false;
}
