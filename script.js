let section = document.querySelectorAll('section')
let navlinks = document.querySelectorAll('header a')


window.onscroll = () => {
    if(scrollY > 100){
        document.querySelector('.menu').classList.add('active')
    } else{
        document.querySelector('.menu').classList.remove('active')

    }

    section.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop
        let heigth = sec.offsetHeight
        let id = sec.getAttribute('id')
        console.log(id, offset, top, heigth)
        
        if(top >= offset && top < offset + heigth){
            navlinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}







navlinks = document.querySelectorAll('.menu a[href^="#"]')


function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== "undefined" ? duration : 400;
  
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60);
  }


function getDistanceFromTheTop(element){
    const id = element.getAttribute("href")
    return document.querySelector(id).offsetTop
}
function nativeScroll(distanceFromTheTop){
    window.scroll({
        top: distanceFromTheTop,
        behavior: "smooth",
    })
}
function scrollToSection(event) {
    event.preventDefault()
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90
    smoothScrollTo(0, distanceFromTheTop, 500)
   
}
navlinks.forEach((link) => {
    link.addEventListener('click', scrollToSection)
})