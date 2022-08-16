// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到 DOM 中时……
  // 令绑定的元素插入到dom的时候 ,图片数据还没请求回来
  inserted(el, { value }) {
    // 监听dom img 图片加载失败的事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    // 监听dom img 图片加载失败的事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
}
