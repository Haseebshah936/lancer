const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
// export const Years = range(currentYear, currentYear - 50, -1);
const YearsTemp = range(currentYear, currentYear - 50, -1);
const yaers = YearsTemp.map((y) => {
    return (
        { label: y.toString(), year: y }
    )
})
console.log(yaers);
export const Years = yaers;
