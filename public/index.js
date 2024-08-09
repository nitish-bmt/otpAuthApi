
const form = document.getElementById("registrationForm");
const emailSubmit = document.getElementById("emailSubmit");
const emailInput = document.getElementById("email");
const otpDiv = document.getElementById("otpDiv");
const otpInput = document.getElementById("otp");
var otpSent = false;

function sendOTP(){

  
  otpDiv.style.display = "inline-block";
  // otpInput.setAttribute("required");
  otpInput.required = "true";
  emailSubmit.innerText="Confirm OTP"
  // form.appendChild(emailSubmit);

  console.log("OTP Sent");

  otpSent = true;

}

async function verifyOTP(){

  // const resp = await fetch("http://localhost:8000/sendOTP/",{
  //   body: JSON.stringify({
  //     "email": emailInput.value,
  //     "otp": otpInput.value
  //   })
  // })
  
  try{
    fetch(`http://localhost:8000/authOTPurl/${emailInput.value}/${otpInput.value}`).then((resp)=>{
      console.log("sfjsjfksk", resp);
    })
  // console.log(resp.data);
  // console.log(resp.json.otpStatus);
  }
  catch(err){
    
    console.log(err.message,"df")
  }


  // if(resp.body == "401"){

  // }
  console.log('already send')
}

window.addEventListener("DOMContentLoaded", ()=>{

  form.addEventListener("submit", async(e)=>{

    e.preventDefault();
    if(otpSent){
      verifyOTP();
    }
    else{
      const resp = await fetch(`http://localhost:8000/sendOTPurl/${emailInput.value}`);
      console.log("sjfsjs", resp)
      // const resp = await fetch("http://localhost:8000/sendOTP/",{
      //   body: JSON.stringify({"email": emailInput.value})
      // })
      sendOTP();
    }

  });
});


// DARKMODE TOGGLE
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});
