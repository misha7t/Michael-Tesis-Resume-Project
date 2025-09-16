console.log('JavaScript Loaded');

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('myNavbar');
    const stickyOffset = navbar.offsetTop;
    const sections = document.querySelectorAll('.sections');
    const navLinks = document.querySelectorAll('.nav-link');
    const mockEvent = new Event('customEvent');

    if (window.pageYOffset > stickyOffset) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    let currentSectionId = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
          if (window.innerHeight + pageYOffset >= document.body.offsetHeight){
            currentSectionId = 'declaration';
        }
          navLinks.forEach(link => {
            if (link.getAttribute("href") === "#" + currentSectionId) {
              link.dispatchEvent(mockEvent);
            }
          });
        }
      });
});

const parentElement = document.getElementById('myNavbar');
const childElements = parentElement.children;
for (const child of childElements) {
    child.addEventListener('customEvent', function (event) {
        child.classList.add('active');
        const allItems = document.querySelectorAll('.active');
        
        allItems.forEach(element => {
            if (element !== child) {
                element.classList.remove('active');
            }
        }); 
    });
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
 link.addEventListener('click', function(event) {
     event.preventDefault();

     const targetId = this.getAttribute('href'); 
     const targetElement = document.querySelector(targetId); 

     if (targetElement) {
         targetElement.scrollIntoView({
             behavior: 'smooth', 
             block: 'start' 
         });
     }
 });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLink = document.querySelector('.nav-link');
    navLink.classList.add('active');
    const greetingEl = document.getElementById('greeting');
    let greetingMessage = '';

    let number = Math.floor(Math.random() * 3) + 1;
    switch (number) {
        case 1:
            greetingMessage = 'Good Morning!';
          break;
        case 2:
            greetingMessage = 'Good Afternoon!';
          break;
        case 3:
            greetingMessage = 'Good Evening!';
          break;
      }

    greetingEl.textContent = greetingMessage;

    const themeToggle = document.getElementById('switchButton');
    const body = document.body;
    const themeKey = 'theme';
    const darkThemeClass = 'dark-theme';
  
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        body.classList.add(darkThemeClass);
      } else {
        body.classList.remove(darkThemeClass);
      }
    };

    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        applyTheme('dark');
        localStorage.setItem(themeKey, 'dark');
      }
    }
  
    themeToggle.addEventListener('click', () => {
      body.classList.toggle(darkThemeClass);

      if (body.classList.contains(darkThemeClass)) {
        localStorage.setItem(themeKey, 'dark');
      } else {
        localStorage.setItem(themeKey, 'light');
      }
    });
});


const hoverListOne = document.getElementById('hoverListOne');
const hoverListTwo = document.getElementById('hoverListTwo');

const listItemsOne = Array.from(hoverListOne.children);
const listItemsTwo = Array.from(hoverListTwo.children);
const combinedItems = listItemsOne.concat(listItemsTwo);

for (const item of combinedItems) {
    item.addEventListener('mouseover', function (event) {
        const tooltipText = event.target.dataset.tooltip;
        if (tooltipText) {
          tooltipElement = document.createElement('div');
          tooltipElement.classList.add('tooltip-text');
          tooltipElement.classList.add('visible');
          tooltipElement.textContent = tooltipText;
          item.appendChild(tooltipElement);
        }
        });
    
    item.addEventListener('mouseout', () => {
        if (tooltipElement) {
          tooltipElement.classList.remove('visible');
          setTimeout(() => {
            if (tooltipElement && tooltipElement.parentNode) {
              tooltipElement.parentNode.removeChild(tooltipElement);
              tooltipElement = null;
            }
          }, 300);
        }
      });
}

document.addEventListener('scroll', () => {
    const jobEntries = document.querySelectorAll('.job-entry');
    const observerOptions = {
      threshold: 0.2,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show'); 
        }
      });
    }, observerOptions);

    jobEntries.forEach(entry => {
      observer.observe(entry);
    });
});
  

const sortButton = document.getElementById('sort-gpa-btn');
const tableBody = document.querySelector('#education-table tbody');
let sortAscending = true;

sortButton.addEventListener('click', () => {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
      const gpaA = parseFloat(rowA.cells[3].textContent);
      const gpaB = parseFloat(rowB.cells[3].textContent);
      
      if (sortAscending) {
        return gpaA - gpaB;
      } else {
        return gpaB - gpaA;
      }
    });

    sortAscending = !sortAscending;

    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    rows.forEach(row => tableBody.appendChild(row));
});

const skillLevelInputs = document.querySelectorAll('input[name="skill-level"]');
const contentDivs = {
    beginner: document.getElementById('beginner-content'),
    intermediate: document.getElementById('intermediate-content'),
    advanced: document.getElementById('advanced-content')
};

function updateSkillLevel(level) {
    Object.values(contentDivs).forEach(div => {
      div.style.display = 'none';
});
contentDivs[level].style.display = 'block';
}

skillLevelInputs.forEach(input => {
    input.addEventListener('change', (event) => {
      const selectedLevel = event.target.value;
      updateSkillLevel(selectedLevel);
    });
});

const initialLevel = document.querySelector('input[name="skill-level"]:checked').value;
updateSkillLevel(initialLevel);

document.querySelectorAll('figure').forEach(figure => {
    figure.addEventListener('click', () => {
      const modalId = figure.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    const closeBtn = modal.querySelector('.close');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  const backToTopBtn = document.getElementById('backToTop');

  window.onscroll = function() {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.tech-filter');
    const projectCards = document.querySelectorAll('.flip-card');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProjects);
    });
  
    function filterProjects() {
      const selectedTechnologies = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      projectCards.forEach(card => {
        const cardTechnologies = card.dataset.technologies.split(',');
        const cardTechnologiesTrimmed = cardTechnologies.map(tech => tech.trim());
  
        if (selectedTechnologies.length === 0) {
          card.style.display = 'block';
          return;
        }
  
        const matchesAllSelected = selectedTechnologies.every(selectedTech =>
          cardTechnologiesTrimmed.includes(selectedTech)
        );
  
        if (matchesAllSelected) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  });