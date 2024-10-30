import { createApp, h } from 'vue';
import confirmComponent from '/srcPC/components/confirm/confirm.vue';

export default function ({
  size,
  type = '',
  showMask = true,
  title,
  content = '',
  singleBtn = false,
  closeBtn = {
    show: false,
    click: () => {}
  },
  leftBtn = {
    text: '',
    click: () => {}
  },
  rightBtn = {
    text: '',
    click: () => {}
  }
}) {
  const appEl = document.body;

  // Create and configure the app instance
  const confirmApp = createApp({
    render() {
      return h(confirmComponent, {
        showMask,
        type: type || '',
        size: size || '',
        title,
        content,
        singleBtn,
        closeBtn: closeBtn.show,
        close() {
          _close(closeBtn ? closeBtn.click : null);
        },
        leftBtnTxt: leftBtn.text,
        leftBtnClick() {
          _close(leftBtn ? leftBtn.click : null);
        },
        rightBtnTxt: rightBtn.text,
        rightBtnClick() {
          _close(rightBtn ? rightBtn.click : null);
        }
      });
    }
  });

  const instance = confirmApp.mount(document.createElement('div'));

  const _close = cb => {
    try {
      appEl.removeChild(instance.$el);
    } catch (err) {
      console.warn(err);
    }
    confirmApp.unmount(); // Correct Vue 3 method to unmount
    instance = null; // Reset instance
    cb && cb();
  };

  appEl.appendChild(instance.$el);
  return true;
}
