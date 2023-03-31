/*******
 * Generate a random ID with a-z A-Z 0-9 with specific length
 * @param length How long is the ID
 */
export function generateId(length: number) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/*******
 * Generate a random ID with a-z A-Z 0-9 with specific length
 * @param length How long is the ID
 */
export function generatePassword(length: number) {
    const numberChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "*$€%=;,!&@)(";
    const allChars = numberChars + upperChars + lowerChars + specialChars;
    let randPasswordArray = Array(length);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = specialChars;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    return shuffleArray(
        randPasswordArray.map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
        })
    ).join("");
}
