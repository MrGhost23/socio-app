const isArabic = (str: string) => {
  const arabic = /[\u0600-\u06FF]/;
  return arabic.test(str);
};

export default isArabic;
