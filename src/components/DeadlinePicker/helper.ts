const getTwoDigitsString = (int: number): string => {
    if ((int > 9) && (int < 100)) {
        return String(int);
    } else if (int <= 9) {
        return '0' + int;
    } else {
        return '00';
    }
}

const getFullMonth = (date: Date): string =>
    getTwoDigitsString(date.getMonth() + 1);

const getFullDay = (date: Date): string =>
    getTwoDigitsString(date.getDate());

export const getInputDate = (date?: Date): string | undefined =>
    date ? `${date.getFullYear()}-${getFullMonth(date)}-${getFullDay(date)}` : '';