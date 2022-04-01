import Vue from 'vue';

const wm = new WeakMap();

export const vControl = {
  bind(el: HTMLInputElement, binding: any, vnode: any) {
    const inputHandler = (event: CustomEvent) => {
      Vue.set(
        vnode.context,
        binding.expression,
        (event.target as HTMLInputElement).value,
      );
    };

    wm.set(el, inputHandler);

    el.value = binding.value;

    el.addEventListener('input', () => inputHandler);
    el.addEventListener('changeValue', () => inputHandler);
  },

  componentUpdated(el: HTMLInputElement, binding: any) {
    el.value = binding.value;
  },

  unbind(el: HTMLInputElement) {
    const inputHandler = wm.get(el);

    el.removeEventListener('input', inputHandler);
    el.removeEventListener('changeValue', inputHandler);
  },
};
