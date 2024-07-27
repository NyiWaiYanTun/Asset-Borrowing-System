document.querySelector('#login').onclick=async function(){
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let remember = document.querySelector("#remember").checked;
    try {
        // connect to service on server
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            remember
          })
        };
        //connect to /register api
        const res = await fetch('/LecturerLogin', options);
        const data = await res.text();
        // successful
        if (res.status === 200) {
          window.location.replace(data);
        }else{
          document.querySelector('#message').innerHTML=data;
        }
      } catch (error) {
        document.querySelector('#message').innerHTML=error.message;
      }
}