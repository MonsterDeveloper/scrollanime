# scrollanime
ScrollMagic plugin for AnimeJS Animation Engine.

## Installation

Download `animation.anime.min.js` and include it after ScrollMagic and Anime.
```html
<script src="/path/to/anime.min.js"></script>
<script src="/path/to/ScrollMagic.min.js"></script>
<script src="/path/to/animation.anime.min.js"></script>
```

## Usage

```javascript
var tl = anime.timeline();
tl.add({
    targets: "#block",
    opacity: [0, 1]
}).add({
    targets: "#block-1",
    opacity: [0, 1]
});

var animation = anime({
    targets: ".blocks",
    scale: [0.5, 1]
});

new ScrollMagic.Scene({
    triggerElement: ".section",
    duration: "80%",
    triggerHook: 0.9
})
.setAnime(tl)
.addTo(controller);

new ScrollMagic.Scene({
    triggerElement: ".section-2",
    duration: "80%",
    triggerHook: 0.9
})
.setAnime(animation)
.addTo(controller);
```
