import CryptoJS from 'crypto-js'

class HashUtil {
    hashOrder(body: any) {
        let oddBuilder = "";
        let evenBuilder = "";
        
        const ordered = Object.keys(body).sort().reduce(
            (obj: any, key: string) => {
                obj[key] = body[key];
                return obj;
            },
            {}
        );

        Object.entries(ordered).forEach(([key, value], index) => {
            if (index % 2 == 0) {
                evenBuilder += value;
            } else {
                oddBuilder += value;
            }
        });

        const hashValue = oddBuilder + evenBuilder;
        const hash = CryptoJS.SHA256(hashValue);
        return hash.toString().toUpperCase();
    }
}
export default new HashUtil();