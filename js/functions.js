window.onload = function () {

    var saucy = Snap('#svg');
    var background = Snap('.background');

    Snap.load('saucy-dragon.svg', function(f) {
        saucy.append(f);

        mainDragonLoop();
    });

    Snap.load('background.svg', function(f) {
        background.append(f);

        mainBackgroundLoop();
    });

}

function rotateKeyframes(args) {
    this.args = args;
    this.what = args.what;
    this.stepFrom = 0;

    this._loop = function(i) {
        var that  = this;
        var steps = this.args.steps;
        var time  = Math.ceil(this.args.time/steps.length);

        this.what.stop().animate(
            steps[i],
            time, mina.easeinout, function() {
                if (++i in steps) {
                    i = i
                } else {
                    i = that.stepFrom
                }
                that._loop(i);
            }
        )
        console.log('[animate]', this.what.node.id, steps[i], i);
    };
    this.init = function() {
        this._loop(this.stepFrom);
    };
}

function mainBackgroundLoop() {
    var backgroundMain = Snap.select('#background-svg');
    // pattern
    var pattern = Snap(backgroundMain).select("#polka");

    function patternAnimation(){
        pattern.animate({x: 400, y: -400}, 12500, mina.linear,
            function() {
                pattern.attr({x: 0, y: 0});
                patternAnimation();
                console.log('[animate]', this.node.id);
            }
        );
    }
    patternAnimation();
}

function mainDragonLoop() {
    // define Body parts
    var saucyMain = Snap.select('#saucy');

    var dragon = Snap(saucyMain).select('#dragon');
        var body = dragon.select("#body");
        var head = dragon.select("#head");
        var faceParts = dragon.select("#face-parts");
            var eyes = dragon.select("#eyes");
            var mouth = dragon.select("#mouth");
        var upLimbs = dragon.select("#uplimbs");
        var downLimbs = dragon.select("#downlimbs");
        var tail = dragon.select("#tail");
    var wingBg = dragon.select("#wing-bg");
    var wingFg = dragon.select("#wing-fg");

    // anim dragon
    var bounceDragon = new rotateKeyframes({
        'what': dragon,
        'steps': [{
            transform: 't10,15r5,250,150'
        }, {
            transform: 't-5,5r-2,250,150'
        }],
        'time': 2000
    });

    // anim antlerBg
    var wingBgAnim = new rotateKeyframes({
        'what': wingBg,
        'steps': [{
            transform: 'r-10,208,140'
        }, {
            transform: 'r10,208,140'
        }],
        'time': 1000
    });

    // anim antlerFg
    var wingFgAnim = new rotateKeyframes({
        'what': wingFg,
        'steps': [{
            transform: 'r10,208,140'
        }, {
            transform: 'r-10,208,140'
        }],
        'time': 1000
    });

    // anim tail
    var tailAnim = new rotateKeyframes({
        'what': tail,
        'steps': [{
            transform: 'r0,264,107'
        }, {
            transform: 'r-15,264,107'
        }],
        'time': 2000
    });

    // anim tail
    var facePartsAnim = new rotateKeyframes({
        'what': faceParts,
        'steps': [{
            transform: 'r0,116,134'
        }, {
            transform: 'r5,116,134'
        }],
        'time': 4000
    });

    // anim upLimbs
    var upLimbsAnim = new rotateKeyframes({
        'what': upLimbs,
        'steps': [{
            transform: 'r5,158,180'
        }, {
            transform: 'r-5,158,180'
        }],
        'time': 1500
    });

    // anim downLimbs
    var downLimbsAnim = new rotateKeyframes({
        'what': downLimbs,
        'steps': [{
            transform: 'r-5,255,163'
        }, {
            transform: 'r5,255,163'
        }],
        'time': 1500
    });

    bounceDragon.init();
    wingBgAnim.init();
    wingFgAnim.init();
    tailAnim.init();
    facePartsAnim.init();
    upLimbsAnim.init();
    downLimbsAnim.init();
}
