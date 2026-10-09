/*-------------------------------------
    Hamburger Menu on mobile
--------------------------------------*/
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}



/*-------------------------------------
    Cookies alert
--------------------------------------*/
document.addEventListener("DOMContentLoaded",()=>{
    const 
        b=document.getElementById("cookie-banner"),
        a=document.getElementById("acceptCookies");

    if(b&&!localStorage.getItem("cookiesAccepted"))b.style.display="block";
        if(a)a.onclick=()=>{localStorage.setItem("cookiesAccepted","true");
        b.style.display="none";
    };

});

/*---------------------------------------
    Subscription
    ------------------------------------*/
async function loadSubscription() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select(`
            subscription_active,
            subscription_expiry
        `)
        .eq('id', user.id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById('subscriptionStatus').textContent =
        data.subscription_active ? 'ACTIVE' : 'NOT ACTIVE';

    document.getElementById('subscriptionExpiry').textContent =
        data.subscription_expiry
            ? new Date(data.subscription_expiry).toLocaleDateString()
            : '-';

    const subscribeButton =
        document.getElementById('subscribeButton');

    const manageButton =
        document.getElementById('manageButton');

    if (data.subscription_active) {

        subscribeButton.style.display = 'none';

    } else {

        manageButton.style.display = 'none';

    }
}