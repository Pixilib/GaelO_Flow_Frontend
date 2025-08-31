export const cryptofn = async (str: string): Promise<string> => {
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    const hexCodes = [];
    const view = new DataView(hash);
    for (let i = 0; i < view.byteLength; i += 1) {
        const byte = view.getUint8(i).toString(16).padStart(2, "0");
        hexCodes.push(byte);
    }
    return hexCodes.join("");
};

export const calculateOrthancSeriesID = async (patientId, studyInstanceUID, seriesInstanceUID): Promise<string> => {
    const stringToHash = patientId + "|" + studyInstanceUID + "|" + seriesInstanceUID;
    const hash = await cryptofn(stringToHash);
    return (`${hash.substring(0, 8)}-${hash.substring(8, 16)}-${hash.substring(16, 24)}-${hash.substring(24, 32)}-${hash.substring(32, 40)}`);
};

export const calculateOrthancStudyID = async (patientId, studyInstanceUID): Promise<string> => {
    const stringToHash = patientId + "|" + studyInstanceUID;
    const hash = await cryptofn(stringToHash);
    return (`${hash.substring(0, 8)}-${hash.substring(8, 16)}-${hash.substring(16, 24)}-${hash.substring(24, 32)}-${hash.substring(32, 40)}`);
};