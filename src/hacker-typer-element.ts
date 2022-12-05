const html = String.raw
/**
 * An example Custom Element. This documentation ends up in the
 * README so describe how this elements works here.
 *
 * You can event add examples on the element is used with Markdown.
 *
 * ```
 * <hacker-typer></hacker-typer>
 * ```
 */
class HackerTyperElement extends HTMLElement {
  #renderRoot!: ShadowRoot
  #position = 0
  #content = ''

  get src() {
    return this.getAttribute('src')
  }

  set src(value: string) {
    this.setAttribute('src', value)
  }

  get templateEl() {
    return this.querySelector('template')
  }

  get displayAreaEl() {
    return this.#renderRoot.querySelector('code')
  }

  async connectedCallback(): void {
    await this.load()

    this.#renderRoot = this.attachShadow({mode: 'open'})
    this.#renderRoot.innerHTML = html`
    <style>
    :host {
      height: 100vw;
      display: block;
      background: black;
      color: limegreen;
    }
    </style>
    <pre><code></code></pre>`

    this.ownerDocument.addEventListener('keypress', this)
  }

  handleEvent() {
    if (this.#content.length <= this.#position) {
      this.restart()
    }
    const char = this.#content.slice(this.#position, this.#position + 10)
    const node = this.ownerDocument.createTextNode(char)
    this.displayAreaEl?.append(node)
    this.#position += 10
  }

  async load() {
    const res = await fetch(this.src)
    const text = await res.text()
    this.#content = text
  }

  restart() {
    this.#position = 0
  }
}

declare global {
  interface Window {
    HackerTyperElement: typeof HackerTyperElement
  }
}

export default HackerTyperElement

if (!window.customElements.get('hacker-typer')) {
  window.HackerTyperElement = HackerTyperElement
  window.customElements.define('hacker-typer', HackerTyperElement)
}
