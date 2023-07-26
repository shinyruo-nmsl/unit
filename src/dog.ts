import { Config, routerReplace } from './util'

const dogCfg: Config = {
  data() {
    return {
      nam: 'dog',
      ag: 5,
    }
  },
  props: [],
  methods: {},
  createElement() {
    return {
      dom: null,
      type: 'div',
      props: {},
      children: [
        {
          dom: null,
          type: 'button',
          props: {
            '@click': () => routerReplace('pig'),
          },
          children: '点我跳转',
        },
      ],
    }
  },
}

export default {
  hash: 'DOG_1',
  type: dogCfg,
  props: {},
  instance: null,
}
