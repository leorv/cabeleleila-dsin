/*
1 - Não definido
2 - Cartão de crédito
3 - PIX
*/
export interface PaymentMethod {
    id: number;
    name: string;
    description: string;
}