# Введение

Тут лежит модуль фронтенда для проекта РТК Мониторинг показателей. 

Сам модуль развёрнут с помощью react-create-app. Для того, чтобы начать работу, перейдите к соответствующему разделу:

## Терминал (или работа напрямую с node js)
Первым делом необходимо установить в системе node js и npm. При создании проекта использовались следующие версии:
* Nodejs: 10.15.0
* npm: 6.4.1
 
После установки необходимо выполнить в терминале команду 
```
npm install
``` 
после чего будут загружены необходимые модули для сборки проекта. Можно приступать кодить!

Для возможности сборки фронта в одном проекте для разных заказчиков сделано формирование путей для импорта компонентов и пути сборки для прода с использованием переменной CUSTOMER в файле .env

Поэтому пути для импорта нужно укзывать через алиасы созданные в config/webpack.config.js

### Для сборки проекта РТК Мониторинг 
```
CUSTOMER=rtk
```

Компоненты react в src/rtk. 

Сборка для прода будет в build/rtk

----

Для запуска проекта в dev режиме использовать команду 
```
npm start
```

Для сборки проекта для prod использовать команду 
```
npm run build
```
Проект будет собран в папку _build_

## Gradle

С проектом можно работать используя систему Gradle. При этом все команды выполняются из корневой папки проекта.

Для компиляции React приложения используется gradle-plugin который автоматически скачивает и использует дистрибутив NodeJS.

Для загрузки NodeJS и необходимых модулей выполнить команду 
```
gradlew frontend:npmInstall
```

Для запуска проекта в dev режиме использовать команду 
```
gradlew frontend:npmRunStart
```
**ВАЖНО**
Gradle к сожалению не умеет адекватно останавливать запущенный этой командой dev сервер, в связи с чем использование этой команды не рекомендуется.  

Для сборки проекта для prod использовать команду 
```
gradlew frontend:npmRunBuild
```
Проект будет собран в папку _build/app_

**ВАЖНО** Следует иметь ввиду, что при компиляции проекта с помощью Gradle по-умолчанию будет использована версия Node = 10.15.0. Если локально используемая в системе версия Node отличается, то при компиляции могут возникать ошибки связанные с тем, что зависимости, подтянутые в _node_modules_, несоответствуют используемой для компиляции версии Node. В общем, если при компиляции с помощью `npm run build` всё ок, а `gradlew frontend:npmRunBuild` внезапно начинает сыпать ошибками, то нужно выполнить команду `gradlew frontend:clean`. Исполнение этой команды выпилит _весь_ кэш сборок связанный с Node (включая файл package-lock.json и папку _node_modules_). Последующее выполнение команды `gradlew frontend:npmRunBuild` должно завершиться успешно (хоть и займёт много времени из-за отсутствия кэша).   

Для сборки zip архива, содержащего скомпилированную версию React-приложения, можно использовать команду
```
gradlew frontend:makeZip
```

### Docker
При наличии установленного docker, можно использовать ряд команд для запуска приложения в докеризированном окружении.
Так например, для развёртывания полного стэка приложения на локальном докере можно воспользоваться командой:
```
gradlew application:composeUp
```
При этом в докере будут развёрнуты все сервисы, необходимые для полноценного функционирования приложения. Само приложение будет доступно по адресу `http://localhost:80`. Для того чтобы остановить развёрнутое приложение можно использовать команду `gradlew application:composeDown` или `gradlew application:composeDownForced`

Для создания образа только фронтенда, можно использовать команду
```
gradlew frontend:dockerBuildImage
```
Полученный image будет иметь название **rtsmp/frontend:latest**, и его можно запустить штатными средствами docker.

 #### Nginx
 Для создания docker контейнера в качестве базы используется модифицированный образ nginx: в него добавляется curl для выполнения healthcheck.
 
 Конфигурация, используемая в nginx, находится в директории `frontend/nginx`:
 * nginx.conf - основные настройки
 * sites-enabled/rtsmp.conf - собственно конфиг фронта
 * nginxconfig.io - сюда вынесены детальные настройки server и proxy дабы не захламлять основной конфиг сайта
 
 Для адаптации конфига под нужды CI/CD следует обратить внимание на следующие строки файла _rtsmp.conf_:
 * `set $upstream http://backend:8080;` в блоке `location /api` - здесь указан хост backend сервиса в соответствии с тем, как его именует docker-compose
 * `server_name localhost;` - нужно будет поменять, указав алиасы тест и прод dns записей

# Default readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
