export function reactive(obj: Record<string, any>): Record<string, any> {
  const observerMap = {}
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(key as string, observerMap)
      const value = Reflect.get(target, key, receiver)
      if (typeof value === 'object' && value !== null) {
        return reactive(value)
      }
      return value
    },
    set(target, key, newVal, receiver) {
      const value = Reflect.set(target, key, newVal, receiver)
      trigger(key as string, observerMap)
      return value
    },
  })
}

let currentEffect: Function

function track(key: string, observerMap: { [prop: string]: Function[] }) {
  if (!observerMap[key]) {
    observerMap[key] = []
  }
  observerMap[key].push(currentEffect)
}

function trigger(key: string, observerMap: { [prop: string]: Function[] }) {
  if (observerMap[key]) {
    observerMap[key].forEach((fn) => fn())
  }
}

export function effect(fn: Function) {
  currentEffect = fn
  currentEffect()
}
