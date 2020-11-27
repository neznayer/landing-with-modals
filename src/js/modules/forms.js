import checkNumInputs from "./checkNumInputs";


const forms = (state) => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');
  

    const message = {
        loading: "Loading...",
        success: "Success",
        failure: "Failure"
    };

    
    const postData = async (url,data) => {
        document.querySelector(".status").textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = "";
        });
    };

    checkNumInputs('input[name="user_phone"]');


    form.forEach( item => {
        item.addEventListener("submit", (e)=> {
            e.preventDefault();
            let statusMessage = document.createElement("div");
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute("data-calc")=="end") {

                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData("assets/server.php", formData)
                .then( res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch((err)=> {
                    console.log(err);
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

 
};

export default forms;