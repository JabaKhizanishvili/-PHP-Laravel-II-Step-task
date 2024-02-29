<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Book;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'books' => Book::with('authors')->get()->all(),
        'isAdmin' => Auth::user() ? Auth::user()->role : 0,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

  Route::middleware(['checkRole'])->group(function () {

    Route::get('/addbook', [ProfileController::class, 'addBook'])->name('addbook');
    Route::post('/edbok', [ProfileController::class, 'edbok'])->name('edbok');
    Route::post('/adbok', [ProfileController::class, 'adbok'])->name('adbok');
    Route::get('/showbooks/{author?}/{book?}', [ProfileController::class, 'showbook'])->name('showbook');
    Route::get('/delbook/{bookid?}', [ProfileController::class, 'delbook'])->name('delbook');
    Route::get('/books/{bookId}', [ProfileController::class, 'editBook'])->name('editbook');
   });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';