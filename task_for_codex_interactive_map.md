# Задание для Codex: интерактивная карта Куюргазинского района

## 1. Цель задачи

Создать стартовый репозиторий с одностраничным сайтом, на котором отображается интерактивная SVG-карта Куюргазинского района. Карта разделена на сельсоветы. Пользователь должен иметь возможность кликнуть по сельсовету на карте и увидеть информацию о нём: название, краткое описание и список достопримечательностей.

На первом этапе нужен рабочий MVP без backend, базы данных и админки. Все данные можно хранить прямо в коде в TypeScript-файле.

---

## 2. Важное условие по SVG

В репозитории уже будет SVG-файл карты с названием:

```text
karta.svg
```

Не нужно рисовать новую карту и не нужно менять геометрию SVG.

Нужно использовать именно этот файл как основу интерактивной карты.

Рекомендуемое расположение файла в проекте:

```text
src/assets/karta.svg
```

Если файл `karta.svg` уже лежит в корне репозитория, перенеси или скопируй его в `src/assets/karta.svg`.

В SVG должны быть интерактивные области сельсоветов. Если у `path`-элементов уже есть `id`, `data-id` и `class="map-region"`, используй их. Если таких атрибутов нет, нужно аккуратно добавить их к каждому основному `path`, не меняя саму геометрию `d`.

Формат идентификаторов:

```text
selsovet-01
selsovet-02
selsovet-03
selsovet-04
selsovet-05
selsovet-06
selsovet-07
selsovet-08
selsovet-09
selsovet-10
selsovet-11
selsovet-12
selsovet-13
selsovet-14
```

Пример нужного формата для области:

```xml
<path
  id="selsovet-01"
  data-id="selsovet-01"
  class="map-region"
  tabindex="0"
  role="button"
  d="..."
/>
```

Важно: реальные названия сельсоветов пока могут быть неизвестны. Поэтому на первом этапе используем технические названия `Сельсовет №1`, `Сельсовет №2` и так далее.

---

## 3. Рекомендуемый стек

Использовать:

```text
Vite
React
TypeScript
CSS без UI-библиотек
```

Backend на первом этапе не нужен.

Не использовать:

```text
Next.js
backend
базу данных
Tailwind
сложные UI-библиотеки
карты Leaflet/Mapbox/Yandex Maps
```

Причина: сейчас задача — проверить механику интерактивного SVG, кликов и отображения информации.

---

## 4. Структура проекта

Создать структуру:

```text
src/
  assets/
    karta.svg
  components/
    DistrictMap/
      DistrictMap.tsx
      DistrictMap.css
    SelsovetInfoPanel/
      SelsovetInfoPanel.tsx
      SelsovetInfoPanel.css
  data/
    selsovets.ts
  types/
    selsovet.ts
  App.tsx
  main.tsx
  index.css
README.md
```

---

## 5. Типы данных

Создать файл:

```text
src/types/selsovet.ts
```

Содержимое:

```ts
export type Sight = {
  id: string;
  title: string;
  description: string;
  image?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type Selsovet = {
  id: string;
  name: string;
  description: string;
  sights: Sight[];
};
```

---

## 6. Тестовые данные

Создать файл:

```text
src/data/selsovets.ts
```

В нём создать массив из 14 сельсоветов.

Пример структуры:

```ts
import type { Selsovet } from "../types/selsovet";

export const selsovets: Selsovet[] = [
  {
    id: "selsovet-01",
    name: "Сельсовет №1",
    description:
      "Краткое тестовое описание сельсовета. Здесь в будущем будет информация о населённых пунктах, истории и особенностях территории.",
    sights: [
      {
        id: "sight-01-01",
        title: "Достопримечательность №1",
        description:
          "Тестовое описание достопримечательности. В будущем здесь можно указать памятник, родник, старую школу, историческое место или природный объект.",
      },
      {
        id: "sight-01-02",
        title: "Памятное место",
        description:
          "Тестовое описание памятного места на территории выбранного сельсовета.",
      },
    ],
  },
];
```

Нужно заполнить 14 объектов:

```text
selsovet-01
selsovet-02
selsovet-03
selsovet-04
selsovet-05
selsovet-06
selsovet-07
selsovet-08
selsovet-09
selsovet-10
selsovet-11
selsovet-12
selsovet-13
selsovet-14
```

У каждого сельсовета должно быть 1–2 тестовые достопримечательности.

---

## 7. Компонент DistrictMap

Создать компонент:

```text
src/components/DistrictMap/DistrictMap.tsx
```

Компонент должен принимать props:

```ts
type DistrictMapProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};
```

Задачи компонента:

1. Отобразить SVG-карту из файла `src/assets/karta.svg`.
2. Сделать области карты кликабельными.
3. При клике по области получить `data-id`.
4. Вызвать `onSelect(id)`.
5. Выбранной области добавить визуальное состояние `selected`.
6. При наведении подсвечивать область.
7. Поддержать выбор с клавиатуры: Enter и Space должны выбирать область.

Рекомендуемый способ реализации:

- Импортировать SVG как raw-строку через Vite:

```ts
import mapSvg from "../../assets/karta.svg?raw";
```

- Вставить SVG через `dangerouslySetInnerHTML`.
- Использовать event delegation на контейнере карты.
- Клик обрабатывать только по элементам, у которых есть `data-id`.
- После изменения `selectedId` обновлять CSS-класс выбранного SVG-элемента.

Важно: если будет выбран другой способ подключения SVG, он всё равно должен позволять кликать именно по отдельным `path`, а не по всей картинке целиком.

