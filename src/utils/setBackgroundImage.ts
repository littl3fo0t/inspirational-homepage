const setBackgroundImage = (imageUrl: string) => {
    const bodyStyle = document.body.style;

    bodyStyle.backgroundImage = `url('${imageUrl}')`;
    bodyStyle.backgroundSize = "cover";
    bodyStyle.backgroundPosition = "center";
    bodyStyle.backgroundRepeat = "no-repeat";
};

export default setBackgroundImage;