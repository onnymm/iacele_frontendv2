const base64type = {
    'jpg': (content: string) => (`data:image/jpeg;base64,${content}`),
};

export default base64type;
