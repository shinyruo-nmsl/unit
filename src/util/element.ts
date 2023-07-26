import { reactive, effect } from './reactive'
import { currentRouteElements } from './router'

export const RouterPlaceholder = 'router_placeholder'

export interface CommonElement {
  type: string | Config
  props: Record<string, any>
}

export interface RouterElement extends CommonElement {
  type: typeof RouterPlaceholder
  el: CustomElement | null
}

export interface NativeElement extends CommonElement {
  dom: HTMLElement
  type: string
  children: string | CommonElement[]
}

export interface CustomElement extends CommonElement {
  hash: string
  type: Config
  props: Record<string, any>
  instance: Instance | null
}

export interface Config {
  data: () => Record<string, any>
  props: string[]
  methods: Record<string, (...args: any[]) => any>
  createElement: () => CommonElement
}

export interface Instance {
  element: CommonElement | null
  render: (routerOptions?: { elements: CustomElement[]; curIndex: number }) => void
}

function hasInit(ins: Instance) {
  return !!ins.element
}

function isCustomElement(el: CommonElement) {
  return !(typeof el.type === 'string')
}

function isRouteElement(el: CommonElement) {
  return el.type === RouterPlaceholder
}

function patchChildren(
  oldChildren: string | CommonElement[],
  newChildren: string | CommonElement[],
  container: HTMLElement
) {
  // it is a simple realization
  container.innerHTML = ''
  if (typeof newChildren === 'string') {
    container.innerHTML = newChildren
  } else {
    newChildren.forEach((child) => {
      if (isCustomElement(child) && Array.isArray(oldChildren)) {
        const oldChild = oldChildren.find(
          (c) => isCustomElement(c) && (c as CustomElement).hash === (child as CustomElement).hash
        )
        if (oldChild) {
          ;(child as CustomElement).instance = (oldChild as CustomElement).instance
        }
      } else if (isRouteElement(child) && Array.isArray(oldChildren)) {
        const oldRoute = oldChildren.find(isRouteElement)!
        ;(child as RouterElement).el = (oldRoute as RouterElement).el
      }
      renderCommonElement(child, container)
    })
  }
}

export function createInstance(el: CustomElement, container: HTMLElement): Instance {
  const reactiveData = reactive(el.type.data())
  const props = el.type.props.reduce((obj, prop) => {
    return { ...obj, [prop]: el.props[prop] }
  }, {})
  const methods = el.type.methods

  const instance = {
    data: reactiveData,
    props,
    methods,
    $emit(targetName: string, ...args: any[]) {
      ;(this.props as { [key: string]: Function })['@' + targetName](...args)
    },
  }

  const context = new Proxy(instance, {
    get(target: any, key) {
      if (key in target.data) {
        return target.data[key as string]
      }
      if (key in instance.props) {
        return target.props[key]
      }
      if (key in instance.methods) {
        return target.methods[key as string]
      }
      return target[key]
    },

    set(target, key, newval) {
      target.data[key as string] = newval
      return target.data[key as string]
    },
  })

  return {
    element: null,
    render() {
      const newEl = el.type.createElement.call(context)
      if (!hasInit(this)) {
        renderCommonElement(newEl, container)
      } else if (isCustomElement(this.element!)) {
        ;(newEl as CustomElement).instance = (this.element as CustomElement).instance
        renderCommonElement(newEl, container)
      } else {
        ;(newEl as NativeElement).dom = (this.element as NativeElement).dom
        if ((newEl as NativeElement).dom.parentNode !== container) {
          container.appendChild((newEl as NativeElement).dom)
        }
        patchChildren(
          (this.element! as NativeElement).children as string | CommonElement[],
          (newEl as NativeElement).children as string | CommonElement[],
          (this.element! as NativeElement).dom
        )
      }
      this.element = newEl
    },
  }
}

export function renderNativeElement(el: NativeElement, container: HTMLElement) {
  el.dom = document.createElement(el.type)
  container.appendChild(el.dom)

  if (typeof el.children === 'string') {
    el.dom.textContent = el.children
  } else {
    el.children.forEach((child) => renderCommonElement(child, el.dom!))
  }

  Object.keys(el.props).forEach((key) => {
    if (key.startsWith('@')) {
      el.dom.addEventListener(key.slice(1), el.props[key])
    } else if (key === 'class') {
      el.dom.className = el.props[key]
    }
  })
}

export function renderCustomElement(el: CustomElement, container: HTMLElement) {
  if (!el.instance) {
    el.instance = createInstance(el, container)
    effect(() => {
      el.instance!.render()
    })
  } else {
    el.instance.render()
  }
}

function renderRouteElement(el: RouterElement, container: HTMLElement) {
  if (currentRouteElements.length) {
    const routeEl = currentRouteElements.shift()!
    el.el = routeEl
  }
  el.el && renderCustomElement(el.el!, container)
}

export function renderCommonElement(el: CommonElement, container: HTMLElement) {
  if (isCustomElement(el)) {
    renderCustomElement(el as CustomElement, container)
  } else if (isRouteElement(el)) {
    renderRouteElement(el as RouterElement, container)
  } else {
    renderNativeElement(el as NativeElement, container)
  }
}
