import { Contract } from "app/models/contract-model";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 15);

export const data: Contract = {
    "id":"string",
    "company": "string",
    "client": "Dakota Rice",
    "dataInsert": new Date(),
    "dataExpiration": expirationDate,
    "descricao": "asdasd",
    "email": "paulohenrique@gmail.com",
    "sale": 2500,
    "seller": "Paulo",
}
