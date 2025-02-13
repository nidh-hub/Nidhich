document.addEventListener('DOMContentLoaded', function() {
    

    
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleSwitch.checked = (theme === 'dark');
    }

    // Check for saved theme preference or default to 'light'
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        setTheme('light');
    }

    // Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }    
    }

    // Event listener for toggle switch
    toggleSwitch.addEventListener('change', switchTheme, false);

    
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // Hide/show navigation based on scroll direction
    let prevScrollPos = window.pageYOffset;
    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
            document.querySelector("nav").style.top = "0";
        } else {
            document.querySelector("nav").style.top = "-50px"; // Adjust based on your nav height
        }
        prevScrollPos = currentScrollPos;

        // Update the progress bar
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollPercentage = (scrollTop / docHeight) * 100;
        document.getElementById("myBar").style.width = scrollPercentage + "%";
    }

    // Add active class to navigation items on scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            if (scrollPosition >= section.offsetTop - 100 && 
                scrollPosition < (section.offsetTop + section.offsetHeight - 100)) {
                let currentId = section.attributes.id.value;
                removeAllActiveClasses();
                addActiveClass(currentId);
            }
        });
    });

    function removeAllActiveClasses() {
        document.querySelectorAll('nav a').forEach(el => {
            el.classList.remove('active');
        });
    }

    function addActiveClass(id) {
        let selector = `nav a[href="#${id}"]`;
        document.querySelector(selector).classList.add('active');
    }
});
