/*
 * UQ Final v14
 * Copyright 2017 Mitchell Grice
 * http://gricey.net
 */

// Knockout uppercase extension
ko.extenders.uppercase = function(target, option) {
    target.subscribe(function(newValue) {
        target(newValue.toUpperCase());
    });
    return target;
};


// A piece of assessment
function AssessmentItemVm(task, weight, id) {
    var self = this;

    self.task = ko.observable(task);
    self.weight = ko.observable(weight);
	self.id = id;
    self.rawScore = ko.observable('');

    // Scores
	self.score = ko.pureComputed(function() {
		if (self.isNumericWeighting()) {
			if(self.rawScore() === '') {
				return null;
			} else {
				try {
					if (self.rawScore().indexOf("%") > -1) {
						return eval(self.rawScore().replace("%", "/100"));
					} else if (self.rawScore() > 1) {
						return self.rawScore() / 100;
					} else {
						return eval(self.rawScore());
					}
				} catch (e) {
					return null;
				}
			}
		}
		
		return null;
	});

    self.isEmptyScore = ko.pureComputed(function() {
        return self.rawScore() === '';
    });

    self.isValidScore = ko.pureComputed(function() {
        var rawScore;

        try {
            if (self.rawScore().indexOf("%") > -1) {
                rawScore = eval(self.rawScore().replace("%", "/100"));
            } else if (self.rawScore() > 1) {
                rawScore = self.rawScore() / 100;
            } else {
                rawScore = eval(self.rawScore());
            }
        } catch (e) {
            return false;
        }

        return true;
    });

    self.isInterimInvalidScore = ko.pureComputed(function() {
        // At this stage, empty is valid
        return !self.isEmptyScore() && !self.isValidScore();
    });


    // Weight
	self.weightedScore = ko.pureComputed(function() {
		if (self.score() == null) return null;
		return self.score() * self.weight();
	});
	
	self.weightedDropped = ko.pureComputed(function() {
		if (self.score() == null) return null;
		return (1 - self.score()) * self.weight();
	});

    self.isNumericWeighting = ko.pureComputed(function() {
        return (/^[\d\.]+$/.test(self.weight()) && self.weight() != 0);
    });

    self.weightText = ko.pureComputed(function() {
        return self.isNumericWeighting() ? self.weight() + "%" : self.weight();
    });


    // Prompt
    self.showPrompt = ko.pureComputed(function() {
        return (/^\d+$/.test(self.rawScore()) && Number(self.rawScore()) > 0 && Number(self.rawScore()) < Number(self.weight()));
    });

    self.promptPercentText = ko.pureComputed(function() {
        return self.rawScore() + "%";
    });

    self.promptFractionText = ko.pureComputed(function() {
        return self.rawScore() + "/" + self.weight();
    });

    self.promptPercentClick = function() {
        self.rawScore(self.promptPercentText());
    };

    self.promptFractionClick = function() {
        self.rawScore(self.promptFractionText());
    };
	
	// Progress bar
	self.progressBarId = ko.pureComputed(function() {
		return "assessment" + self.id + "ProgressBar";
	});
	
	self.initProgressBar = function() {
        $('#' + self.progressBarId()).empty();
		self.bar = new ProgressBar.Circle('#' + self.progressBarId(), {
			color: '#49075E',
			trailColor: '#eee',
			easing: 'easeOut',
			trailWidth: 6,
			strokeWidth: 10,
		});
	};
	
	self.score.subscribe(function(newValue) {
		if (newValue !== null) {
			self.bar.animate(newValue);
		}
	});

	
	return self;
}


