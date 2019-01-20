//Global variables for later use
var map;
var infoWindow;
var model;

//Initial Locations
const locations = [
  {
    name: "Magic Kingdom",
    lat: 28.417663,
    long: -81.5834007
  },
  {
    name: "Epcot",
    lat: 28.374694,
    long: -81.551598
  },
  {
    name: "Disney's Animal Kingdom",
    lat: 28.359719,
    long: -81.593507
  },
  {
    name: "Disney's Hollywood Studios",
    lat: 28.3575294,
    long: -81.5604654
  },
  {
    name: "Disney's Blizzard Beach",
    lat: 28.3568754,
    long: -81.5818327
  },
]

/**
*@description Location Model
*@constructor
*@param {any} contains name (string), lat (number), long (number)
*/
var Location = function(data) {
  var self = this;
  this.title = data.name;
  this.lat = data.lat;
  this.long = data.long;
  this.location = {lat: this.lat, lng: this.long};
  this.visible = ko.observable(true);
  this.summary = ko.observable();

  //replace spaces with _ for compatibility with wikipedia links
  this.link = "https://wikipedia.org/wiki/" + this.title.split(' ').join('_');
  this.infoWindow = new google.maps.InfoWindow();

  this.marker = new google.maps.Marker({
    position: this.location,
    title: this.title,
    map: map,
    animation: google.maps.Animation.DROP
  });

  this.showMarker = ko.computed(function() {
    if (this.visible() === true) {
      this.marker.setMap(map);
    } else {
      this.marker.setMap(null);
    }
    return true;
  }, this);

  //Closes all info windows besides the one that was clicked.
  //Handles the case in which there was an error in the API request, which displays just marker title
  this.clickForInfo = function() {
    for (var i = 0; i < model.locationsArray().length; i++) {
      model.locationsArray()[i].infoWindow.close();
      model.locationsArray()[i].marker.setAnimation(null);
    }
    map.panTo(self.marker.getPosition());
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    if (typeof self.summary() === "undefined") {
      self.infoWindow.setContent("<div id='infowindow'>" + self.title + "<br>" +
                            '<a href="' + self.link + '">Link to Wiki' + "</div>");
    } else {
      self.infoWindow.setContent("<div id='infowindow'>" + self.summary() + "<br>" + '<a href="' + self.link + '">Link to Wiki' + "</a><br><br>" +
                                  "This information was retrieved using the MediaWiki API." + "</div>");
    }
    self.infoWindow.open(map, self.marker);
  }
  this.addListener = google.maps.event.addListener(self.marker, 'click', (this.clickForInfo));
};

//start view model
function ViewModel() {
  var self = this;
  this.locationsArray = ko.observableArray([]);
  this.currentFilter = ko.observable("");
  var center = {lat: 28.417663, lng: -81.5834007};

  this.hamburgerVisible = ko.observable(false);
  this.crossVisible = ko.observable(true);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(center);
  });

  locations.forEach(function(loc) {
    self.locationsArray.push(new Location(loc));
  });

  self.filterLocations = ko.computed( function() {
    var filter = self.currentFilter().toLowerCase();
    if (!filter) {
      self.locationsArray().forEach(function(filteredLocations) {
          filteredLocations.visible(true);
      });
      return self.locationsArray();
    } else {
      return ko.utils.arrayFilter(self.locationsArray(), function(filteredLocations) {
        var locName = filteredLocations.title.toLowerCase();
        var result = (locName.search(filter) >= 0);
        filteredLocations.visible(result);
        return result;
      });
    }
  }, self);

  var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=explaintext&titles=Epcot|Magic%20Kingdom|Disney's%20Animal%20Kingdom|Disney's%20Blizzard%20Beach|Disney's%20Hollywood%20Studios&format=json&origin=*&formatversion=2";
  this.getWikiInfo = function() {
    $.getJSON(wikiURL)

    .done(function(data) {
      var results = data.query.pages;
      for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < self.locationsArray().length; j++) {
          if (results[i].title === self.locationsArray()[j].title) {
            self.locationsArray()[j].summary(results[i].extract);
          }
        }
      }
    })
    .fail(function() {
      alert("There was an error when attempting to download information from Wikipedia");
    });
  }

  this.toggle = function() {
      if (self.hamburgerVisible() === true) {
        self.hamburgerVisible(false);
        self.crossVisible(true);
        $(".menu").slideToggle("slow");
      } else {
        self.hamburgerVisible(true);
        self.crossVisible(false);
        $(".menu").slideToggle("slow");
      }
  }
}

function newMap() {
  model = new ViewModel();
  ko.applyBindings(model);
  model.getWikiInfo();
}

function mapError() {
  alert("There was an error when trying to load Google Maps. Please check your internet connection" +
        " and refresh the page.");
}