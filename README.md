# school-name-generator

School Name Generator aims at helping distinguish different schools by calculating all possible common school names for a school.

This is originally designed for OIerDB (http://bytew.net/OIer), but this program can be
used for other purposes related to school names.

Due to the simplicity of the names of schools in North America, this generator does not support generation of English school names. *But support for English names may be added later on.*

---

## Getting Started

Make sure you have Node.js installed by typing
```
$ node -v
```

If not, install Node.js following instructions on https://nodejs.org/en/.

To run the program, simply type
```
$ node generator.js
```

When you're in the program, just leave blank for **mode**, and then enter the original name (preferrably the longest name of the school), results will be outputed.

If you want to customize generation rules, see debug info, or change outputMode, scan through the first part of the code and change accordingly.

---

### Current Version: v1.0.1002

As of current version, it can only generate high school names in China, __given its longest name.__

###### To-Do List

* Add support for universities.
* Guess the complete name (longest name) of a school, __given any of its abbreviations.__
* Add support for English school names.
