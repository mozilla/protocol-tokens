# HEAD

### Features

* **units:** (breaking) Removes padding, margin, spacing-base, and layout-base. 
* **colors:** (breaking) Updated colors and gradients. Removes Mozilla brand colors, magenta, 
* **gulp:** Update to Gulp 4.0.0 and Theo 8.1.1

# 2.1.0 (2018-11-19)

### Bug Fixes

* **units:** Screen size tokens were incorrectly mapped to content tokens (#27)

# 2.0.0 (2018-08-17)

### Features

* **media-queries:** Add mq-short, mq-tall, and mq-high-res tokens. (#22)
* **breakpoints:** Renamed breakpoints.yml to media-queries.yml (#22)

### Bug Fixes

* **units:** Color value for Gray 90 was incorrectly mapped to Gray 60 (#23)

# 1.3.1 (2018-06-27)

### Bug Fixes

* **json:** Remove extraneous trailing comma from json data formatting (#20)

# 1.3.0 (2018-06-21)

### Bug Fixes

* **content:** update content-max value to match bedrock (#18)

# 1.2.2 (2018-06-19)

### Bug Fixes

* **units:** layout-lg, layout-xl & layout-2xl values we're incorrect (#16)
* **docs:** link to CHANGELOG.md in README.md was 404.

# 1.2.1 (2018-06-08)

### Bug Fixes

* **breakpoints:** media query strings we're previously invalid, since yaml cannot perform arithmetic (#13)

# 1.2.0 (2018-06-05)

### Bug Fixes

* **units:** units are now formatted correctly as pixel values instead of strings (#9)

# 1.1.0 (2018-05-15)

### Bug Fixes

* **colors:** colors.yml file was updated to match the color values in the aliases.yml file

### Features

* **gradients:** removes iOS and Android support


# 1.0.0 (2018-05-10)

### Features

* **breakpoints:** Added js, css, json, less, and scss file support
* **colors:** Added android.xml, soc, js, css, gpl, json, less, scss, and swift file support
* **gradients:** Added android.xml, js, css, json, less, scss, swift
* **typography:** Added js, css, json, less, and scss file support
* **units:** Added js, css, json, less, and scss file support
