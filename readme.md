| HTTP Method | URI path                                             | Description                            | JSON |
|-------------|------------------------------------------------------|----------------------------------------|------|
| INDEX       | INDEX                                                |                                        |      |
| GET         | /                                                    | Index page (Homepage)                  |      |
|             |                                                      |                                        |      |
| AUTH        | AUTH                                                 |                                        |      |
| GET         | /registro                                            | Sign-up User form render               |      |
| POST        | /registro                                            | Sign-up User form handler              |      |
| GET         | /iniciar-sesion                                      | Log-in User form render                |      |
| POST        | /iniciar-sesion                                      | Log-in User form handler               |      |
| GET         | /cerrar-sesion                                       | Log-out User                           |      |
|             |                                                      |                                        |      |
| USER        | USER                                                 |                                        |      |
| GET         | /usuario/{user_id}                                   | User details                           |      |
| GET         | /usuario/{user_id}/editar                            | Edit User form render                  |      |
| POST        | /usuario/{user_id}/editar                            | Edit User form handler                 |      |
| POST        | /usuario/{user_id}/eliminar                          | Delete User                            |      |
|             |                                                      |                                        |      |
| CLOOB       | CLOOB                                                |                                        |      |
| GET         | /cloob/lista                                         | Book Club list                         |      |
| GET         | /cloob/lista/{genero}                                | Book Club list -filtered- form render  |      |
| POST        | /cloob/lista/{genero}                                | Book Club list -filtered- form handler |      |
| GET         | /cloob/crear                                         | New Book Club form render              |      |
| POST        | /cloob/crear                                         | New Book Club form handler             |      |
| GET         | /cloob/{cloob_id}                                    | Book Club details                      |      |
| GET         | /cloob/{cloob_id}/editar                             | Edit Book Club form render             |      |
| POST        | /cloob/{cloob_id}/editar                             | Edit Book Club form handler            |      |
| POST        | /cloob/{cloob_id}/eliminar                           | Delete Book Club                       |      |
| POST        | /cloob/{cloob_id}/unirse/{user_id}                   | Add User to Book Club                  |      |
|             |                                                      |                                        |      |
| EVENT       | EVENT                                                |                                        |      |
| GET         | /cloob/{cloob_id}/evento/crear-1                     | New Event form render (Select Book)    |      |
| POST        | /cloob/{cloob_id}/evento/crear-1                     | New Event form handler (Select Book)   |      |
| GET         | /cloob/{cloob_id}/evento/crear-2                     | New Event form render (General Info)   |      |
| POST        | /cloob/{cloob_id}/evento/crear-2                     | New Event form handler (General Info)  |      |
| GET         | /cloob/{cloob_id}/evento/{event_id}                  | Event details                          |      |
| GET         | /cloob/{cloob_id}/evento/{event_id}/editar           | Edit Event form render                 |      |
| POST        | /cloob/{cloob_id}/evento/{event_id}/editar           | Edit Event form handler                |      |
| POST        | /cloob/{cloob_id}/evento/{event_id}/eliminar         | Delete Event                           |      |
| POST        | /cloob/{cloob_id}/evento/{event_id}/unirse/{user_id} | Add User to Event                      |      |
|             |                                                      |                                        |      |
| API         | API                                                  |                                        |      |
| GET         | /api/books                                           | Fetch Google Books API                 | YES  |