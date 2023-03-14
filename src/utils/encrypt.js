const aesjs = window.aesjs;

export const encrypt = (text) => {
    const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    const aesCtr = new aesjs.ModeOfOperation.ctr(key);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;   
};

export const decrypt = (encryptedText) => {
    const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    const aesCtr = new aesjs.ModeOfOperation.ctr(key);
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
};