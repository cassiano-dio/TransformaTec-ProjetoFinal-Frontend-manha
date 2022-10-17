import http from "../http-common"

class ItemDataService {

    getAll(){

        return http.get("/items");

    }

    get(id){

        return http.get(`/items/${id}`);

    }

    create(data){

        return http.post("/items/", data);

    }

    update(id, data){

        return http.put(`/items/${id}`, data);

    }

    delete(id){

        return http.delete(`/items/${id}`);

    }

    finbByLoggedInUser(){
        return http.get("/items");
    }

    findByUserName(username){

        return http.get(`/admin/items/user?username=${username}`);

    }

    findByStatus(status){

        return http.get(`/items/status?status=${status}`);

    }
}

export default new ItemDataService;