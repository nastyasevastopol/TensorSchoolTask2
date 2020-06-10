export class DataSet{
    constructor(options) {
        this.options = {
            host: 'http://localhost:8080/api/',
            // model: options.model,
            object: options.object
        }
    }
/**
 * 
 * @param {*} query 
 * @param {*} options 
 * @param {object} params {page:1, limit:5}
 */
//     toModel(something){
//         return new (this.options.model)(something);
//     }
    /**
     * 
     * @param {string} query специальная часть запроса
     * @param {*} options method,  headers, body
     * @param {object} params {page:1, limit:5}
     * @returns {Promise} ответ от сервера
     */
    query(query, options, params){
        let url = new URL(this.options.host);
        url.pathname += query;
        for (let index in params){
            url.searchParams.set(index, params[index]);
        }
        return fetch(url, options)
            .then( (response) => response.json());
    }
    /**
     * 
     * @param {Object} data информация, которую надо добавить в бд
     * @returns {Promise} ответ от сервера
     */
    create(data){
        return this.query(`${this.options.object}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
            body: JSON.stringify(data)
        });
    }
    /**
     * @param {Number} id id человека, данные которого необходимо считать
     * @returns {Promise} ответ от сервера
     */
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
    /**
     * @param {Number} id id человека, данные которого необходимо изменить
     * @param {Object} newData новая информация информация, которая заменит онформацию о человеке
     * @returns {Promise} ответ от сервера
     */
    update(id, newData){
        return this.query(
            `${this.options.object}/${id}`, 
            {
                method: 'PATCH',
                body: newData
            });
    }
    /**
     * @param {Number} id id человека, которого необходимо удалить из бд
     * @returns {Promise} ответ от сервера
     */
    delete(id){
        return this.query(
            `${this.options.object}/${id}`, 
            {
                method: 'DELETE',
            });
    }
    /**
     * @param {Number} page страница, которую необходимо открыть
     * @param {Number} limit количество записей на странице
     * @returns {Promise} ответ от сервера
     */
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
    }
}