/*
   * Animator
   * 
   * manages a set of channels and tweens their values toward target values
   */
var Animator = {
    create: function (channels) {
        return new Animator.instance(channels);
    },
    instance: utils.constructor(function (channels) {
        var k;
        this.target = {};
        this.channels = {};
        for (k in channels) {
            if (channels.hasOwnProperty(k)) {
                this.channels[k] = channels[k];
            }
        }
    }, {
            tween: function () {
                var self = this;
                utils.each(this.target, function (k, v) {
                    self.channels[k] += (v - self.channels[k]) / 2;
                });
            },
            setTarget: function (target) {
                var self = this;
                utils.each(target, function (k, v) {
                    if (typeof (self.target[k]) === 'number'
                        || (self.target[k] === undefined
                            && typeof (self.channels[k]) === 'number'
                        )
                    ) {
                        self.target[k] = v;
                    } else {
                        self.channels[k] = v;
                    }
                });
            }
        })
};
