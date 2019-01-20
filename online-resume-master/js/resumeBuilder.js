var work = {
  "jobs": [
    {
      "employer": "USAF",
      "title": "Respiratory Therapist",
      "location": "Fairfield, CA",
      "dates": "2015 - in progress",
      "description": "Assisting doctors who diagnose and treat diseases of " +
      "the heart and lungs, perform essential lab and clinical functions " +
      "to help care for their patients. From conducting blood tests, " +
      "electrocardiograms and ultrasounds to assisting with surgical procedures."
    },
    {
      "employer": "World Networking Services",
      "title": "Senior IT Recruiter/Account Manager",
      "location": "Teaneck, NJ",
      "dates": "2012 - 2015",
      "description": "Create a pool of candidates through job fairs, " +
      "social networking, community organizations, Internet data mining, " +
      "and media channels. Recruiters proceed with the identification of " +
      "potential candidates through screening and interviewing their pool of applicants. "
    }
  ],
  "display": function() {
    for (var i = 0; i < work.jobs.length; i++) {
      $('#workExperience').append(HTMLworkStart);
      var formattedEmployer = HTMLworkEmployer.replace('%data%', work.jobs[i].employer);
      var formattedTitle = HTMLworkTitle.replace('%data%', work.jobs[i].title);
      var formattedDates = HTMLworkDates.replace('%data%', work.jobs[i].dates);
      var formattedLocation = HTMLworkLocation.replace('%data%', work.jobs[i].location);
      var formattedDescription = HTMLworkDescription.replace('%data%', work.jobs[i].description);
      $('.work-entry:last').append(formattedEmployer, formattedTitle, formattedDates, formattedLocation, formattedDescription);
    }
  }
};

work.display();

var education = {
  "schools": [
    {
      "name": "University of Phoenix",
      "location": "Phoenix, AZ (Online)",
      "degree": "Bachelors of Science",
      "majors": ["Information Technology", "Software Engineering"],
      "dates": "2013 - in progress",
      "url": "www.phoenix.edu"
    },
    {
      "name": "Bergen Community College",
      "location": "Paramus, NJ",
      "degree": "Associates of Science",
      "majors": ["General", "Computer Science"],
      "dates": "2009 - 2013",
      "url": "www.phoenix.edu"
    }
  ],
  "onlineCourses": [
    {
      "title": "Front End Web Developer Nanodegree",
      "school": "Udacity",
      "dates": "July 8th - in progress",
      "url": "www.udacity.com"
    }
  ],
  "display": function() {
    for (var i = 0; i < education.schools.length; i++) {
      $('#education').append(HTMLschoolStart);
      var formattedSchoolName = HTMLschoolName.replace('%data%', education.schools[i].name);
      var formattedSchoolDegree = HTMLschoolDegree.replace('%data%', education.schools[i].degree);
      var formattedSchoolDates = HTMLschoolDates.replace('%data%', education.schools[i].dates);
      var formattedSchoolLocation = HTMLschoolLocation.replace('%data%', education.schools[i].location);
      var formattedSchoolMajor = HTMLschoolMajor.replace('%data%', education.schools[i].majors);
      $('.education-entry:last').append(formattedSchoolName, formattedSchoolDegree, formattedSchoolDates, formattedSchoolLocation, formattedSchoolMajor);
    }

    $('#education').append(HTMLonlineClasses);
    for (j = 0; j < education.onlineCourses.length; j++) {
      $('#education').append(HTMLschoolStart);
      var formattedClassTitle = HTMLonlineTitle.replace('%data%', education.onlineCourses[j].title);
      var formattedClassSchool = HTMLonlineSchool.replace('%data%', education.onlineCourses[j].school);
      var formattedClassDates = HTMLonlineDates.replace('%data%', education.onlineCourses[j].dates);
      var formattedClassURL = HTMLonlineURL.replace('%data%', education.onlineCourses[j].url);
      $('.education-entry:last').append(formattedClassTitle, formattedClassSchool, formattedClassDates, formattedClassURL);
    }
  }
};

education.display();

var projects = {
  "projects": [
    {
      "title": "Sold!",
      "dates": "2016",
      "description": "This is an iOS application that is helpful for people that sell products through Facebook." +
      " Sellers can enter a string to search which the application returns all user's comments that match that string. " +
      " This is helpful to see which customer replied first and see what item they claimed. ",
      "images": ["images/soldimage.png"]
    },
    {
      "title": "Trump Hole",
      "dates": "2016",
      "description": "This is a game developed for iOS that allows the character to jump left and right to fall lower and lower to " +
      "avoid getting eaten at the top of the screen",
      "images": ["images/trumpimage.png"]
    }
  ],
  "display": function() {
    for (var i = 0; i < projects.projects.length; i++) {
      $('#projects').append(HTMLprojectStart);
      var formattedProjName = HTMLprojectTitle.replace('%data%', projects.projects[i].title);
      var formattedProjDate = HTMLprojectDates.replace('%data%', projects.projects[i].dates);
      var formattedProjDescription = HTMLprojectDescription.replace('%data%', projects.projects[i].description);
      $('.project-entry:last').append(formattedProjName, formattedProjDate, formattedProjDescription);

      for (var j = 0; j < projects.projects[i].images.length; j++) {
        var formattedProjImage = HTMLprojectImage.replace('%data%', projects.projects[i].images[j]);
        $('.project-entry:last').append(formattedProjImage);
      }
    }
  }
};

projects.display();

var bio = {
  "name": "Luis Ramirez",
  "role": "Software Engineer",
  "contacts": {
    "mobile": "305-323-9606",
    "email": "Luis.a.Ramirez@live.com",
    "github": "https:github.com/luisramirez04",
    "location": "Fairfield, CA"
  },
  "welcomeMessage": "Welcome! Please feel free to browse my online resume and reach out to me with any questions",
  "skills": ["HTML", "CSS", "JavaScript", "Java", "Swift", "Mobile", "Web"],
  "biopic": "images/fry.jpg",
  "display": function() {
    var formattedName = HTMLheaderName.replace('%data%', bio.name);
    var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
    var formattedImage = HTMLbioPic.replace('%data%', bio.biopic);
    var formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace('%data%', bio.contacts.email);
    var formattedGithub = HTMLgithub.replace('%data%', bio.contacts.github);
    var formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location);
    $('#header').prepend(formattedRole);
    $('#header').prepend(formattedName);
    $('#header').append(formattedImage);
    $('#topContacts, #footerContacts').append(formattedMobile, formattedEmail, formattedGithub, formattedLocation);

    if (bio.skills.length > 0) {
      $('#header').append(HTMLskillsStart);

      for (var i = 0; i < bio.skills.length; i++) {
        var formattedSkill = HTMLskills.replace('%data%', bio.skills[i]);
        $('#skills').append(formattedSkill);
      }
    }
  }
};

bio.display();

$('#mapDiv').append(googleMap);