// A course
function CourseVm(app, spec) {
    var self = this;

    self.app = app;
    self.code = spec.courseCode;
    self.name = spec.name;
    self.message = spec.message;
    self.isLinear = spec.isLinear;
    self.isCalculable = spec.calculable;
    self.gradeCutoffs = spec.gradeCutoffs;
    self.assessmentItems = spec.assessmentItems;
	
	// Calculations
	self.totalScore = ko.pureComputed(function() {
        return _.chain(
            self.assessmentItems
        ).map(function(item) {
            if (item.isNumericWeighting()) return item.weightedScore();
        }).sum().value();
	});
	
	self.totalDropped = ko.pureComputed(function() {
        return _.chain(
            self.assessmentItems
        ).map(function(item) {
            if (item.isNumericWeighting()) return item.weightedDropped();
        }).sum().value();
	});
	
	self.totalScorePrint = ko.pureComputed(function() {
		return Math.round(self.totalScore() * 100) / 100 + '%';
	});
	
	self.totalDroppedPrint = ko.pureComputed(function() {
		return Math.round(self.totalDropped() * 100) / 100 + '%';
	});

    self.totalWeight = ko.pureComputed(function() {
        return _.chain(
            self.assessmentItems
        ).map(function(item) {
            return item.weight();
        }).sum().value();
    });
	
	self.providedTotalWeight = ko.pureComputed(function() {
        return _.chain(
            self.assessmentItems
        ).map(function(item) {
            if (item.score() != null) return item.weight();
        }).sum().value();
	});

    self.unprovidedTotalWeight = ko.pureComputed(function() {
        return _.chain(
            self.assessmentItems
        ).map(function(item) {
            if (item.isNumericWeighting() && item.score() === null) return Number(item.weight());
        }).sum().value();
    });
	
	self.requiredGrades = ko.pureComputed(function() {
        return _.map(self.gradeCutoffs, function(cutoff) {
            var requiredGrade = Math.ceil( (cutoff - self.totalScore()) / self.unprovidedTotalWeight() * 100);
            return _.max([0, requiredGrade]);
        });
	});
	
	self.afterAssessmentRender = function(elements, data) {
		data.initProgressBar();
	};
	
	// Results bar
    $('#resultsGraph').empty();
	self.resultsBar = new ProgressBar.Circle('#resultsGraph', {
		color: '#49075E',
		trailColor: '#eee',
		easing: 'easeOut',
		trailWidth: 5,
		strokeWidth: 10
	});
	
	self.totalScore.subscribe(function(newValue) {
		if (newValue !== null) {
			self.resultsBar.animate(newValue / 100);
		}
	});

    return self;
}


// Semester view model
function SemesterVm(app, code, name, isCurrent) {
    var self = this;

    self.app = app;
    self.code = code;
    self.name = name;
    self.isCurrent = isCurrent;

    return self;
}


