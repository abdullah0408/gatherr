import ky from 'ky';

const kyInstance = ky.create({
    parseJson: (text) => 
        JSON.parse(text, (key, value) => {
            if (key === "createdAt") return new Date(value);
            return value;
        }),
})

export default kyInstance;