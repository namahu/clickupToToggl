function doPost(e) {
    console.log(e);

    const params = JSON.parse(e.postData.getDataAsString());
    console.log(params);
};
