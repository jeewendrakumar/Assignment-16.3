let books = [
    {
        "id": "1",
        "title": "Philosopher's Stone",
        "author": "asasas"
    }, {
        "id": "2",
        "title": "Chamber of Secrets",
        "author": "asasasasa"
    }, {
        "id": "3",
        "title": "Prisoner of Azkaban",
        "author": "asasas"
    }
];

let idCounter = 100;
export function addBook(title, author) {
    idCounter++;
    const book = {
        "id": "" + idCounter,
        "title": title,
        "author": author
    };

    books.push(book);
    return book;
}

export function getBooks() {
    return books;
}

export function deleteBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books.splice(i, 1);
        }
    }
}
