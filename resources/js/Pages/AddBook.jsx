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
             <h2>add Book</h2>

             <form className="container" onSubmit={handleSubmit}>
                <label htmlFor="name">name:</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name" type="text" placeholder="name"
                    value={values.name} onChange={handleChange}
                >
                </input>
      <label htmlFor="status">status</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="status" type="number" placeholder="status"
                    value={values.status} onChange={handleChange}
                >
                </input>


      <label htmlFor="status">release date</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="release_date" type="date" placeholder="release_date"
                    value={values.release_date} onChange={handleChange}
                >
                </input>



                <label htmlFor="email">Authors</label>

                 <Select
    defaultValue={[]}
                    isMulti
                    onChange={(e) => {
                        // console.log(e);
                        values.author = e;
                    }}
    name="author"
            options={author.map((e, i) => {
            return {
            id: e.id,
            value: e.name,
            label: e.name,
        }
    })}
    className="basic-multi-select"
    classNamePrefix="select"
  />

    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
    type="submit">
      Submit
                </button>

    </form>
        </>
    );
}
