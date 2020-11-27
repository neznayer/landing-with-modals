const images = () => {
    const imgPopup = document.createElement("div"),
        workSection = document.querySelector(".works"),
        bigimage = document.createElement("img");

    imgPopup.classList.add("popup");

    imgPopup.style.justifyContent = "center";
    imgPopup.style.alignItems = "center";
    imgPopup.style.display = "none";

    imgPopup.appendChild(bigimage);
    workSection.appendChild(imgPopup);

    workSection.addEventListener("click", (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains("preview")) {
            imgPopup.style.display = "flex";
            const path = target.parentNode.getAttribute("href");

            bigimage.setAttribute("src", path);
        }
        if (target && target.matches("div.popup")){
            imgPopup.style.display = "none";
            
        }

    });


};

export default images;