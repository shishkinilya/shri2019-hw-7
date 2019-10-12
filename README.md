# shri2019-hw-7
Приложение состоит из двух частей: серверной и клиентской.  
Для запуска серверной части необходимо:
1. Перейти в директорию server
2. Выполнить команду `yarn` / `npm install`
3. Запустить сервер командой `node app.js --path=/Absolute/Path/To/Directory/With/Repos`

 Для запуска клиентской части необходимо:
1. Перейти в директорию client
2. Выполнить команду `yarn` / `npm install`
3. Выполнить команду `yarn start`  / `npm start`

## Тестирование
### Unit тесты
Для запуска unit тестов необходимо выполнить следующие команды:  
`cd server`  
`yarn test`

### Интеграционные тесты
Перед запуском тестов необходимо запустить сервер с api:
* `cd server`
* `node app.js --path=/Абсолуютный путь к директории, содержащей данный репозиторий`  

Запустить клиентскую часть:
* `cd client`
* `yarn start`
 
Для запуска интеграционных тестов необходимо выполнить следующие команды:  
* `cd client`  
* `selenium-standalone start`  
* `cd tests/hermione-custom-commands && npm link && cd ../../ && npm link hermione-custom-commands`
* `yarn hermione`
