import { Config, routerGo } from './util'

const pigCfg: Config = {
  data() {
    return {
      name: 'pig',
      age: 5,
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
            '@click': () => routerGo(-1),
          },
          children: '点我回退',
        },
      ],
    }
  },
}

export default {
  hash: 'PIG_1',
  type: pigCfg,
  props: {},
  instance: null,
}
