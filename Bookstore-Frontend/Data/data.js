export default class Data{

    api(path, method = 'GET', body = null){
        let url = path;

        const options = {
            method,
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            },
        };

        if(body != null){
            options.body = JSON.stringify(body);
        }

        return fetch(url,options);
    }

    getBooks = async () => {
        try {
            const response = await this.api("http://localhost:3000/db/v1/books");
            
            if(response.status == 200){
                return response.json();
            }else{
                return Promise.reject('error');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteBookApi(id) {
        try {
          const response = await this.api(`http://localhost:3000/db/v1/books/${id}`,"DELETE");
          return response.json();
        } catch (error) {
          return Promise.reject(error);
        }
    }

    async addBook(item){
        try {
            const response = await this.api('http://localhost:3000/db/v1/books','POST',item);
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async updateBook(item){
        try {
            const response = await this.api('http://localhost:3000/db/v1/books','PUT',item);
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }

}