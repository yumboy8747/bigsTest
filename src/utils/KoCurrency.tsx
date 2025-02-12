export const KoCurrency = (number:number) => {
  return new Intl.NumberFormat('ko-KR', {  currency: 'KRW' }).format(number);
};