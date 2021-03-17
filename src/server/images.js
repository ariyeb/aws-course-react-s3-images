import Axios from "axios";

const url = "http://localhost:3030/";

export const uploadImage = async (formData) => {
    try {
        const result = await Axios.post(url + "upload-image", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });

        return result.data;
    } catch (err) {
        console.log(err);
    }
};

export const getIamgesData = async () => {
    try {
        const result = await Axios.get(url + "get-images");
        return result.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteImage = async (id, key) => {
    try {
        await Axios.delete(url + "delete-images", {
            data: { id, key }
        });
        return;
    } catch (err) {
        console.log(err);
    }
};
