# jsonresume-theme-Dave
A compact theme for JSON Resume, designed for printing.

Tries to fit as much information as possible onto a single page without making sections look cluttered.

## Table of Contents

* [Preview](#preview)
* [Example](#example)
* [Running](#running)
* [Options](#options)
* [License](#license)

## Preview
![Preview](preview.png)

## Example
http://themes.jsonresume.org/theme/dave

## Running

```sh
# If you need to install Node.js:
#    sudo apt-get install npm
sudo npm install -g resume-cli
git clone https://github.com/kneeki/jsonresume-theme-Dave.git
cd jsonresume-theme-dave
sudo npm install
resume serve
```
You can print directly from the served html.

## Options

You may toggle `SORT__KEYWORDS` to alphabetically sort the keywords (useful for long arrays) and `CLEAN_DATES` to use shortened dates. See `index.js`.

This theme supports a modified `resume.json` schema which allows you to add seperate 'experience' and 'certifications' categories.

```json
"experience": [
    {
        "organization": "United States Navy",
        "position": "Culinary Specialist",
        "website": "",
        "startDate": "2001-08-01",
        "endDate": "2005-08-01",
        "summary": "",
        "highlights": [
            "Good Conduct Medal",
            "Global War on Terrorism Service Medal",
            "National Defense Service Medal",
            "Submarine Insignia",
            "SSBN Service Patrol Pin (4 patrols)"
        ]
    }
],
"certifications": [
    {
        "name": "CompTIA A+",
        "url": "https://certification.comptia.org/certifications/a",
        "startDate": "08/01/2004",
        "endDate": ""
    },
    {
        "name": "CompTIA Network+",
        "url": "https://certification.comptia.org/certifications/network",
        "startDate": "08/01/2004",
        "endDate": ""
    }
]
```

## License
The MIT License (MIT)

Copyright (c) 2015 Ainsley Chong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
