'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// UI Routes
Route.get('/', ({ response }) => {
  return response.redirect('/komik')
})
Route.get('/komik', 'KomikController.index')
Route.get('/komik/create', 'KomikController.create')
Route.get('/komik/:id/edit', 'KomikController.edit')
Route.post('/komik', 'KomikController.store')
Route.put('/komik/:id', 'KomikController.update')
Route.delete('/komik/:id', 'KomikController.destroy')

// API Routes
Route.group(() => {
  Route.get('/komik', 'KomikController.getAll')
  Route.get('/komik/:id', 'KomikController.getOne')
  Route.post('/komik', 'KomikController.store')
  Route.put('/komik/:id', 'KomikController.update')
  Route.delete('/komik/:id', 'KomikController.destroy')
}).prefix('api/v1')
