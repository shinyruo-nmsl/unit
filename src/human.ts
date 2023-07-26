import { Config, CustomElement, RouterPlaceholder } from './util'
import './human.less'
import catCfg from './cat'
import _ from 'lodash/cloneDeep'

export const humanCfg: Config = {
  data() {
    return {
      name: _('Bridge'),
      age: _(2),
    }
  },
  props: ['father', 'mother'],
  methods: {
    laugh(v: string) {
      alert(v)
    },
    growUp() {
      ;(this as any).age++
      alert((this as any).age)
    },
  },
  createElement() {
    return {
      dom: null,
      type: 'div',
      props: {
        class: 'human-box',
      },
      children: [
        {
          dom: null,
          type: 'div',
          props: {
            class: 'human-intro',
          },
          children: `my age is ${(this as any).age}, my father is ${(this as any).father}, my mother is ${
            (this as any).mother
          }`,
        },
        {
          dom: null,
          type: 'button',
          props: {
            '@click': (this as any).growUp.bind(this as any),
            class: 'human-button',
          },
          children: '点我长大',
        },
        {
          hash: 'CAT_1',
          type: catCfg,
          props: {
            owner: (this as any).father,
            '@laugh': (this as any).laugh.bind(this as any),
          },
          instance: null,
        },
        {
          type: RouterPlaceholder,
          el: null,
          props: {},
        },
      ],
    }
  },
}

const humanInstanceEl: CustomElement = {
  hash: 'HUMAN_1',
  type: humanCfg,
  props: {
    father: 'jim',
    mother: 'viven',
  },
  instance: null,
}

export default humanInstanceEl
