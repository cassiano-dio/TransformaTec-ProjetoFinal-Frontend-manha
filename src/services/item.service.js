import http from "../http-common";

class ItemDataService {


    getAll(){
        return  http.get("/items");
    }

    get(id){
        return http.get(`/items/${id}`);
    }

    create(item){
        return http.post("/items",item);
    }

    update(id, item){
        return http.put(`/items/${id}`, item);
    }

    delete(id){
        return http.delete(`/items/${id}`);
    }

    findUsername(username) {
        return http.get(`/admin/items/user?username=${username}`);
    }

}

export default new ItemDataService();