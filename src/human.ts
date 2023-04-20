import { Config, CustomElement } from './util'
import { catCfg } from './cat'

export const humanCfg: Config = {
  data() {
    return {
      name: 'Bridge',
      age: 2,
    }
  },
  props: ['father', 'mother'],
  methods: {
    laugh(v: string) {
      alert(v)
    },
    growUp() {
      this.age++
      alert(this.age)
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
          children: `my age is ${this.age}, my father is ${this.father}, my mother is ${this.mother}`,
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': this.growUp.bind(this),
          },
          children: '点我长大',
        },
        {
          hash: 'CAT_1',
          type: catCfg,
          props: {
            owner: this.father,
            '@laugh': this.laugh.bind(this),
          },
          instance: null,
        },
      ],
    }
  },
}

export const humanInstanceEl: CustomElement = {
  hash: 'HUMAN_1',
  type: humanCfg,
  props: {
    father: 'jim',
    mother: 'viven',
  },
  instance: null,
}
