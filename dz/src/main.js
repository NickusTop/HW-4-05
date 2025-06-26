import { alert, defaultModules, notice, info, success, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'g', 'h'];
const currentKey = document.querySelector('#current-key');

let currentIndexKey = 0;
let canPress = true;
const delayTime = 1000;
const delayTime2 = 1500;

function updateCurrentKey() {
  currentKey.textContent = "Поточна клавіша: " + keys[currentIndexKey];
}

updateCurrentKey();

document.addEventListener('keydown', (event) => {
  // Якщо гра вже пройдена — нічого не робимо
  if (currentIndexKey >= keys.length) return;

  if (!canPress) return;
  canPress = false;

  const key = event.key.toLowerCase();

  if (key === keys[currentIndexKey]) {
    success({ text: `Правильно: ${key}`, delay: 1000});

    currentIndexKey++;

    if (currentIndexKey < keys.length) {
      updateCurrentKey();
    } else {
      success({ text: 'Вітаю, ти пройшов гру!', delay: 2000 });
    }
  } else {
    error({ text: `Неправильна клавіша! Спробуй ще раз.`, delay: 1000 });
    updateCurrentKey();
  }

  setTimeout(() => {
    canPress = true;
  }, delayTime);
});


document.addEventListener('keypress', (e) => e.preventDefault());

document.querySelector('#new-game')?.addEventListener('click', () => {
  if (!canPress) return;
  canPress = false;

  currentIndexKey = 0;
  updateCurrentKey();
  notice({ text: 'Гру скинуто!', delay: 1500 });
  setTimeout(() => {
    canPress = true;
  }, delayTime2);
});
