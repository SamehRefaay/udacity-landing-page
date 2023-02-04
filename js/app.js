/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
//nav list variable will be the parent of list items we will create by js.
const navList = document.getElementById("navbar__list");
//sections variable will contains all sections we have in our landing page.
const sections = document.querySelectorAll("section");
/*create fragment to hold all list items before adding to dom 
this is useful from point of preformance as it decrease reflow and repaint process
*/
const fragmentDecoment = document.createDocumentFragment();

const activeClassForSection = "your-active-class";
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
/**this fucnction will respond to anchor click event
 * although we can make onflying method (anonymous fumction inside add event listener method)
 * but we add the function ouside the event for best preformace as avoiding too many events will cause better preformace.
 */

/**
 * @description this fucnction will respond to anchor click event
 * although we can make onflying method (anonymous fumction inside add event listener method)
 * but we add the function ouside the event for best preformace as avoiding too many events will cause better preformace.
 * @param {Event} event
 */
function resondToLinkClick(event) {
  //from event we will prevent default action of the anchor click
  event.preventDefault();
  //from event we will also get the selected section that we want to scroll to it
  //by its id using event.target.getAttribute("href") which will return #sectionNumber that we can use to get the section
  const selectedSection = document.querySelector(
    event.target.getAttribute("href")
  );
  //apply smooth scrolling to the select section
  selectedSection.scrollIntoView({ behavior: "smooth" });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

/**
 * @description this is the fuction which create all list items need and add them to nav bar.
 */
function buildMyNav() {
  for (const section of sections) {
    //create new li element using create elment method.
    const newListElement = document.createElement("li");
    // newListElement.classList.add(`${section.id}`);
    //create new anchor elemnt.
    const linkElement = document.createElement("a");
    //adding href attribute to anchor element.
    linkElement.setAttribute("href", `#${section.id}`);
    //adding title to anchor (text-content)
    linkElement.textContent = section.dataset.nav;
    //adding class to linkelement this class will handel styling
    // as i found in css file with name menu__link
    linkElement.classList.add("menu__link", `${section.id}`);
    //adding scroll event to linkelement
    linkElement.addEventListener("click", resondToLinkClick);
    //adding link element to list element.
    newListElement.appendChild(linkElement);
    //adding the element to fragement.
    fragmentDecoment.appendChild(newListElement);
  }
  //adding fragment as child to navList
  navList.appendChild(fragmentDecoment);
}

/**
 * @description helper function to remove active class from specific element
 * @param {Element} element
 * @param {string} removedClassName
 */
function removeActiveClassFrom(ele, removedClassName) {
  if (ele.classList.contains(removedClassName)) {
    //remvoe active classes from element
    ele.classList.remove(removedClassName);
  }
}

/**
 * @description
 *  helper function to add active class to specific element
 * @param {Element} element
 * @param {string} activeClassName
 */
function addActiveTo(element, activeClassName) {
  if (!element.classList.contains(activeClassName)) {
    element.classList.add(activeClassName);
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildMyNav();
/**
 * @description
 *
 */

/**
 * @description
 * this function is simple and its role to create an instace from
 * the intersection observer after be sure that all page is loaded.
 * @param {string} event onLoad event will invoke the callback function after page is loaded.
 * @param {function} anonymousFunction //will invoke the createIntersectionObserver method.
 */
window.addEventListener(
  "load",
  function () {
    //create instance from the intesection observer
    createIntersectionObserver();
  },
  false
);

/**
 * @description
 * this callback function role is to create the observer
 * @param {entries} iterable Each entry describes an intersection change for one observed
 * @param {observer} IntersectionObserver instance
 */
function callbackfun(entries, observer) {
  let targetId;
  entries.forEach((entry) => {
    // if section intersection with the viewport this condition will be true
    if (entry.isIntersecting) {
      // add active class to the section intesected with viewport
      entry.target.classList.add("your-active-class");
      // get the id of the nav list should be heighlited too
      targetId = entry.target.id;
    } else {
      // remove active class from the section not intesected with viewport
      entry.target.classList.remove("your-active-class");
    }
  });
  //loop through all links and search for target id then update active class
  document.querySelectorAll("a").forEach((link) => {
    if (link.classList.contains(targetId)) {
      //add active class if match the target id (section id)
      addActiveTo(link, "active");
    } else {
      //remove active class if doesnot match the target id
      removeActiveClassFrom(link, "active");
    }
  });
}

/**
 * @description
 * this function role is to create the observer
 * i will use one option of threshold 0.6 this will fire the observer
 * if 60% of the section intersect with the viewport.
 */
function createIntersectionObserver() {
  // 0.6 means 60% of section intersect with the viewport it can be any form (0-1)
  const option = { threshold: 0.6 };
  // this will create an instance form the observer
  const observer = new IntersectionObserver(callbackfun, option);
  //loop through all section and apply the observe function to each section
  sections.forEach((section) => {
    observer.observe(section);
  });
}
