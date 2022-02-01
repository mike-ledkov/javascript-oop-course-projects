function getElt(selection) {
  const element = document.querySelector(selection)
  if(element) return element
  throw new Error(`Please check if “${selection}” exists.`)
}

class Counter {
  constructor(element, value) {
    this.counter = element
    this.defaultValue = value
    this.value = value
    this.decreaseBtn = element.querySelector(".decrease")
    this.resetBtn = element.querySelector(".reset")
    this.increaseBtn = element.querySelector(".increase")
    this.DOMValue = element.querySelector(".value")
    this.DOMValue.textContent = this.value
  
    this.decrease = this.decrease.bind(this)
    this.reset = this.reset.bind(this)
    this.increase = this.increase.bind(this)
    this.decreaseBtn.addEventListener("click", this.decrease)
    this.resetBtn.addEventListener("click", this.reset)
    this.increaseBtn.addEventListener("click", this.increase)
  }

  decrease() {
    this.value--
    this.DOMValue.textContent = this.value
  }

  reset() {
    this.value = this.defaultValue
    this.DOMValue.textContent = this.defaultValue
  }

  increase() {
    this.value++
    this.DOMValue.textContent = this.value
  }
}

const firstCounter = new Counter(getElt(".first-counter"), 0)
const secondCounter = new Counter(getElt(".second-counter"), 100)