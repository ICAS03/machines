import apiClient from "../../utils/api-client";

export function addToOrderAPI() {
    return apiClient.post("/order/checkout")
}

export function getOrderAPI() {
    return apiClient.get("/order")
}