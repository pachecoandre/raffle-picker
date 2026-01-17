export const currency = (amount: number = 0) => {
  return amount.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};
