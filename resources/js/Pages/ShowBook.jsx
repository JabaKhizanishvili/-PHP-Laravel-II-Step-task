import { Link, Head, usePage, router } from "@inertiajs/react";
import { useState } from 'react'
import Select from 'react-select';

export default function AddBook({
    auth,
    author,
    laravelVersion,
    phpVersion,
    isAdmin,
    books,
    name,
    authorfilter
}) {


     const [values, setValues] = useState({
    name: name,
    author: authorfilter,
     })

    function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setValues(values => ({
        ...values,
        [key]: value,
    }))
  }

      function handleSubmit(e) {
    e.preventDefault()
    router.get('/showbooks', values)
      }

    return (
        <>
            <Head title="AddBook" />
            <h2>show Book</h2>

            <h2>filter book</h2>

             <form className="container" onSubmit={handleSubmit}>
                <label htmlFor="name">name:</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name" type="text" placeholder="name"
                    value={values.name} onChange={handleChange}
                >
                </input>


                <label htmlFor="email">Authors</label>
 <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="author" type="text" placeholder="author"
                    value={values.author} onChange={handleChange}
                >
                </input>


    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
    type="submit">
      filter
                </button>

    </form>


<table className="bg-red-100 table-auto">
  <thead>
    <tr>
      <th>name</th>
      <th>status</th>
      <th>Year</th>
      <th>authors</th>
    </tr>
  </thead>
                <tbody>
                    {
                        books.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.status}</td>
                                    <td>{e.release_date}</td>
                                    <td>
                                        {
                                            e.authors != null ? e.authors.map(
                                             (e,i)=> e.name + " " + e.lastname + ' '
                                         ) : ''
                                        }
                                    </td>
                                    <td className="p-2"><Link preserveScroll href={`/books/${e.id}`}>edit</Link></td>
                                    <td className="p-2"><Link preserveScroll href={`/delbook/?bookid=${e.id}`}>del</Link></td>
                                </tr>
                            )
                        })
                    }

  </tbody>
</table>
                    </>
    );
}
