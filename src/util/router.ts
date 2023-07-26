import { CustomElement } from './element'

export interface IRouter {
  path: string
  el: CustomElement
  default?: boolean
  children?: IRouter[]
}

const root: {
  path: '/'
  children: IRouter[]
} = {
  path: '/',
  children: [],
}

export const currentRouteElements: CustomElement[] = []

export function getRouteElements(url: string) {
  const paths = url.split('/')

  let curList: IRouter[] | undefined = root.children

  for (let path of paths) {
    if (!curList) throw new Error(`can not find path--${path}`)
    const router: IRouter | undefined = curList.find((item) => item.path === path)
    if (!router) throw new Error(`can not find path--${path}`)
    currentRouteElements.push(router.el)
    curList = router.children
  }
}

export function addRouters(routers: IRouter[]) {
  root.children.push(...routers)
}

let routerCallback: Function

export function setRouterCallback(call: Function) {
  routerCallback = call
  const hashChangeEvent = () => {
    const url = window.location.hash
    currentRouteElements.length = 0
    const path = url.replace('#/', '')
    if (path) {
      getRouteElements(path)
      routerCallback && routerCallback()
    } else {
      const dft = root.children.find((c) => c.default)
      if (dft) {
        routerReplace(dft.path)
      } else {
        routerCallback && routerCallback()
      }
    }
  }
  window.addEventListener('hashchange', hashChangeEvent)
  window.addEventListener('load', hashChangeEvent)
}

function getUrl(path: string) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  return `${base}#/${path}`
}

export function routerPush(path: string) {
  window.history.pushState({}, '', getUrl(path))
  getRouteElements(path)
  routerCallback && routerCallback()
}

export function routerReplace(path: string) {
  window.history.replaceState({}, '', getUrl(path))
  getRouteElements(path)
  routerCallback && routerCallback()
}

export function routerGo(n: number) {
  window.history.go(n)
}
