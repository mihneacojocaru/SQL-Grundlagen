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


// let modal = document.querySelector('.add-modal');
// let modalEdit = document.querySelector('.edit-modal');

// let btnAddBook = document.getElementById('addBook');
// let btnEdit = document.querySelector('table');


// btnAddBook.addEventListener('click',()=> modal.style.display='block');


// modal.addEventListener('click', e => {
//     let obj = e.target;
//     if(obj.textContent == 'X' || obj.textContent == 'Cancel' || obj.className == 'backdrop'){
//         modal.style.display = 'none';
//     }
// });

// btnEdit.addEventListener('click', (e)=>{
//     let obj = e.target;
//     if(obj.className == 'material-icons btnEdit'){
//         modalEdit.style.display='block';
//     }
// });

// modalEdit.addEventListener('click', e => {
//     let obj = e.target;
//     if(obj.textContent == 'X' || obj.textContent == 'Cancel' || obj.className == 'backdrop'){
//         modalEdit.style.display = 'none';
//     }
// });



