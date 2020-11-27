
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll(".balcon_icons_img"),
          windowWidth = document.querySelectorAll("#width"),
          windowHeight = document.querySelectorAll("#height"),
          windowType = document.querySelectorAll("#view_type"),
          windowProfile = document.querySelectorAll(".checkbox");
    checkNumInputs("#width");
    checkNumInputs("#height");

    function bindActionToElem(event, elem, prop) { //bind action wich writes something to state when event occurs on elem
            elem.forEach( (item, i) => {
                item.addEventListener(event, ()=>{
                    switch (item.nodeName) {
                        case 'SPAN':
                            state[prop] = i;
                            break;
                        case 'INPUT':
                            if (item.getAttribute('type') === "checkbox") {
                                i === 0 ? state[prop] = "Cold" : state[prop] = "Warm";
                                elem.forEach((box, j) => {
                                    box.checked = false;
                                    if (i == j) { // if element in foreach is one user has clicked then stays true
                                        box.checked = true;
                                    }
                            
                                });
                            } else {
                                state[prop] = item.value;
                            }
                            break;
                        case 'SELECT':
                            state[prop] = item.value;
                            break;
                    }
                    console.log(state);

                });
            });
          }

          bindActionToElem("click", windowForm, "form");
          bindActionToElem("input", windowWidth , "width");
          bindActionToElem("input", windowHeight , "height");
          bindActionToElem("change", windowType , "type");
          bindActionToElem("change", windowProfile , "profile");
          
};
export default changeModalState;