# Varbase Hero Slider Media
---
This app will populate the universal implementation of a "Hero Slider"
to be used on the homepage in most cases. A rich hero slider that allows you
to display video and/or image slides.

Media Hero Slider requires the slick.min.js library.
Download it (https://github.com/kenwheeler/slick)
and place it in the libraries folder (/libraries)

To keep track of the library in your composer.json file of the project, you
could add:

```
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.drupal.org/8"
    },
    {
      "type": "package",
      "package": {
        "name": "kenwheeler/slick",
        "version": "1.6.0",
        "type": "drupal-library",
        "source": {
          "url": "https://github.com/kenwheeler/slick",
          "type": "git",
          "reference": "origin/master"
        }
      }
    }
  ],
```

And then in the require part: 


```
  "require": {
    "kenwheeler/slick": "1.6.0"
  }
```
