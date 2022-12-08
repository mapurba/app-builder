export const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const guid = () => {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};
export const sampleTemplate ={"data": {"assets": [], "styles": [], "pages": [{"component": "<div>Initial content</div>"}]} }
export const templateListPath="http://localhost:3000/projects";
export const templateDetailPath="http://localhost:3000/projects/${ID}";


