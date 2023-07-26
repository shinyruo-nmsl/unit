import { renderCommonElement, CustomElement } from './element'
import { addRouters, setRouterCallback, IRouter, getRouteElements } from './router'

export function createApp(app: CustomElement, container: HTMLElement, routes: IRouter[]) {
  addRouters(routes)
  setRouterCallback(() => renderCommonElement(app, container))
  // getRouteElements(window.location.hash.replace('#/', ''))
  renderCommonElement(app, container)
}
