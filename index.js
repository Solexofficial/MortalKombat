const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    if (Array.isArray(className)) {
      className.forEach(item => {
        $tag.classList.add(item);
      });
    } else {
      $tag.classList.add(className);
    }
  }

  return $tag;
};

function createEmptyPlayerBlock() {
  const el = createElement('div', ['character', 'div11', 'disabled']);
  const img = createElement('img');
  img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
  el.appendChild(img);
  $parent.appendChild(el);
}

async function init() {
  localStorage.removeItem('player1');

  const players = await fetch(
    'https://reactmarathon-api.herokuapp.com/api/mk/players'
  ).then(res => res.json());

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach(item => {
    const el = createElement('div', ['character', `div${item.id}`]);
    const img = createElement('img');

    el.addEventListener('mousemove', () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement('img');
        $img.src = imgSrc;
        $player.appendChild($img);
      }
    });

    el.addEventListener('mouseout', () => {
      if (imgSrc) {
        imgSrc = null;
        $player.innerHTML = '';
      }
    });

    el.addEventListener('click', () => {
      //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
      // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
      // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
      // но это уже будет в нашем классе Game когда мы инициализируем игроков.
      localStorage.setItem('player1', JSON.stringify(item));

      el.classList.add('active');

      setTimeout(() => {
        // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
        //  Пример использования: window.location.pathname = 'arenas.html';
        window.location.pathname = 'arena.html';
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    $parent.appendChild(el);
  });
}

init();
