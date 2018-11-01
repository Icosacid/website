var AboutComponent = {
    template: jQuery('#about-template').html(),
    data: function() {
        return {
            showRiddle: false,
            riddleAnswer: "",
            currentPolyam: "work with scientists"
        }
    },
    methods: {
        submitRiddle: function() {
            if (this.isAnswerValid(this.riddleAnswer)) {
                Global.router.push('/cv');
            } else {
                this.animateTryAgain();
            }
        },
        animateTryAgain: function() {
            var $error = jQuery('.riddle-input p.error');
            $error.animate({ opacity: 1 }, 500);
            setTimeout(function() {
                $error.animate({ opacity: 0 }, 1000);
            }, 3000);
        },
        isAnswerValid: function(answer) {
            var hasGold = answer.indexOf('gold') > -1 || answer.indexOf('Gold') > -1,
                hasValue = Math.round(10 * answer) / 10 == 1.6,
                hasCommaValue = answer.indexOf('1,6') > -1,
                hasPhi = answer.indexOf('phi') > -1 || answer.indexOf('Phi') > -1,
                hasRatio = answer.indexOf('ratio') > -1;

            return hasGold || hasValue || hasCommaValue || hasPhi || hasRatio;
        },
        startPolyam: function() {
            var options = [
                "work with scientists",
                "run",
                //"am nomad",
                "created my own task management tool in CSS format",
                "only read news on Wikipedia",
                "advocate for data privacy",
                "use Firefox",
                "overuse Notepad++ which is great",
                "give talks on creative coding",
                "code",
                "don't care about the newest shit",
                "keep away from social media",
                "like CodePen",
                "practice a massage technique between acupressure and shiatsu",
                "would probably love to get in touch with you",
                "have a minimalistic lifestyle",
                "try to workout",
                "write stuff",
                "directed a short film with only particles in it",
                "lived in Australia and Sweden",
                "was raised in France",
                "enjoy maaany kinds of music",
                "git push",
                "have a zero inbox approach to email management",
                "advocate for long lunch breaks",
                "always carry an icosahedron with me in case of fire",
                "like a good whisky",
                "spent a few years in Lyon",
                "am shy deep inside",
                "rely much on karma for projects",
                "will teach some day soon",
                "make art exhibitions with JavaScript",
                "once was an army officer in mountain troops",
                "hiked the Great Ocean Walk but saw no koala",
                "just can't draw real stuff",
                "dance hunggar kung-fu",
                "have a dream",
                "live projected my face at night on a huge tree then freaked out",
                "spin pens",
                "carry an APC MINI in case of accidental VJ session",
                "compressed my entire digital self to 58Go in 2017",
                "don't have a long-term goal in mind, just directional gut feelings",
                "read self-optimization, tech and management articles for 5 years then stopped",
                "was initially inspired by Joshua Davis W3C talk on creative coding",
                "shake hands",
                "write in 1st person to you on my website because it's cooler",
                "coded an e-learning game on the HSL color model",// for fun (and for my thesis)",
                "can instantly guess the Hue of things (HSL color space)",
                "like JavaScript but got tired of frameworks",
                "am concerned about CSS specificity management in web projects",
                "sometimes use CSS for art tricks on top of JS canvas lol",
                "should take a nap and so do you",
                "hope the timing of this animation is just right",
                "like it when you scroll",
                "made this website open-source",

            ], indexx = 0, self = this;

            // (global function in utils.js)
            var indexes = randomIndexes(options.length);
	        var newFrame = function() {
		        indexx++;
		        indexx = indexx % options.length;
		        var polyam = options[indexes[indexx]];
		        var durationMS = Math.max(1000, polyam.length * 40);
		        self.currentPolyam = polyam;
		        setTimeout(newFrame, durationMS);
	        };

            newFrame();
        }
    },
    mounted: function() {
        // About link hover effects
        var logoMail = jQuery('#about a.mailme');
        var logoDeviant = jQuery('#about a.deviant');
        var logoGithub = jQuery('#about a.github');
        var logoCodepen = jQuery('#about a.codepen');
        jQuery('#about span.aboutmail').on({
            mouseenter: function() {
                logoMail.css('box-shadow', 'rgba(255,255,255,0.7) 0 0 15px');
            },
            mouseleave: function() {
                logoMail.css('box-shadow', '');// Empty string --> back to static style from .css file!
            }
        });
        jQuery('#about span.aboutdeviant').on({
            mouseenter: function() {
                logoDeviant.css('box-shadow', 'rgba(255,255,255,0.7) 0 0 15px');
            },
            mouseleave: function() {
                logoDeviant.css('box-shadow', '');
            }
        });
        jQuery('#about span.aboutgithub').on({
            mouseenter: function() {
                logoGithub.css('box-shadow', 'rgba(255,255,255,0.7) 0 0 15px');
            },
            mouseleave: function() {
                logoGithub.css('box-shadow', '');
            }
        });
        jQuery('#about span.aboutcodepen').on({
            mouseenter: function() {
                logoCodepen.css('box-shadow', 'rgba(255,255,255,0.7) 0 0 15px');
            },
            mouseleave: function() {
                logoCodepen.css('box-shadow', '');
            }
        });

        // Start polyam animation
        this.startPolyam();
    }
};