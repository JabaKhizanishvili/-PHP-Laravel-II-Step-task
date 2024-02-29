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
}) {

    console.log(books);

     const [values, setValues] = useState({
    name: "",
    status: "",
    release_date: "",
    author: [],
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
    router.post('/adbok', values)
      }

    return (
        <>
            <Head title="AddBook" />
             <h2>show Book</h2>
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
                                    <td className="p-2">edit</td>
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
