<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Support\Facades\Redis;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }


    public function addBook(Request $request){
        return Inertia::render('AddBook',
    [
      'author' => Author::all(),
    ]
);
    }

    public function adbok(Request $request){
    $book = new Book();
    $book->name = $request->input('name');
    $book->status = $request->input('status');
    $book->release_date = $request->input('release_date');
    $book->save();

    $authorsData = $request->post('author');
    $authorIds = collect($authorsData)->pluck('id')->toArray();
   $saved =  $book->authors()->attach($authorIds);
        return redirect()->route('showbook', ['success'=> $book->id]);

    }

    public function showbook(Request $request, Book $book){
    return Inertia::render('ShowBook',[
        'books'=>$book->with('authors')->get()->all()
    ]);
    }

    public function delbook(Request $request, Book $book){
         $book = Book::findOrFail($request->bookid);
        $book->delete();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}