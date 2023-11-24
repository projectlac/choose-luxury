export default function formatMoney(money: string) {
  return new Intl.NumberFormat('vi-VN').format(+money);
}
