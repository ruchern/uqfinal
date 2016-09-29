/*
 * UQ Final v11
 * Copyright 2016 Mitchell Grice
 * http://gricey.net
 */

/*
 MD5
 */
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);

/*
 Mobile detection
 */
isMobile = (function(a){return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)));})(navigator.userAgent||navigator.vendor||window.opera);


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
    self.weight = ko.observable(Number(weight));
	self.id = id;
    self.rawScore = ko.observable('');
	
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
		var totalScore = 0;
		
		ko.utils.arrayForEach(self.assessmentItems, function(item) {
			var score = item.weightedScore();
			if (score != null) {
				totalScore += score;
			}
		});
		
		return totalScore;
	});
	
	self.totalDropped = ko.pureComputed(function() {
		var totalDropped = 0;
		
		ko.utils.arrayForEach(self.assessmentItems, function(item) {
			var dropped = item.weightedDropped();
			if (dropped != null) {
				totalDropped += dropped;
			}
		});
		
		return totalDropped;
	});
	
	self.totalScorePrint = ko.pureComputed(function() {
		return Math.round(self.totalScore() * 100) / 100 + '%';
	});
	
	self.totalDroppedPrint = ko.pureComputed(function() {
		return Math.round(self.totalDropped() * 100) / 100 + '%';
	});

    self.totalWeight = ko.pureComputed(function() {
        var totalWeight = 0;

        ko.utils.arrayForEach(self.assessmentItems, function(item) {
            totalWeight += item.weight();
        });

        return totalWeight;
    });
	
	self.providedTotalWeight = ko.pureComputed(function() {
		var providedTotalWeight = 0;
		
		ko.utils.arrayForEach(self.assessmentItems, function(item) {
			if (item.score() != null) providedTotalWeight += item.weight();
		});
		
		return providedTotalWeight;
	});

    self.unprovidedTotalWeight = ko.pureComputed(function() {
        var unprovidedTotalWeight = 0;

        ko.utils.arrayForEach(self.assessmentItems, function(item) {
            if (item.score() === null) unprovidedTotalWeight += item.weight();
        });

        return unprovidedTotalWeight;
    });
	
	self.requiredGrades = ko.pureComputed(function() {
		var requiredGrades = [];
		
		ko.utils.arrayForEach(self.gradeCutoffs, function (cutoff) {
            var requiredGrade = Math.ceil( (cutoff - self.totalScore()) / self.unprovidedTotalWeight() * 100);
            if (requiredGrade < 0) {
                requiredGrade = 0;
            }
            requiredGrades.push(requiredGrade);
        });
		
		return requiredGrades;
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
function SemesterVm(app, code, name) {
    var self = this;

    self.app = app;
    self.code = code;
    self.name = name;

    return self;
}


// Easter egg manager ;)
// The idea here is to be able to load easter eggs as the user discovers them without exposing all the easter eggs in js
// Shoutout to uqcs#projects <3
function EasterEggManager(app) {
    var self = this;

    self.input = [];

    self.keypress = function(e) {
        if (e.keyCode == 13) {
            self.load();
        } else {
            self.input.push(e.keyCode);
        }
    };

    self.load = function() {
        return; // Disabled
        var input = self.input;
        self.input = [];

        // Easter eggs are fun, but don't waste people's mobile data on them
        if (!isMobile) {
            var code = md5(input.map(String).join());
            var url = "/static/js/easter/"+code+".js";
            $.getScript(url);
        }
    };

    return self;
}


// The App Model
function UQFinalViewModel() {
    var self = this;

    self.courseCode = ko.observable('').extend({ uppercase: true });
    self.course = ko.observable(null);
	self.possibleGrades = [1, 2, 3, 4, 5, 6, 7];
	self.selectedGrade = ko.observable(4);
    self.courseCodeError = ko.observable(false);

    self.easterEggManager = new EasterEggManager(self);

    self.semesters = ko.observableArray([
        new SemesterVm(self, 6660, 'Sem 2, 2016'),
        new SemesterVm(self, 6620, 'Sem 1, 2016'),
        new SemesterVm(self, 6560, 'Sem 2, 2015')
    ]);
    self.selectedSemester = ko.observable(self.semesters()[0]);

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
        self.easterEggManager.keypress(e);

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

        // Grades
        // TODO

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

        var url = "/json/" + self.selectedSemester().code + "/" + courseCode + ".json";
		
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
            var courseSpec = {};

            var assessmentItems = [];
			var nAssessmentItem = 0;
            ko.utils.arrayForEach(jsonData.assessment, function(item) {
                assessmentItems.push( new AssessmentItemVm(item.task, item.weight, nAssessmentItem) );
				nAssessmentItem++;
            });
            courseSpec.assessmentItems = assessmentItems;

            courseSpec.semester = jsonData.semester;
            courseSpec.isLinear = jsonData.isLinear;
            courseSpec.calculable = jsonData.calculable;
            courseSpec.message = jsonData.message;
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

    self.loadFullData = function(semesterCode, courseCode, marks) {
        // Load semester
        var semester = null;
        ko.utils.arrayForEach(self.semesters(), function(testSem) {
            if (testSem.code == semesterCode) {
                semester = testSem;
            }
        });

        self.selectedSemester(semester);
        self.courseCode(courseCode);

        var loadingCourse = self.loadCourse(self.courseCode(), true);
        loadingCourse.done(function(course) {
            // Load in grades
            if (marks) {
                // TODO: Load in marks
            }
        });
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

            self.loadFullData(semesterCode, courseCode)
        }
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
    document.body.style.background = "url(" + pattern.png() + ")";
};
$(window).resize(generateBackground);
generateBackground();
