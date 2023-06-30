import { Config } from './util'

const catCfg: Config = {
  data() {
    return {
      name: 'xiangguo',
      age: 5,
    }
  },
  props: ['owner', '@laugh'],
  methods: {
    laugh() {
      ;(this as any).$emit('laugh', 'miaomiao~')
    },
    growUp() {
      ;(this as any).age++
    },
  },
  createElement() {
    return {
      dom: null,
      type: 'div',
      props: {},
      children: [
        {
          dom: null,
          type: 'div',
          props: {},
          children: `my name is ${(this as any).name}, my age is ${(this as any).age}, my owner is ${
            (this as any).owner
          }`,
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': (this as any).laugh.bind(this as any),
          },
          children: '点我^_^',
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': (this as any).growUp.bind(this as any),
          },
          children: '点我++',
        },
      ],
    }
  },
}

export default catCfg
