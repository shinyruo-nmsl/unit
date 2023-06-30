let isFlushing = false
let queueJobs = new Set<Function>()

const p = Promise.resolve()

function asyncUpdate() {
  if (isFlushing) return

  isFlushing = true
  p.then(() => {
    queueJobs.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

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
    observerMap[key].forEach((fn) => {
      if ((fn as any).schedule) {
        queueJobs.add(fn)
        asyncUpdate()
      } else {
        fn()
      }
    })
  }
}

type EffectOptions = {
  schedule?: boolean
}

export function effect(fn: Function, options?: EffectOptions) {
  currentEffect = fn
  if (options && options.schedule) {
    ;(currentEffect as any).schedule = true
  }
  currentEffect()
}