// The App Model
function UQFinalViewModel() {
    var self = this;

    self.API_BASE_URL = "https://api.uqfinal.com";

    self.courseCode = ko.observable('').extend({ uppercase: true });
    self.course = ko.observable(null);
	self.possibleGrades = [1, 2, 3, 4, 5, 6, 7];
	self.selectedGrade = ko.observable(4);
    self.courseCodeError = ko.observable(false);

    self.semesters = ko.observableArray();
    self.selectedSemester = ko.observable(null);

    self.loading = ko.pureComputed(function() {
        return !(self.semesters().length > 0);
    });


    // Android detection
    self.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;


    self.loadSemesters = function() {
        var d = $.Deferred();

        $.ajax({
            dataType: "json",
            url: self.API_BASE_URL + '/semesters',
            beforeSend: function(xhr){
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        }).done(function(jsonData) {
            var data = jsonData.data;
            var semesterSpecs = data.semesters;

            self.semesters(semesterSpecs.map(function(spec) {
                return new SemesterVm(self, spec.uqId, spec.shortName, spec.isCurrent);
            }));

            self.selectedSemester(_.find(self.semesters(), function(semester) {
                return semester.isCurrent;
            }));

            d.resolve();
        }).fail(function() {
            d.reject();
        });

        return d.promise();
    };

    self.selectedSemesterName = ko.pureComputed(function() {
        if (self.selectedSemester()) return self.selectedSemester().name;
        return null;
    });

    self.messages = ko.pureComputed(function() {
        var messages = [];

        if (self.courseCodeError()) messages.push("Invalid course code");
        if (self.course() && self.course().message) messages.push(self.course().message);
        if (self.course() && !self.course().isCalculable) messages.push("Course doesn't use standard marking, can't calculate marks.");

        return messages;
    });
	
	self.showMessages = ko.pureComputed(function() {
		return self.messages().length > 0;
	});
	

    self.showAssessment = ko.pureComputed(function() {
        return self.course() != null && self.course().isCalculable;
    });

    self.showResults = ko.pureComputed(function() {
        return self.showAssessment();
    });
	
	self.requiredScoreForSelectedGrade = ko.pureComputed(function() {
		if (self.course() == null) return;
		return self.course().requiredGrades()[self.selectedGrade() - 1] + '%';
	});

    // Detect enter on course code
    self.onCourseCodeKey = function(d, e) {
        self.courseCodeError(false);

        if (e.keyCode == 13) {
            // Let people set the background of the page
            var matchRGB = /(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/;
            var match = matchRGB.exec(self.courseCode());
            if (match !== null) {
                var r = Number(match[1]);
                var g = Number(match[2]);
                var b = Number(match[3]);
                if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
                    [bgR, bgG, bgB] = [r, g, b];
                    generateBackground();

                    ga('send', 'event', 'Easter', 'rgb');

                    return;
                }
            }

            if (self.courseCode() == 'COLOUR') {
                bgR = Math.round(Math.random() * 255);
                bgG = Math.round(Math.random() * 255);
                bgB = Math.round(Math.random() * 255);
                generateBackground();

                ga('send', 'event', 'Easter', 'colour');

                return;
            }

            self.loadCourse(self.courseCode());
        }
    };

    // Push a history state to the url for sharing stuff
    self.pushState = function(courseCode, semesterCode) {
        courseCode = courseCode || self.courseCode();
        semesterCode = semesterCode || self.selectedSemester().code;

        var title = courseCode + " - UQ Final";
        var histUrl = "#" + semesterCode + "/" + courseCode;
        var histData = {
            courseCode: courseCode,
            semesterCode: semesterCode
        };

        history.pushState(histData, title, histUrl);
    };
	
	self.loadCourseClick = function() {
		self.loadCourse(self.courseCode());
	};

    // Load a course data
    self.loadCourse = function(courseCode, disablePushState) {
        if (courseCode === '') {
            self.course(null);
            self.courseCodeError(false);
            return;
        }

        disablePushState = disablePushState || false;

        var url = self.API_BASE_URL + "/course/" + self.selectedSemester().code + "/" + courseCode;
		
        self.courseCodeError(false);

        // Analytics
        ga('send', 'event', 'Course', 'load', courseCode);

        // History
        if (!disablePushState) {
            self.pushState(courseCode);
        }

        var d = $.Deferred();

        $.ajax({
            dataType: "json",
            url: url,
            cache: false,
            beforeSend: function(xhr){
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        }).done(function(jsonData) {
            var offeringData = jsonData.data;
            var courseSpec = {};

            var assessmentItems = [];
			var nAssessmentItem = 0;
            ko.utils.arrayForEach(offeringData.assessment, function(item) {
                assessmentItems.push( new AssessmentItemVm(item.taskName, item.weight, nAssessmentItem) );
				nAssessmentItem++;
            });
            courseSpec.assessmentItems = assessmentItems;

            courseSpec.semester = offeringData.semester.uqId;
            courseSpec.isLinear = offeringData.isLinear;
            courseSpec.calculable = offeringData.calculable;
            courseSpec.gradeCutoffs = [0, 30, 46, 50, 65, 75, 85];

            var course = new CourseVm(self, courseSpec);
            self.course(course);
            d.resolve(course);

            ga('send', 'event', 'Course', 'loadValid', courseCode);
        }).fail(function() {
            self.courseCodeError(true);
			self.course(null);
            d.reject();

            ga('send', 'event', 'Course', 'loadInvalid', courseCode);
        });

        return d.promise();
    };

    self.loadFullData = function(semesterCode, courseCode) {
        // Load semester
        var semester = _.find(self.semesters(), {'code': Number(semesterCode)});

        self.selectedSemester(semester);
        self.courseCode(courseCode);

        var loadingCourse = self.loadCourse(self.courseCode(), true);
    };

    // History popstate
    window.addEventListener('popstate', function(e) {
        var data = e.state;
        var semesterCode, courseCode;

        if (data == null) {
            // Back to a blank page
            semesterCode = self.semesters()[0].code;
            courseCode = '';
        } else {
            semesterCode = data.semesterCode;
            courseCode = data.courseCode;
        }

        self.loadFullData(semesterCode, courseCode);
    });

    // Initial load state
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        var bits = hash.split('/');
        if (bits.length === 2) {
            var semesterCode = bits[0];
            var courseCode = bits[1];
            self.loadSemesters().then(function() {
                self.loadFullData(semesterCode, courseCode);
            });
        }
    } else {
        self.loadSemesters();
    }


    return self;
}

ko.applyBindings(new UQFinalViewModel());


// Background
var bgR = 73;
var bgG = 7;
var bgB = 94;
var bgVar = 5;
rv  = function(base, variance) {
    var v = base + variance * 2 * Math.random() - variance;
    if (v < 0) return 0;
    if (v > 255) return 255;
    return Math.round(v);
};
trianglifyColorFunc = function() {
    var variance = bgVar;
    var r = rv(bgR, variance);
    var g = rv(bgG, variance);
    var b = rv(bgB, variance);
    return "rgb("+r+","+g+","+b+")";
};

generateBackground = function() {
    var pattern = Trianglify({
        height: window.innerHeight,
        width: window.innerWidth,
        color_function: trianglifyColorFunc
    });
    document.documentElement.style.background = "url(" + pattern.png() + ")";
};
generateBackground();
