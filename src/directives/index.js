// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, { value }) {
    // 监听dom img 图片加载失败的事件
    el.onerror = function () {
      el.src = value
    }
  },
}

export const aa = {
  inserted() {},
}

export const bb = {
  inserted() {},
}
