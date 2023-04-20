import { Config } from './util'

export const catCfg: Config = {
  data() {
    return {
      name: 'xiangguo',
      age: 5,
    }
  },
  props: ['owner', '@laugh'],
  methods: {
    laugh() {
      this.$emit('laugh', 'miaomiao~')
    },
    growUp() {
      this.age++
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
          children: `my name is ${this.name}, my age is ${this.age}, my owner is ${this.owner}`,
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': this.laugh.bind(this),
          },
          children: '点我^_^',
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': this.growUp.bind(this),
          },
          children: '点我++',
        },
      ],
    }
  },
}
