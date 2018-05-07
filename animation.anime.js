/*
AnimeJS plugin for ScrollMagic.
Powered by AnimeJS: http://animejs.com.
AnimeJS is published under MIT license.
*/
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["ScrollMagic", "animejs"], factory);
  } else if (typeof exports === "object") {
    // CommonJS is not supporter by AnimeJS
  } else {
    // Browser
    factory(
      root.ScrollMagic || (root.jQuery && root.jQuery.ScrollMagic),
      root.anime || (root.jQuery && root.jQuery.anime)
    );
  }
})(this, function(ScrollMagic, anime) {
  "use strict";
  var NAMESPACE = "animation.anime";

  // (BUILD) - REMOVE IN MINIFY - START
  var console = window.console || {},
    err = Function.prototype.bind.call(
      console.error || console.log || function() {},
      console
    );
  if (!ScrollMagic) {
    err(
      "(" +
        NAMESPACE +
        ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."
    );
  }
  if (!anime) {
    err(
      "(" +
        NAMESPACE +
        ") -> ERROR: AnimeJS could not be found. Please make sure it's loaded before ScrollMagic or use an asynchronous loader like requirejs."
    );
  }
  // (BUILD) - REMOVE IN MINIFY - END

  var autoindex = 0;

  ScrollMagic.Scene.extend(function() {
    var Scene = this,
      _util = ScrollMagic._util,
      _currentProgress = 0,
      _animation,
      _dataID;

    // (BUILD) - REMOVE IN MINIFY - START
    var log = function() {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(
          arguments,
          1,
          0,
          "(" + NAMESPACE + ")",
          "->"
        );
        Scene._log.apply(this, arguments);
      }
    };
    // (BUILD) - REMOVE IN MINIFY - END

    // set listeners
    Scene.on("progress.plugin_anime", function() {
      updateAnimationProgress();
    });
    Scene.on("destroy.plugin_anime", function(e) {
      Scene.off("*.plugin_anime");
      Scene.removeAnime(e.reset);
    });

    var animate = function(animation) {
      animation.play();
    };
    var reverse = function(animation) {
      animation.play();
      animation.reverse();
    };

    /**
     * Seek animation while scrolling
     * @private
     */
    var updateAnimationProgress = function() {
      if (_animation) {
        var progress = Scene.progress();
        if (progress != _currentProgress) {
          // Need to update progress?
          if (Scene.duration() === 0) {
            // Play animation
            if (progress > 0) {
              // Play Forward
              animate(_animation);
            } else {
              // Play Reverse
              reverse(_animation);
            }
          } else {
            _animation.seek(_animation.duration * progress);
          }
          _currentProgress = progress;
        }
      }
    };
    Scene.setAnime = function(animation) {
      if (_animation) {
        // Kill old instance
        Scene.removeAnime();
      }
      animation.pause();
      _animation = animation;
      _dataID = "ScrollMagic." + NAMESPACE + "[" + autoindex++ + "]";

      updateAnimationProgress();
      return Scene;
    };
    Scene.removeAnime = function(reset) {
      if (_animation) {
        if (reset) {
          _animation.seek(0).pause();
        }
        _animation = undefined;
      }
      return Scene;
    };
  });
});
