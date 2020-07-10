class UI {
    static addBookList(title, author, isbn) {

        let tr = document.createElement('tr');
        tr.innerHTML = `<tr>
            <td>${title}</td>
            <td>${author}</td>
            <td>${isbn.toString().toUpperCase()}</td>
            <td class="delete">Delete</td>
        </tr>`;

        let tbody = document.getElementById('book-list');
        tbody.appendChild(tr);

    }

    static unfinished(title, author, isbn) {
        let ids = '';
        if (title.value === '')
            ids += title.id;
        if (author.value === '')
            ids += ` ${author.id}`;
        if (isbn.value === '')
            ids += ` ${isbn.id}`;

        return ids;
    }

    static myRemove() {
        document.querySelectorAll('.delete').forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.parentNode.remove();
            })
        });
    }

    static myFind(isbnValue) {
        const lest = document.querySelectorAll('.delete');
        let isbool = true;

        if(lest) {
            lest.forEach(element => {
                const isbn = element.parentNode.querySelector('td:nth-child(3)');
                if(isbnValue.toUpperCase() == isbn.innerText) {
                    isbool = false;
                    element.parentNode.style.backgroundColor = 'rgb(43, 240, 25)';
                    document.querySelectorAll('input[type="text"]').forEach(input => {
                        input.addEventListener('focus', () => {
                            element.parentNode.style.backgroundColor = 'unset';
                        })
                    })
                }
            });
        }

        return isbool;
    }
}

document.querySelector('#submit').addEventListener('click', () => {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const isbn = document.querySelector('#isbn');
    const isBool = UI.unfinished(title, author, isbn);

    if (isBool) {
        const ids = isBool.split(' ');
        for (let id of ids) {
            if (id !== '') {
                document.querySelector(`#${id}`).style.border = '0.5px solid red';
            }
        }
    } else {
        if (UI.myFind(isbn.value)) {
            UI.addBookList(title.value, author.value, isbn.value);
            UI.myRemove();
        } else alert('bunday (ISBN) dagi maxsulot bor');
    }
})

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.border = '0.5px solid rgb(186,186,186)';
    })
})
