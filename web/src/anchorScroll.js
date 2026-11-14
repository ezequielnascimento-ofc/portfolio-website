// Navegação por âncoras sem escrever o #hash na URL.
// Mantém o href="#secao" nos links (funciona sem JS, "copiar link" e
// ctrl/cmd+clique continuam normais), mas no clique comum rola até a seção
// e não altera o endereço. A rolagem segue o CSS: `scroll-behavior: smooth`
// e o fallback de prefers-reduced-motion.

function scrollToSection(target) {
  target.scrollIntoView()

  // Como no salto nativo de âncora: o próximo Tab parte da seção de destino.
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
}

export function initAnchorScroll() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    const id = decodeURIComponent(link.getAttribute('href').slice(1))
    const target = id && document.getElementById(id)
    if (!target) return

    e.preventDefault()
    scrollToSection(target)
  })

  // Quem chega por um link antigo (ex.: /#contato) ainda vai para a seção,
  // e o hash é retirado da URL. As seções são renderizadas pelo React, então
  // espera alguns frames até o elemento existir.
  const { hash, pathname, search } = window.location
  if (!hash) return
  window.history.replaceState(window.history.state, '', pathname + search)

  const id = decodeURIComponent(hash.slice(1))
  let frames = 0
  const tryScroll = () => {
    const target = document.getElementById(id)
    if (target) target.scrollIntoView()
    else if (++frames < 60) requestAnimationFrame(tryScroll)
  }
  requestAnimationFrame(tryScroll)
}
