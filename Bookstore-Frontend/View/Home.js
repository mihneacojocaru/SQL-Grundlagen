import Data from "../Data/data.js";

export default class ViewHome{
    constructor(){
        this.root = document.getElementById('root');
        this.root.innerHTML += this.htmlPage();
        this.modals();
        this.populateTable();
        this.getBooks();
    }

    htmlPage = () => {
        return `
        <div class="container">
        <div class="table-header">
            <h2>Book Store SQL</h2>
            <button id="addBook"><i id="addBook" class="material-icons">add_circle</i>Add New Book</button>
        </div>
        <table>
            <thead>
                <tr class="thead-styler">
                    <th>ID</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Release Date</th>
                    <th>ISBN</th>
                    <th>Action</th>
                </tr>  
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    </div>
    <div class="add-modal">
        <div class="backdrop"></div>
        <div class="add-book">
            <div class="add-head">
                <h3>Add Book</h3>
                <span>X</span>
            </div>
            <div class="add-body">
                <div class="title form-input">
                    <label for="">Book Title</label>
                    <input id="titleInput" type="text">
                </div>
                <div class="author form-input">
                    <label for="">Author</label>
                    <input id="authorInput" type="text">
                </div>
                <div class="release_date form-input">
                    <label for="">Release Date</label>
                    <input id="dateInput" type="date">
                </div>
                <div class="isbn form-input">
                    <label for="">ISBN #</label>
                    <input id="isbnInput" type="text">
                </div>
            </div>
            <div class="add-footer">
                <button>Cancel</button>
                <button>Add</button>
            </div>
        </div>
    </div>
    <div class="edit-modal">
        <div class="backdrop"></div>
        <div class="edit-book">
            <div class="edit-head">
                <h3>Edit Book</h3>
                <span>X</span>
            </div>
            <div class="edit-body">
                <div class="title form-input">
                    <label for="">Book Title</label>
                    <input id="titleInputE" type="text">
                </div>
                <div class="author form-input">
                    <label for="">Author</label>
                    <input id="authorInputE" type="text">
                </div>
                <div class="release_date form-input">
                    <label for="">Release Date</label>
                    <input id="dateInputE" type="date">
                </div>
                <div class="isbn form-input">
                    <label for="">ISBN #</label>
                    <input id="isbnInputE" type="text">
                </div>
            </div>
            <div class="edit-footer">
                <button>Cancel</button>
                <button id="updateConfirm">Save</button>
            </div>
        </div>
    </div>
    <div class="delete-modal">
        <div class="backdrop"></div>
        <div class="delete-book">
            <div class="delete-head">
                <h3>Delete Book</h3>
                <span>X</span>
            </div>
            <div class="delete-body">
                <p>Are you sure you want to delete this item?</p>
                <p>This action cannot be undone</p>
            </div>
            <div class="delete-footer">
                <button>Cancel</button>
                <button id="delConfirm">Delete</button>
            </div>
        </div>
    </div>
        `;
    }
    tableRow = obj => {
        return  `
                <tr>
                    <td>${obj.id}</td>
                    <td>${obj.title}</td>
                    <td>${obj.author}</td>
                    <td>${obj.releaseDate}</td>
                    <td>${obj.isbnNo}</td>
                    <td>
                        <span id="editIcon" class="material-icons btnEdit">edit</span>
                        <span id="delIcon" class="material-icons btnDelete">delete</span>
                    </td>
                </tr>
                `;
    }

     eventHandler = async (e)=>{
        let obj = e.target;
        //del function
        if(obj.id == 'delIcon'){
            let id = parseInt(obj.parentElement.parentElement.children[0].textContent);
            const d = new Data();
            let delConfirm = document.getElementById('delConfirm');
            delConfirm.onclick = ()=> {
                d.deleteBookApi(id);
                location.reload();
            }
        }else if(obj.textContent =='Add'){
            let title = document.getElementById('titleInput');
            let author = document.getElementById('authorInput');
            let date = document.getElementById('dateInput');
            let isbn = document.getElementById('isbnInput');

            let obj = {};
            
            obj.title = title.value;
            obj.author = author.value;
            obj.releaseDate = date.value;
            obj.isbnNo = isbn.value;

            await this.addBook(obj);
        }else if(obj.id == 'editIcon'){
            let title = document.getElementById('titleInputE');
            let author = document.getElementById('authorInputE');
            let date = document.getElementById('dateInputE');
            let isbn = document.getElementById('isbnInputE');
            
            let newBook = {};

            newBook.id = parseInt(obj.parentElement.parentElement.children[0].textContent);
            newBook.title = obj.parentElement.parentElement.children[1].textContent;
            newBook.author = obj.parentElement.parentElement.children[2].textContent;
            newBook.releaseDate = obj.parentElement.parentElement.children[3].textContent;
            newBook.isbnNo = obj.parentElement.parentElement.children[4].textContent;
            
            title.value = newBook.title;
            author.value = newBook.author;
            date.value = newBook.releaseDate;
            isbn.value = newBook.isbnNo;

            let update = document.getElementById('updateConfirm');
            update.onclick = () => {

                newBook.title = title.value;
                newBook.author = author.value;
                newBook.releaseDate = date.value;
                newBook.isbnNo = isbn.value;

                this.updateBook(newBook);
                
            }
        }
    }
    
//+++ Dynamic HTML

    populateTable = async ()=>{

        let tBody = document.getElementById('tableBody');
        tBody.innerHTML = '';
        let items = await this.getBooks();

        items.forEach(e => {
            tBody.innerHTML += this.tableRow(e);
        });

        this.root.addEventListener('click',this.eventHandler);
        
    }

    delEntry = async (id) => {
        await this.delBook(id);
        await this.populateTable();
    }

//+++ API Functions

    getBooks = async () => {
        const apiData = new Data();
        const books = await apiData.getBooks();
        return books;
    }

    delBook = async (id) => {
        const apiData = new Data();
        await apiData.delBook(id);
    }

    addBook = async(book) => {
        const apiData = new Data();
        let r = await apiData.addBook(book);
        if( r == 'Item succesfuly posted'){
            location.reload();
        }else{
            alert(r.error.message);
        }
    }

    updateBook = async(book) => {
        const apiData = new Data();
        let d = await apiData.updateBook(book);

        if(d == 'From put with love'){
            location.reload();
        }else{
            console.warn(d);
        }
    }

//+++ Frontend Modals

    modals = () => {
        let all = document.querySelector('body');

        let modalAdd = document.querySelector('.add-modal');
        let modalEdit = document.querySelector('.edit-modal');
        let modalDelete = document.querySelector('.delete-modal');


        all.addEventListener('click', e=>{
        let obj = e.target;
        if(obj.id == 'addBook'){
            modalAdd.style.display = 'block';
        }else if(obj.className == 'material-icons btnEdit'){
            modalEdit.style.display = 'block';
        }else if(obj.className == 'material-icons btnDelete'){
            modalDelete.style.display = 'block';
        }else if(obj.textContent == 'X' || obj.textContent == 'Cancel' || obj.className == 'backdrop'){
            modalAdd.style.display ='none';
            modalEdit.style.display ='none';
            modalDelete.style.display ='none';
        }
        });
    }
}