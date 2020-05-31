export class DataSet{
    constructor(options) {
        this.options = {
            host: 'http://localhost:8080/api/',
            // model: options.model,
            object: options.object
        }
        this.listElem = undefined;
    }
/**
 * 
 * @param {*} query 
 * @param {*} options 
 * @param {object} params {page:1, limit:5}
//  */
//     toModel(something){
//         return new (this.options.model)(something);
//     }
    query(query, options, params){
        let url = new URL(this.options.host);
        url.pathname += query;
        for (let index in params){
            url.searchParams.set(index, params[index]);
        }
        return fetch(url, options)
            .then( (response) => response.json());
    }
    create(data){
        return this.query(`${this.options.object}`, {
            method: 'POST',
            body: JSON.stringify(data) //data - было так
        });
    }
    read(id){
        return this.query(
            `${this.options.object}/${id}`, 
            {
                method: 'GET'
            }
        );
        // .then(result => {
        //     return this.toModel(result)
        // });
    }
    update(id, newData){
        return this.query(
            `${this.options.object}/${id}`, 
            {
                method: 'PATCH',
                body: newData
            });
    }
    delete(id){
        return this.query(
            `${this.options.object}/${id}`, 
            {
                method: 'DELETE',
            });
    }
    list(page, limit){
        return this.query(
            `${this.options.object}`, 
            {
                method: 'GET'
            },
            {
                '_page': page,
                '_limit': limit
            });
            // .then(results => {
            //      return results.map((result) => this.toModel(result));
            //     }
            // );
    }
    // allPeopleMount() {
    //     return this.query(
    //             `${this.options.object}`, 
    //             {
    //                 method: 'GET'
    //             },)
    //             .then(response => {
    //                 //  response.map((result) => this.toModel(result));
    //                  response.length;
    //                 }
    //             );
    //             // .then(response => {
    //             //     return response.length;
    //             // });
    // }
}