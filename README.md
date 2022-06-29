# raida_feedback

https://www.figma.com/file/aPRWGTALpvV2YMxuOOfmnS/internship-Survey?node-id=111%3A2

<p>Для установки зависимостей в Venv для Python требуется выполнить: <code>pip install -r requirements.txt</code> </p>

<p>Для единообразия подключения в Django базы даных PostgreSQL, 
разработчикам рекомендуется на локальном dev-хосте внести запись в файл hosts: postgresqlhost ip_addr_Pgsql </p>

## Алгоритм работы Frontend с API:

1. Запрашиваем список проектов и сохраняем, что требуется из ответа

<pre>
# Запрос: http://127.0.0.1:8000/projects 
# Ответ:
# [
#   {
#     "name": "Проект 1",
#     "description": "Описание проекта 1",
#     "id": 1
#   }
# ]
</pre>

2. Запрашиваем списки вопросов (в каждом проекте может быть несколько списков вопросов)
<pre>
# Запрос: http://127.0.0.1:8000/questions_list
# Ответ:
# [
#     {
#         "title": "Question list True False",
#         "description": "Question list True False",
#         "project": 1,
#         "id": 1
#     }
# ]
</pre>

3. Запрашиваем список типов шаблонов вопросов

<pre>
# Запрос: http://127.0.0.1:8000/templates/
# Ответ:
# [
#     {
#         "name": "Scale",
#         "description": "Цифровая шкала для голосования",
#         "id": 2
#     },
#     {
#         "name": "True_false",
#         "description": "Шаблон вопроса для бинарного голосания",
#         "id": 1
#     }
# ]
</pre>

4. Запрашиваем перечень вопросов в списке вопросов с уникальным id, полученным в п.2
(в каждом перечне вопросов может быть один или более вопросов с любыми шаблонами, но в рамках одного проекта)

<pre>
# Запрос: http://127.0.0.1:8000/questions/?questionlist=1
# Ответ:
# [
#   {
#     "name": "Like/Dislike",
#     "description": "Like or Dislike question",
#     "question_list": 1,
#     "template": 1,
#     "id": 1
#   }
# ]
</pre>

5. Запрашиваем сведения аггрегированных значений вопроса с уникальным id, полученным в п. 4
 (если в ответе пустой словарь, то не было ни одного ответа на вопрос или вопрос с таким id не существует)

<pre>
# Запрос: http://127.0.0.1:8000/answer/?question=3
# Ответ:
# [
# 	{
#     "rating__sum": 3.5, # суммарный рейтинг всех ответов по данному вопросу (float)
#     "rating__count": 3, # число ответов (integer)
#     "question_id": 3    # уникальный id вопроса (integer)
# 	}
# ]
</pre>
