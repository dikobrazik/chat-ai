export const pluralize = (
  count: number,
  [one, few, many]: [string, string, string],
) => {
  switch (new Intl.PluralRules("ru-RU").select(count)) {
    case "one":
      return one;
    case "many":
      return many;
    default:
      return few;
  }
};
