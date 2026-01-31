export const genSerialNumberSequence = (sequence: string): string => {
    let randomDigit = Math.floor(Math.random() * 10).toString();
    sequence += randomDigit;
    return sequence;
};

export const genRandomNumberSequence = (length: number): string => {
    let sequence = "";
    for (let i = 0; i < length; i++) {
        let randomDigit = Math.floor(Math.random() * 10).toString();
        sequence += randomDigit;
    }
    return sequence;
};
