const modals = (state) => {
    function bindModal(
        triggerSelector,
        closeSelector,
        modalSelector,
        closeClickOverlay = true,
        checkFillInputs = false,
        shouldBeInputted = [],
        resetOnClose = false
    ) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll("[data-modal]");

        const windowForm = document.querySelectorAll(".balcon_icons_img"),
            windowWidth = document.querySelectorAll("#width"),
            windowHeight = document.querySelectorAll("#height"),
            windowType = document.querySelectorAll("#view_type"),
            windowProfile = document.querySelectorAll(".checkbox");

        const scroll = calaScroll();


        trigger.forEach((item) => {
            item.addEventListener("click", (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                const keys = Object.keys(state);
                console.log(keys);
                if (
                    !checkFillInputs ||
                    (checkFillInputs &&
                        shouldBeInputted.every((v) => keys.includes(v)))
                ) {
                    windows.forEach((item) => {
                        item.style.display = "none"; // zakryt vse otkrytye okna pered otkrytiem novogo
                    });

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                    document.body.style.marginRight = `${scroll}px`;

                    // document.body.classList.add("modal-open");
                }
            });
        });

        close.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `$0px`;
            windows.forEach((item) => {
                item.style.display = "none"; // zakryt vse otkrytye okna pered otkrytiem novogo
            });

            resetState(state);

            if (resetOnClose) {
                resetValues(windowWidth);
                resetValues(windowHeight);
                resetValues(windowForm);
            }

            // document.body.classList.remove("modal-open");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal && closeClickOverlay) {
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                windows.forEach((item) => {
                    item.style.display = "none"; // zakryt vse otkrytye okna pered otkrytiem novogo
                });
                resetState(state);
            }

            // document.body.classList.remove("modal-open");
        });
    }

    function resetState(state) {
        const keys = Object.keys(state);
        keys.forEach((key) => {
            delete state[key];
        });
        state["type"] = "tree";
        state["form"] = 0;
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
        }, time);
    }

    function resetValues(elem) {
        elem.forEach((item) => {
            switch (item.nodeName) {
                case "SPAN":
                    item.classList.remove("do_image_more");
                    break;
                case "INPUT":
                    if (item.getAttribute("type") === "checkbox") {
                        elem.forEach((box, j) => {
                            box.checked = false;
                        });
                    } else {
                        item.value = "";
                    }
                    break;
                case "SELECT":
                    item.value = 0;
                    break;
            }
        });

        switch (elem[0].nodeName) {
            case "SPAN":
                elem[0].classList.add("do_image_more");
                break;
        }
    }

    function calaScroll(){
        let div =document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;

    }
    bindModal(
        ".popup_engineer_btn",
        ".popup_engineer .popup_close",
        ".popup_engineer"
    );
    bindModal(".phone_link", ".popup .popup_close", ".popup");
    bindModal(
        ".popup_calc_btn",
        ".popup_calc_close",
        ".popup_calc",
        true,
        false,
        [],
        true
    );
    bindModal(
        ".popup_calc_button",
        ".popup_calc_profile_close",
        ".popup_calc_profile",
        false,
        true,
        ["form", "width", "height"],
        true
    );
    bindModal(
        ".popup_calc_profile_button",
        ".popup_calc_end_close",
        ".popup_calc_end",
        false,
        true,
        ["type", "profile"],
        true
    );

    //showModalByTime(".popup", 60000);
};

export default modals;