Пример логики клика:

```ts
const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement;
  const region = target.closest<SVGElement>("[data-id]");

  if (!region) {
    return;
  }

  const id = region.dataset.id;

  if (id) {
    onSelect(id);
  }
};
```

---

## 8. CSS для карты

Создать файл:

```text
src/components/DistrictMap/DistrictMap.css
```

Добавить стили для SVG-областей:

```css
.district-map {
  width: 100%;
  max-width: 820px;
}

.district-map svg {
  display: block;
  width: 100%;
  height: auto;
}

.district-map .map-region,
.district-map [data-id] {
  cursor: pointer;
  transition: fill 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.district-map .map-region:hover,
.district-map [data-id]:hover {
  opacity: 0.85;
}

.district-map .map-region.selected,
.district-map [data-id].selected {
  filter: brightness(0.85);
  stroke: #2b1a0e;
  stroke-width: 4;
}

.district-map .map-region:focus,
.district-map [data-id]:focus {
  outline: none;
  stroke: #111827;
  stroke-width: 4;
}
```

Если SVG уже содержит свои цвета, не обязательно полностью переопределять `fill`. Главное — чтобы hover и selected были визуально заметны.

---

## 9. Компонент SelsovetInfoPanel

Создать компонент:

```text
src/components/SelsovetInfoPanel/SelsovetInfoPanel.tsx
```

Props:

```ts
import type { Selsovet } from "../../types/selsovet";

type SelsovetInfoPanelProps = {
  selsovet: Selsovet | null;
};
```

Поведение:

Если сельсовет не выбран, показать текст:

```text
Выберите сельсовет на карте, чтобы увидеть достопримечательности.
```

Если сельсовет выбран, показать:

```text
Название сельсовета
Описание
Список достопримечательностей
```

Для каждой достопримечательности вывести:

```text
Название
Описание
```

---

## 10. App.tsx

В `App.tsx` реализовать состояние выбранного сельсовета:

```ts
const [selectedSelsovetId, setSelectedSelsovetId] = useState<string | null>(null);
```

Найти выбранный сельсовет:

```ts
const selectedSelsovet =
  selsovets.find((selsovet) => selsovet.id === selectedSelsovetId) ?? null;
```

Отобразить layout:

```text
Слева: интерактивная карта
Справа: информационная панель
```

---

## 11. Общий дизайн страницы

Сделать аккуратную базовую страницу:

1. Заголовок:

```text
Интерактивная карта Куюргазинского района
```

2. Подзаголовок:

```text
Выберите сельсовет на карте, чтобы посмотреть достопримечательности и памятные места.
```

3. Layout:

- на десктопе карта слева, панель справа;
- на мобильном карта сверху, панель снизу.

Пример CSS-идеи:

```css
.app {
  min-height: 100vh;
  padding: 32px;
  background: #f7f1e8;
  color: #24160d;
}

.app__content {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 24px;
  align-items: start;
}

@media (max-width: 900px) {
  .app__content {
    grid-template-columns: 1fr;
  }
}
```

---

## 12. README.md

Создать `README.md` с инструкцией:

```text
# Интерактивная карта Куюргазинского района

## Запуск
npm install
npm run dev

## Сборка
npm run build

## Где лежит SVG-карта
src/assets/karta.svg

## Где редактировать данные сельсоветов
src/data/selsovets.ts

## Как добавить достопримечательность
Нужно открыть src/data/selsovets.ts и добавить объект в массив sights нужного сельсовета.

## Как заменить тестовые названия на реальные
Нужно сопоставить технические id selsovet-01...selsovet-14 с реальными сельсоветами и заменить поле name.

## Важно
SVG-карта должна содержать data-id у каждой кликабельной области.
```

---

## 13. Критерии готовности

Задача считается выполненной, если:

1. Проект создаётся и запускается через:

```bash
npm install
npm run dev
```

2. На странице отображается SVG-карта из файла `karta.svg`.
3. Карта не отображается как обычная некликабельная картинка — кликабельными должны быть отдельные области SVG.
4. При наведении область визуально подсвечивается.
5. При клике по области справа появляется информация о выбранном сельсовете.
6. Выбранная область визуально отличается от остальных.
7. Данные берутся из `src/data/selsovets.ts`.
8. В проекте есть 14 тестовых сельсоветов.
9. Проект не использует backend и базу данных.
10. Проект адаптирован под мобильный экран.
11. В README есть инструкция по запуску и редактированию данных.

---

## 14. Что не делать в этой задаче

Не нужно:

1. Делать backend.
2. Делать авторизацию.
3. Делать админку.
4. Подключать настоящие онлайн-карты.
5. Использовать Leaflet, Mapbox или Яндекс.Карты.
6. Искать реальные достопримечательности.
7. Менять форму SVG-карты.
8. Делать несколько страниц.
9. Загружать данные с сервера.

Главная цель — получить рабочий прототип интерактивной SVG-карты.

---

## 15. Дальнейшее развитие после MVP

После первого рабочего прототипа можно будет добавить:

1. Реальные названия сельсоветов.
2. Настоящие достопримечательности.
3. Фото мест.
4. Отдельную страницу каждого сельсовета.
5. Фильтры по типам мест:
   - природа;
   - история;
   - памятники;
   - родники;
   - старые здания;
   - места памяти.
6. Поиск по достопримечательностям.
7. Маршруты по району.
8. Админку для редактирования данных.
9. Хранение данных в Supabase, Strapi или Directus.
