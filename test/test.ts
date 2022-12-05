import {assert, fixture, html} from '@open-wc/testing'
import '../src/hacker-typer'

describe('hacker-typer', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('hacker-typer')
      assert.equal('HACKER-TYPER', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.CustomElementElement()
      assert.equal('HACKER-TYPER', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(async function () {
      await fixture(html` <hacker-typer></hacker-typer>`)
    })

    it('initiates', function () {
      const ce = document.querySelector('hacker-typer')
      assert.equal(ce?.textContent, ':wave:')
    })
  })
})
