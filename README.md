Рабочую версию приложения можно посмотреть по ссылке: https://atlanticrev.github.io/takeoff_stuff_issue/,
никакой сборки не требуется.

Уточню несколько деталей по выполнению задания:

* Я не стал использовать в работе ни webpack модули (сборка бандла) ни нативные ES6 модули, 
ограничился обычными <script> тегами, что бы не перегружать код. Если требуется использовать
что-то из перечисленного, могу поправить.

* CSS стили все находятся в .css файле ибо их не много, опять-же, если требуется подключить SCSS,
могу внести правки.

* Я предпочел написать все на чистом JS, что-бы избежать лишних зависимостей и не подключать
их для такой небольшой задачи.

* С авторизацией не совсем понял требование, нужно просто сымитировать запрос/ответ или все таки реализовать настоящую?