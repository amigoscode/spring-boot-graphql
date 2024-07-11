"use client"

import {useEffect, useState} from "react"

const booksPictures: string[] = [
    "https://images.unsplash.com/photo-1589462135796-2b46e4bdd7fe?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?q=80&w=2741&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

type Book = {
    id: number,
    name: string,
    pageCount: number
    author: Author
}

type Author = {
    name: string
}


const query = `
    query {
        books {
            id
            name
            pageCount
            author {
                name
            }
        }
    }
`

export default function Home() {

    const [ books, setBooks] =
        useState<Book[]>([]);
    const [loading, setLoading] =
        useState<Boolean>(true);

    useEffect(() => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query})
        }
        fetch("http://localhost:8080/graphql", options)
            .then(res => res.json())
            .then(data => setBooks(data.data.books))
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    });

    if (loading) {
        return "loading..."
    }

    if (books.length === 0) {
        return "No books available."
    }

    return (
        <div className="flex flex-col content-center items-center bg-gray-100">
            <div className="flex flex-row min-h-screen items-center justify-center gap-4">
                { books.map((book: Book, index: number) => (
                    <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img className="w-full rounded-lg object-cover object-center"
                             src={booksPictures[index]}
                             alt={book.name}/>
                        <div>
                            <div className="my-6 flex items-center justify-between px-4">
                                <p className="font-bold text-gray-500">{book.name}</p>
                                <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">{book.pageCount} Pages</p>
                            </div>
                            <div className="my-4 flex items-center justify-between px-4">
                                <p className="text-sm font-semibold text-gray-500">{book.author.name}</p>
                                <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">ID: {book.id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
