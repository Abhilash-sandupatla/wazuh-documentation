init();

/**
* Starts the functionality only when the main content is loaded
*/
function init() {
  let redocObserver = null;
  const config = {childList: true};
  const redocLoaded = function(mutationsList, observer) {
    for (i = 0; i < mutationsList.length; i++) {
      if (mutationsList[i].type === 'childList'
      && mutationsList[i].addedNodes[0]
      && mutationsList[i].addedNodes[0].classList.contains('redoc-wrap')) {
        /* When redoc is finally loaded */
        /* Show custom header */
        document.querySelector('body').classList.remove('loading');

        /* Change toggle-menu button */
        const removed = document.querySelector('.sc-gqPbQI.imibLw');
        const btn = removed.parentNode;
        const icon = document.createElement('i');
        icon.classList.add('x');
        btn.removeChild(removed);
        btn.classList.add('btn-close');
        btn.classList.add('collapsed');
        btn.appendChild(icon);

        btn.addEventListener('click', function() {
          if (this.classList.contains('collapsed')) {
            this.classList.remove('collapsed');
          } else {
            this.classList.add('collapsed');
          }
        });

        checkMenu(btn);
        document.addEventListener('scroll', function() {
          const docHeight = document.body.clientHeight;
          const docWidth = document.body.clientWidth;
          const botomPos = window.innerHeight+window.scrollY;
          const menu = document.querySelector('.menu-content');
          if ( docHeight - 30 <= botomPos && docWidth > 800 ) {
            menu.classList.add('reached-bottom');
          } else {
            menu.classList.remove('reached-bottom');
          }
        });
      }
    }
  };
  redocObserver = new MutationObserver(redocLoaded);
  redocObserver.observe(document.querySelector('redoc[spec-url]'), config);
}

/**
* Makes sure that the toggle button for the menu has always the proper state
* @param {DOMObject} btn Menu toggle button element
*/
function checkMenu(btn) {
  if ( btn ) {
    let menuButtonObserver = null;
    const config = {attributes: true};
    const buttonStatus = function(mutationsList, observer) {
      for (i = 0; i < mutationsList.length; i++) {
        if ( mutationsList[i].attributeName == 'open' ) {
          if ( document.querySelector('redoc[spec-url] .menu-content').hasAttribute('open') ) {
            btn.classList.remove('collapsed');
          } else {
            btn.classList.add('collapsed');
          }
        }
      }
    };
    menuButtonObserver = new MutationObserver(buttonStatus);
    menuButtonObserver.observe(document.querySelector('redoc[spec-url] .menu-content'), config);
  }
}
