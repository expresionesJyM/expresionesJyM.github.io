(function () {
      var ua = navigator.userAgent || navigator.vendor || window.opera || '';
      var isInAppBrowser = /musical_ly|tiktok|bytedance|ttwebview|instagram|FBAN|FBAV/i.test(ua);

      if (!isInAppBrowser) return;

      var toast = document.getElementById('toast');
      var toastTimer = null;

      function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove('show');
        }, 3800);
      }

      function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text).catch(function () {
            return copyTextFallback(text);
          });
        }
        return copyTextFallback(text);
      }

      function copyTextFallback(text) {
        var input = document.createElement('textarea');
        input.value = text;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        var copied = false;
        try {
          copied = document.execCommand('copy');
        } catch (error) {
          copied = false;
        }
        input.remove();

        if (copied) return Promise.resolve();
        window.prompt('Copia este enlace:', text);
        return Promise.resolve();
      }

      // Intercepta también el enlace de Jashy aunque su destino vaya cambiando.
      document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-copy]');
        if (!el) return;
        e.preventDefault();
        var text = el.getAttribute('data-copy');
        copyText(text).then(function () {
          showToast('🔗 ¡Enlace copiado! Pégalo en tu navegador para abrirlo');
        }).catch(function () {
          showToast('No se pudo copiar. Mantén presionado el enlace para copiarlo');
        });
      });
    })();

    (function () {
      var widget = document.getElementById('jashyWidget');
      var avatar = document.getElementById('jashyAvatar');
      var close = document.getElementById('jashyClose');
      var messageNode = document.getElementById('jashyMessage');
      var cta = document.getElementById('jashyCta');
      var messages = [
        {
          text: '¡Hola! Soy Jashy 🌷 ¡Bienvenidos a Expresiones!',
          label: 'Ver nuestros enlaces', href: '#redes'
        },
        {
          text: '¿Buscas un regalo especial? Te ayudamos a crear tu ramo 🌸',
          label: 'Pedir mi ramo',
          href: 'https://wa.me/51956744914?text=Hola%2C%20quiero%20pedir%20un%20ramo%20%F0%9F%8C%B7',
          copy: 'https://wa.me/51956744914?text=Hola%2C%20quiero%20pedir%20un%20ramo%20%F0%9F%8C%B7'
        },
        {
          text: '¿Te gusta crear? Tenemos materiales para que empieces a emprender ✨',
          label: 'Ver materiales',
          href: 'https://wa.me/51956744914?text=Hola%2C%20quiero%20comprar%20materiales%20%F0%9F%AA%B7',
          copy: 'https://wa.me/51956744914?text=Hola%2C%20quiero%20comprar%20materiales%20%F0%9F%AA%B7'
        },
        {
          text: 'Únete gratis a nuestra comunidad y aprendamos juntas 💚',
          label: 'Unirme gratis',
          href: 'https://chat.whatsapp.com/CMHPDhzzyfnKDMrn21aZUr',
          copy: 'https://chat.whatsapp.com/CMHPDhzzyfnKDMrn21aZUr'
        },
        {
          text: 'Síguenos en nuestras redes para ver ramos, ideas y novedades 💐',
          label: 'Ver redes', href: '#redes'
        }
      ];
      var currentMessage = 0;

      function showMessage(index) {
        var item = messages[index];
        messageNode.classList.add('is-changing');
        window.setTimeout(function () {
          messageNode.textContent = item.text;
          cta.querySelector('span').textContent = item.label;
          cta.href = item.href;
          if (item.copy) {
            cta.setAttribute('data-copy', item.copy);
          } else {
            cta.removeAttribute('data-copy');
          }
          messageNode.classList.remove('is-changing');
        }, 180);
      }

      function showRandomMessage() {
        var nextMessage;
        do {
          nextMessage = Math.floor(Math.random() * messages.length);
        } while (messages.length > 1 && nextMessage === currentMessage);
        currentMessage = nextMessage;
        showMessage(currentMessage);
      }

      avatar.addEventListener('click', function () {
        var minimized = widget.classList.toggle('is-minimized');
        avatar.setAttribute('aria-expanded', String(!minimized));
      });

      close.addEventListener('click', function () {
        widget.classList.add('is-minimized');
        avatar.setAttribute('aria-expanded', 'false');
      });

      window.setInterval(showRandomMessage, 9000);
    })();
